import { Request, Response } from 'express';

export interface ServiceResponse {
  code?: number;
  payload?: any;
}

export interface ServiceError {
  code?: number;
  error?: any;
  message?: string;
}

export interface RequestParams {
  [key: string]: any;
}

export interface FileObject {
  fieldname: string;
  originalname: string;
  filename: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  buffer?: Buffer;
  stream?: any;
  destination?: string;
  path?: string;
}

export interface OpenApiRequest extends Omit<Request, 'files'> {
  files?: FileObject[];
  openapi: {
    schema: {
      'x-codegen-request-body-name'?: string;
      requestBody?: {
        content: {
          'application/json'?: {
            schema: {
              $ref?: string;
            };
          };
          'multipart/form-data'?: {
            schema: {
              properties: {
                [key: string]: {
                  format?: string;
                };
              };
            };
          };
        };
      };
      parameters?: Array<{
        name: string;
        in: 'path' | 'query' | 'header';
      }>;
    };
    pathParams: {
      [key: string]: any;
    };
  };
}