import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusTodo } from './status-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsEnum(StatusTodo, {
    message: 'status invalid',
  })
  @ApiProperty({
    example: 'created',
    required: false,
    enum: StatusTodo,
    description: 'buscar por status',
  })
  status: StatusTodo;

  @IsString({
    message: 'title invalid',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  @ApiProperty({
    example: 'comprar leite',
    required: false,
    description: 'Titulo da tarefa',
    type: String,
  })
  title: string;

  @IsString({
    message: 'description invalid',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  @ApiProperty({
    example: 'preciso de leite para fazer bolo',
    required: false,
    description: 'Descrição da tarefa',
    type: String,
  })
  description: string;
}
