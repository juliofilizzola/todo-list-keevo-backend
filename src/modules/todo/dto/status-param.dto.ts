import { StatusTodo } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class StatusParamDto {
  @IsOptional()
  @IsEnum(StatusTodo, {
    message: 'status invalid',
  })
  status: StatusTodo;
}
