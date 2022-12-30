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
import { UserModule } from './user/user.module';
import { SbtModule } from './sbt/sbt.module';
import { MessageModule } from './message/message.module';
@Module({
  imports: [
    // LoggerModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    GalleryModule,
    UserModule,
    SbtModule,
    MessageModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
