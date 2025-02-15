import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { grpcAppConfiguration } from './app-configuration.options';
import { AppModule } from './app.module';

async function bootstrap() {
  // Hybrid application
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(grpcAppConfiguration);

  await app.startAllMicroservices();
  await app.listen(3001);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
});
