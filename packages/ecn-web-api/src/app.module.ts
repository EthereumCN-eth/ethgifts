import { Module, CacheModule } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
