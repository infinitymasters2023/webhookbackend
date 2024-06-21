import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { STATUS_CODE } from 'src/helpers/constants/status-code.constant';

@Injectable()
export class AuthJwtAccessGuard extends AuthGuard('local') {
    handleRequest<TUser = any>(err: Error, user: TUser, info: Error): TUser {
        if (err || !user) {
            throw new UnauthorizedException({
                statusCode:
                STATUS_CODE.AUTH_JWT_ACCESS_TOKEN_ERROR,
                message: 'auth.error.accessTokenUnauthorized',
                _error: err ? err.message : info.message,
            });
        }

        return user;
    }
}