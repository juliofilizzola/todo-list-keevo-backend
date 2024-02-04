import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { StatusTodo } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(StatusTodo, {
    message: 'status invalid',
  })
  status: StatusTodo;
}
