import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './entities/post.entity';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}
  async getAllPosts() {
    return await this.postsRepository.find();
    // posts = plainToInstance(PostEntity, posts);
    // return { data: posts, message: 'List of posts' };
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    console.log('🚀 ~ PostsService ~ getPostById ~ post:', id, post);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    console.log('🚀 ~ PostsService ~ createPost ~ newPost:', newPost);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: PostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOneBy({ id: id });
    console.log('🚀 ~ PostsService ~ updatePost ~ updatedPost:', updatedPost);
    if (!updatedPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: updatedPost,
      message: `Post with ${id} updated successfully`,
    };
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    console.log(
      '🚀 ~ PostsService ~ deletePost ~ deleteResponse:',
      deleteResponse,
    );
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return {
      data: {},
      message: `Post with ${id} deleted successfully`,
    };
  }
}
