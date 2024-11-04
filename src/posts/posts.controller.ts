import {
  Get,
  Controller,
  Param,
  Post,
  Body,
  ParseIntPipe,
  Query,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Post('add')
  createPost(@Body() postObj: CreatePostDto) {
    console.log('🚀 ~ PostsController ~ createPost ~ postObj:', postObj);
    return this.postsService.createPost(postObj);
  }

  @Post('update')
  async updatePost(
    @Body() updatedPostObj: UpdatePostDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    const response = await this.postsService.updatePost(id, updatedPostObj);
    return response;
  }

  @Delete('delete')
  deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.deletePost(id);
  }
}
