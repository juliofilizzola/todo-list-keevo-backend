import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusTodo } from '../dto/status-todo.dto';

@Entity({ name: 'todo' })
export class Todo {
  @ApiProperty({
    example: '14087e68-e669-482b-b908-bc33623a036d',
    required: true,
    description: 'id do usuario',
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'comprar leite',
    required: true,
    description: 'Titulo da tarefa',
    type: String,
  })
  @Column()
  title: string;

  @ApiProperty({
    example: 'preciso de leite para fazer bolo',
    required: true,
    description: 'Descrição da tarefa',
    type: String,
  })
  @Column()
  description: string;

  @ApiProperty({
    example: 'Create',
    required: true,
    description: 'status da todo',
    enum: StatusTodo,
  })
  @Column({
    enum: StatusTodo,
    default: StatusTodo.created,
  })
  status: StatusTodo;

  @ApiProperty({
    required: true,
    type: Date,
    example: new Date(),
    description: 'campo retorna quando a todo foi criada',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    required: true,
    type: Date,
    example: new Date(),
    description: 'campo retorna a ultima atualização',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
