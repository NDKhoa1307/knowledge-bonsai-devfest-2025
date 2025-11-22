import { Controller, Get, Query } from '@nestjs/common';
import { GetListTreeDto } from './getListTree.dto';
import { GetListTreeService } from './getListTree.service';

@Controller()
export class GetListTreeController {
  constructor(private readonly getListTreeService: GetListTreeService) {}

  @Get('/trees')
  async getTreeById(@Query() query: GetListTreeDto): Promise<any> {
    return await this.getListTreeService.getListTrees(query);
  }
}
