import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async getAllUsers(
    @Query() query: { skip?: number; take?: number },
  ): Promise<any> {
    return this.userService.getUsers(query);
  }

  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.getUserById(id);
  }

  @Post('users')
  async createUser(@Body() data: any): Promise<any> {
    return this.userService.createUser(data);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<any> {
    return this.userService.updateUser(id, data);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }
}
