import {HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        next();
    }

    catch(error: Error, req: Request, res: Response, next: NextFunction) {
        if (error.name === 'QueryFailedError') {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Произошла ошибка базы данных',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }

}