import { Module, CacheModule } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GalleryModule } from './gallery/gallery.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    GalleryModule,
  ],
})
export class AppModule {}
