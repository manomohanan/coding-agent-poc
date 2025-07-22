import fs from 'fs';
import path from 'path';
import camelCase from 'camelcase';
import { Response } from 'express';
import config from '../config';
import logger from '../logger';
import { ServiceResponse, ServiceError, RequestParams, OpenApiRequest, FileObject } from '../types';

class Controller {
  static sendResponse(response: Response, payload: ServiceResponse | any): void {
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    response.status(payload.code || 200);
    const responsePayload = payload.payload !== undefined ? payload.payload : payload;
    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload);
    }
  }

  static sendError(response: Response, error: ServiceError): void {
    response.status(error.code || 500);
    if (error.error instanceof Object) {
      response.json(error.error);
    } else {
      response.end(error.error || error.message);
    }
  }

  /**
   * Files have been uploaded to the directory defined by config.js as upload directory
   * Files have a temporary name, that was saved as 'filename' of the file object that is
   * referenced in request.files array.
   * This method finds the file and changes it to the file name that was originally called
   * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
   * the filename and its extension
   */
  static collectFile(request: OpenApiRequest, fieldName: string): string {
    let uploadedFileName = '';
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find((file: FileObject) => file.fieldname === fieldName);
      if (fileObject) {
        const fileArray = fileObject.originalname.split('.');
        const extension = fileArray.pop();
        fileArray.push(`_${Date.now()}`);
        uploadedFileName = `${fileArray.join('')}.${extension}`;
        fs.renameSync(
          path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
          path.join(config.FILE_UPLOAD_PATH, uploadedFileName)
        );
      }
    }
    return uploadedFileName;
  }

  static getRequestBodyName(request: OpenApiRequest): string {
    const codeGenDefinedBodyName = request.openapi.schema['x-codegen-request-body-name'];
    if (codeGenDefinedBodyName !== undefined) {
      return codeGenDefinedBodyName;
    }
    
    const requestBody = request.openapi.schema.requestBody;
    if (requestBody?.content?.['application/json']?.schema?.$ref) {
      const refObjectPath = requestBody.content['application/json'].schema.$ref;
      if (refObjectPath !== undefined && refObjectPath.length > 0) {
        return refObjectPath.substr(refObjectPath.lastIndexOf('/') + 1);
      }
    }
    return 'body';
  }

  static collectRequestParams(request: OpenApiRequest): RequestParams {
    const requestParams: RequestParams = {};
    
    if (request.openapi.schema.requestBody !== null && request.openapi.schema.requestBody !== undefined) {
      const { content } = request.openapi.schema.requestBody;
      
      if (content['application/json'] !== undefined) {
        const requestBodyName = camelCase(this.getRequestBodyName(request));
        requestParams[requestBodyName] = request.body;
      } else if (content['multipart/form-data'] !== undefined) {
        Object.keys(content['multipart/form-data'].schema.properties).forEach((property) => {
          const propertyObject = content['multipart/form-data']!.schema.properties[property];
          if (propertyObject.format !== undefined && propertyObject.format === 'binary') {
            requestParams[property] = this.collectFile(request, property);
          } else {
            requestParams[property] = request.body[property];
          }
        });
      }
    }

    if (request.openapi.schema.parameters !== undefined) {
      request.openapi.schema.parameters.forEach((param) => {
        if (param.in === 'path') {
          requestParams[param.name] = request.openapi.pathParams[param.name];
        } else if (param.in === 'query') {
          requestParams[param.name] = request.query[param.name];
        } else if (param.in === 'header') {
          requestParams[param.name] = request.headers[param.name];
        }
      });
    }
    
    return requestParams;
  }

  static async handleRequest(
    request: OpenApiRequest,
    response: Response,
    serviceOperation: (params: RequestParams) => Promise<ServiceResponse>
  ): Promise<void> {
    try {
      const serviceResponse = await serviceOperation(this.collectRequestParams(request));
      Controller.sendResponse(response, serviceResponse);
    } catch (error) {
      Controller.sendError(response, error as ServiceError);
    }
  }
}

export default Controller;