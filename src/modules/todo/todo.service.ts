import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, StatusTodo, Todo } from '@prisma/client';
import { ParamsPagination } from '../../pagination/dto/params-pagination';
import { paginateResponse } from '../../pagination/pagination';

@Injectable()
export class TodoService {
  constructor(private readonly todoService: PrismaService) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.todo.create({ data: createTodoDto });
  }

  async findAll(searchParams?: StatusTodo, pagination?: ParamsPagination) {
    const where: Prisma.TodoWhereInput = {
      status: searchParams,
    };

    if (pagination) {
      const { page, limit } = pagination;

      const count = await this.todoService.todo.count({ where });
      const result = await this.todoService.todo.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return paginateResponse<Todo>({ total: count, result, page, limit });
    }

    return this.todoService.todo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoService.todo.findUnique({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException({
        message: 'todo not found',
      });
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoService.todo.findFirst({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException({
        message: 'todo not found',
      });
    }

    return this.todoService.todo.update({
      where: {
        id,
      },
      data: updateTodoDto,
    });
  }

  async remove(id: string) {
    const todo = await this.todoService.todo.findFirst({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException({
        message: 'todo not found',
      });
    }

    await this.todoService.todo.delete({
      where: {
        id,
      },
    });

    return {
      message: 'todo deleted successfully',
    };
  }
}
