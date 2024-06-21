import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import {
    RequestJsonBodyParserMiddleware,
    RequestRawBodyParserMiddleware,
    RequestTextBodyParserMiddleware,
    RequestUrlencodedBodyParserMiddleware,
} from 'src/helpers/middleware/body-parser/request.body-parser.middleware';
import { RequestCorsMiddleware } from 'src/helpers/middleware/cors/request.cors.middleware';
import { RequestHelmetMiddleware } from 'src/helpers/middleware/helmet/request.helmet.middleware';
import { RequestIdMiddleware } from 'src/helpers/middleware/id/request.id.middleware';
import { RequestTimestampMiddleware } from 'src/helpers/middleware/timestamp/request.timestamp.middleware';
import { RequestTimezoneMiddleware } from 'src/helpers/middleware/timezone/request.timezone.middleware';
import { RequestUserAgentMiddleware } from 'src/helpers/middleware/user-agent/request.user-agent.middleware';
import { RequestVersionMiddleware } from 'src/helpers/middleware/version/request.version.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(
                RequestHelmetMiddleware,
                RequestIdMiddleware,
                RequestJsonBodyParserMiddleware,
                RequestTextBodyParserMiddleware,
                RequestRawBodyParserMiddleware,
                RequestUrlencodedBodyParserMiddleware,
                RequestCorsMiddleware,
                RequestVersionMiddleware,
                RequestUserAgentMiddleware,
                RequestTimestampMiddleware,
                RequestTimezoneMiddleware
            )
            .forRoutes('*');
    }
}