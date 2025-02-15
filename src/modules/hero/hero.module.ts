import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcAppConfiguration } from 'src/app-configuration.options';
import { HeroController } from './hero.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        ...grpcAppConfiguration,
      },
    ]),
  ],
  controllers: [HeroController],
})
export class HeroModule {}
