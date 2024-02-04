import { ApiProperty } from '@nestjs/swagger';

export class TodoNotFound {
  @ApiProperty({
    example: 'Todo not found',
  })
  message: string;
}
