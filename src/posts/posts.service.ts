import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/createPost.dto';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './entities/post.entity';

@Injectable()
export class PostsService {
  // private postsList: PostDto[] = [];
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}
  async getAllPosts() {
    const result = await this.postsRepository.find();
    console.log('🚀 ~ PostsService ~ getAllPosts ~ result:', result);
    return { data: [result], message: 'List of posts' };
  }

  getPostById(id: number) {
    const post = this.postsRepository.findOneBy({ id: id });
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  async createPost(post: CreatePostDto) {
    const newPost = this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async updatePost(id: number, post: PostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOneBy({ id: id });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
