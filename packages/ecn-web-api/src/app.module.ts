import { LoggerMiddleware } from './shared/middlewares/logger.middleware';
import {
  Module,
  CacheModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';
@Module({
  imports: [
    // LoggerModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    GalleryModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
