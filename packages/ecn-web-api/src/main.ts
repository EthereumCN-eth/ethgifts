import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    // cors: {
    //   origin: ['http://localhost:5116'],
    // },
    // bufferLogs: true,
  });

  // const config = new DocumentBuilder()
  //   .setTitle('ECN-web')
  //   .setDescription('The ECN-web API description')
  //   .setVersion('0.1')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  // app.useLogger(app.get(Logger));
  await app.listen(3020);
}
bootstrap();
