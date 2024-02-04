import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString({
    message: 'title invalid',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  @ApiProperty({
    example: 'comprar leite',
    required: true,
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
    required: true,
    description: 'Descrição da tarefa',
    type: String,
  })
  description: string;
}
