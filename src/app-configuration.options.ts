import { Server } from '@grpc/grpc-js';
import { PackageDefinition } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import * as path from 'node:path';

export const grpcAppConfiguration: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['hero'],
    protoPath: [path.join(__dirname, 'modules/hero/proto/hero.proto')],
    onLoadPackageDefinition: (
      pkg: PackageDefinition,
      server: Pick<Server, 'addService'>,
    ) => {
      new ReflectionService(pkg).addToServer(server);
    },
  },
};
