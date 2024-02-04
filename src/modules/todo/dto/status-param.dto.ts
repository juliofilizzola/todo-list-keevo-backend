import { StatusTodo } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
