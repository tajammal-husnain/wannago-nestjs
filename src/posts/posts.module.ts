import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './entities/post.entity';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService, ElasticsearchService],
})
export class PostsModule {}
