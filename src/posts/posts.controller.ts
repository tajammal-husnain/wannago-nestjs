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
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async allPosts() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async postById(@Param('id', ParseIntPipe) id: number) {
    return await this.postsService.getPostById(id);
  }

  @Post('add')
  async addPost(@Body() postObj: CreatePostDto) {
    console.log('🚀 ~ PostsController ~ createPost ~ postObj:', postObj);
    return await this.postsService.createPost(postObj);
  }

  @Patch('update')
  async changePost(
    @Body() updatedPostObj: UpdatePostDto,
    @Query('id', ParseIntPipe) id: number,
  ) {
    return await this.postsService.updatePost(id, updatedPostObj);
  }

  @Delete('delete')
  async removePost(@Query('id', ParseIntPipe) id: number) {
    return await this.postsService.deletePost(+id);
  }
}
