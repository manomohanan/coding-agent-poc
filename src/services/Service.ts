import { ServiceResponse, ServiceError } from '../types';

class Service {
  static rejectResponse(error: any, code: number = 500): ServiceError {
    return { error, code };
  }

  static successResponse(payload: any, code: number = 200): ServiceResponse {
    return { payload, code };
  }
}

export default Service;