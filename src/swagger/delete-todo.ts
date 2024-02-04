import { ApiProperty } from '@nestjs/swagger';

export class DeleteTodoResponseDto {
  @ApiProperty({
    example: 'todo deleted successfully',
  })
  response: string;
}
