import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './entities/post.entity';
import JwtAuthenticationGuards from 'src/authentication/guards/jwt-authentication.guard';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}
  async getAllPosts() {
    const result = await this.postsRepository.find();
    return { data: result, message: 'List of posts' };
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    console.log('🚀 ~ PostsService ~ getPostById ~ post:', id, post);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  @UseGuards(JwtAuthenticationGuards)
  async createPost(post: CreatePostDto) {
    const newPost = this.postsRepository.create(post);
    console.log('🚀 ~ PostsService ~ createPost ~ newPost:', newPost);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: PostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOneBy({ id: id });
    console.log('🚀 ~ PostsService ~ updatePost ~ updatedPost:', updatedPost);
    return {
      data: updatedPost,
      message: `Post with ${id} updated successfully`,
    };
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    console.log(
      '🚀 ~ PostsService ~ deletePost ~ deleteResponse:',
      deleteResponse,
    );
    return {
      data: {},
      message: `Post with ${id} deleted successfully`,
    };
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
