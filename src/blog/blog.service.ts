import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.prisma.blog.create({ data: createBlogDto })
      return blog
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const blogs = await this.prisma.blog.findMany({ include: { Comment: true } })
      return blogs
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.prisma.blog.findUnique({ where: { id }, include: { Comment: true } })
      if (!blog) return new NotFoundException("Not found")
      return blog
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    try {
      const updatedBlog = await this.prisma.blog.update({ where: { id }, data: updateBlogDto })
      return updateBlogDto
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.blog.delete({ where: { id } })
      return new HttpException("Successfully deleted", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
