import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({
    example: '14087e68-e669-482b-b908-bc33623a036d',
    required: true,
    description: 'id do usuario',
    type: String,
  })
  id: string;

  @ApiProperty({
    example: 'comprar leite',
    required: true,
    description: 'Titulo da tarefa',
    type: String,
  })
  title: string;

  @ApiProperty({
    example: 'preciso de leite para fazer bolo',
    required: true,
    description: 'Descrição da tarefa',
    type: String,
  })
  description: string;
  @ApiProperty({
    required: true,
    type: Date,
    example: new Date(),
    description: 'campo retorna quando a todo foi criada',
  })
  createdAt: Date;
  @ApiProperty({
    required: true,
    type: Date,
    example: new Date(),
    description: 'campo retorna a ultima atualização',
  })
  deletedAt: Date;

  @ApiProperty({
    required: true,
    type: Date,
    example: new Date(),
    description: 'campo retorna a ultima atualização',
  })
  updatedAt: Date;
}
