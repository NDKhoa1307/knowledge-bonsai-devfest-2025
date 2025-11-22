import { Controller, Post, Body } from '@nestjs/common';
import { CreateTreeService } from './createTree.service';
import { CreateTreeDto } from './createTree.dto';

@Controller()
export class CreateTreeController {
  constructor(private readonly createTreeService: CreateTreeService) { }

  @Post('/trees')
  async createTree(@Body() data: CreateTreeDto): Promise<any> {
    try {
      return await this.createTreeService.createTree(data);
    } catch (error) {
      throw new Error(`Failed to update tree: ${error.message}`);
    }
  }
}
