import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../modules/todo/entities/todo.entity';

export class ResponsePagination {
  @ApiProperty({
    example: Todo,
    required: true,
    type: [Todo],
    description: 'array de itens',
  })
  data: Todo[];
  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
    description: 'total de itens',
  })
  count: number;

  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
    description: 'pagina atual',
  })
  currentPage: number;

  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
    description: 'proxima pagina',
  })
  nextPage: number;

  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
    description: 'pagina anterio',
  })
  prevPage: number;

  @ApiProperty({
    example: 1,
    required: true,
    type: Number,
    description: 'ultima pagina',
  })
  lastPage: number;
}
