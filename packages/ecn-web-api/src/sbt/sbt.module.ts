import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { SbtService } from './sbt.service';
import { SbtController } from './sbt.controller';

@Module({
  imports: [UserModule],
  controllers: [SbtController],
  providers: [SbtService],
  exports: [SbtService],
})
export class SbtModule {}
