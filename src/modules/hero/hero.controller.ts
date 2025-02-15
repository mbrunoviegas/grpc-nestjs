import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Hero } from './domain/hero';
import { HeroById } from './domain/hero-by-id';

interface HeroesService {
  findOne(data: HeroById): Observable<Hero>;
}

@Controller('heroes')
export class HeroController implements OnModuleInit {
  private readonly items: Hero[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];
  private heroesService: HeroesService;

  constructor(@Inject('HERO_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.heroesService = this.client.getService<HeroesService>('HeroesService');
  }

  @Get(':id')
  getById(@Param('id') id: string): Observable<Hero> {
    return this.heroesService.findOne({ id: parseInt(id) });
  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero | undefined {
    return this.items.find(({ id }) => id === data.id);
  }
}
