import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParamsPagination } from '../../pagination/dto/params-pagination';
import { paginateResponse } from '../../pagination/pagination';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { StatusTodo } from './dto/status-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = this.todoRepo.create(createTodoDto);
      return this.todoRepo.save(todo);
    } catch (e) {
      console.error(e);
    }
  }

  async findAll(searchParams?: StatusTodo, pagination?: ParamsPagination) {
    const where = {
      status: searchParams,
    };

    if (pagination) {
      const { page, limit } = pagination;

      const count = await this.todoRepo.count({ where });
      const result = await this.todoRepo.find({
        where,
        skip: (page - 1) * limit,
        take: limit,
        order: {
          createdAt: 'desc',
        },
      });

      return paginateResponse<Todo>({ total: count, result, page, limit });
    }

    return this.todoRepo.find({
      where,
      order: { createdAt: 'desc' },
    });
  }
  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoRepo.findOne({
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
    const todo = await this.todoRepo.findOne({
      where: {
        id,
      },
    });
    if (!todo) {
      throw new NotFoundException({
        message: 'todo not found',
      });
    }

    return this.todoRepo.save({
      id,
      ...updateTodoDto,
    });
  }

  async remove(id: string) {
    const todo = await this.todoRepo.findOne({
      where: {
        id,
      },
    });

    if (!todo) {
      throw new NotFoundException({
        message: 'todo not found',
      });
    }

    await this.todoRepo.remove(todo);

    return {
      message: 'todo deleted successfully',
    };
  }
}
