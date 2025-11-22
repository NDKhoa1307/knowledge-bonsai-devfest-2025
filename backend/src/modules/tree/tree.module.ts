import { Module } from '@nestjs/common';
import { DatabaseModule } from '@db';
import * as useCases from './application';

const apis = Object.values(useCases);
const controllers = apis.filter((x) => x.name.endsWith('Controller'));
const services = apis.filter((x) => x.name.endsWith('Service'));

@Module({
  imports: [DatabaseModule],
  controllers: [...controllers],
  providers: [...services],
})
export class TreeModule {}
