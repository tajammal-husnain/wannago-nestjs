import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
import JwtAuthenticationGuard from 'src/authentication/guards/jwt-authentication.guard';

@Controller('posts')
@UseGuards(JwtAuthenticationGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  async getAllPosts() {
    const res = await this.postsService.getAllPosts();
    console.log('🚀 ~ PostsController ~ getAllPosts ~ res:', res);
    return res;
  }

  @Get(':id')
  async getPostById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostById(id);
  }

  @Post('add')
  async createPost(@Body() postObj: CreatePostDto) {
    console.log('🚀 ~ PostsController ~ createPost ~ postObj:', postObj);
    return await this.postsService.createPost(postObj);
  }

  @Post('update')
  async updatePost(
    @Body() updatedPostObj: UpdatePostDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return await this.postsService.updatePost(id, updatedPostObj);
  }

  @Delete('delete')
  async deletePost(@Query('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(id);
  }
}
