import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({
    message: 'title invalid',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @IsString({
    message: 'description invalid',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;
}
