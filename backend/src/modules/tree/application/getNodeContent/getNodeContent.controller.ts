import { Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { GetNodeContentService } from './getNodeContent.service';
import { GetNodeContentDto } from './getNodeContent.dto';

@Controller()
export class GetNodeContentController {
  constructor(private readonly getNodeContentService: GetNodeContentService) {}

  @Post('/trees/:treeid/nodes/:nodeid')
  async getNodeContent(
    @Param('treeid', ParseIntPipe) treeid: number,
    @Param('nodeid') nodeid: string,
  ): Promise<GetNodeContentDto> {
    return this.getNodeContentService.getNodeContent(treeid, nodeid);
  }
}
