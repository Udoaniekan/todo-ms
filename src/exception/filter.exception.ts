import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        console.error('Unexpected error:', exception);

        if (exception instanceof HttpException) {
            return response.status(exception.getStatus()).json(exception.getResponse());
        }

        return response.status(500).json({ message: 'Internal server error' });
    }
}
