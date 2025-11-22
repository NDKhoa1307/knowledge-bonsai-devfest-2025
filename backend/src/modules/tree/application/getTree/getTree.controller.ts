import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { GetTreeService } from './getTree.service';
import { TreeResponseDto } from './getTree.dto';

@Controller()
export class GetTreeController {
  constructor(private readonly getTreeService: GetTreeService) {}

  @Get('/trees/:id')
  async getTreeById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TreeResponseDto> {
    return await this.getTreeService.getTreeById(id);
  }
}
