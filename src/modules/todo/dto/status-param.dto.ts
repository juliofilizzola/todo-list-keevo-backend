import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusTodo } from './status-todo.dto';

export class StatusParamDto {
  @IsOptional()
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
}
