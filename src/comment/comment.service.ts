import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createCommentDto: CreateCommentDto) {
    try {
      const comment = await this.prisma.comment.create({ data: createCommentDto })
      return comment
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      const comments = await this.prisma.comment.findMany()
      return comments
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const comment = await this.prisma.comment.findUnique({ where: { id } })
      if (!comment) return new NotFoundException("Not found this comment")
      return comment
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      const updatedComment = await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto
      })
      return updatedComment
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.comment.delete({ where: { id } })
      return new HttpException("Successfully deleted!", HttpStatus.ACCEPTED)
    } catch (error) {
      console.log(error);
    }
  }
}
