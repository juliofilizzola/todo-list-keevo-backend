import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ParamsPagination } from '../../pagination/dto/params-pagination';
import { StatusParamDto } from './dto/status-param.dto';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { ResponsePagination } from '../../swagger/reponse-pagination';
import { TodoNotFound } from '../../swagger/todo-not-found';
import { DeleteTodoResponseDto } from '../../swagger/delete-todo';

@Controller('todo')
@ApiTags('Todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiResponse({
    status: 202,
    description: 'Todo criada com sucesso',
    type: Todo,
  })
  @ApiOperation({
    description: 'Rota para criar todo',
    summary: 'Create',
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    description: 'Rota buscar todas as todo',
    summary: 'Find All',
  })
  @ApiResponse({
    status: 202,
    description: 'todos encontratos com sucesso',
    type: [Todo],
  })
  @ApiResponse({
    status: 202,
    type: ResponsePagination,
    description: 'Retorno de todo paginada',
  })
  @ApiQuery({ name: 'pagination params', type: ParamsPagination })
  @ApiQuery({ name: 'status todo', type: StatusParamDto })
  findAll(@Query() { page, limit, status }: ParamsPagination & StatusParamDto) {
    const pagination: ParamsPagination =
      page && limit ? { page: Number(page), limit: Number(limit) } : undefined;
    return this.todoService.findAll(status, pagination);
  }

  @Get(':id')
  @ApiOperation({
    description: 'Rota buscar um todo',
    summary: 'Find One',
  })
  @ApiResponse({
    status: 202,
    description: 'todo encontrato com sucesso',
    type: Todo,
  })
  @ApiNotFoundResponse({
    type: TodoNotFound,
    description: 'todo não encontrato',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '383064a3-d277-4ced-83dc-551e4a79c9d8',
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description: 'Rota para atualizar a todo',
    summary: 'Update',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '383064a3-d277-4ced-83dc-551e4a79c9d8',
  })
  @ApiResponse({
    status: 202,
    description: 'todo atualizado com sucesso',
    type: Todo,
  })
  @ApiNotFoundResponse({
    type: TodoNotFound,
    description: 'todo não encontrato',
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Rota deletar a todo',
    summary: 'Delete',
  })
  @ApiParam({
    name: 'id',
    type: String,
    example: '383064a3-d277-4ced-83dc-551e4a79c9d8',
  })
  @ApiNotFoundResponse({
    type: TodoNotFound,
    description: 'todo não encontrato',
  })
  @ApiOkResponse({
    description: 'todo deletada com sucesso',
    type: DeleteTodoResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
