import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception['response']['message'];
    
    const errorResponse = {
      response: {
        code: status,
        data: {},
        message: [message || exception.message],
        success: false,
      },
    };

    response.status(status).json(errorResponse);
  }
}
