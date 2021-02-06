import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { DeleteTaskResponseDto } from './dto/delete-task.dto';
import { TasksFilterDto } from './dto/get-tasks.dto';
import { CreateTaskRequestBodyDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { ObjectId } from 'mongoose';
import { UpdateTaskRequestBodyDto } from './dto/update-task.dto';
import { ObjectIdValidationPipe } from '../pipes/ObjectIdValidationPipe';
import { PayloadExistsValidationPipe } from '../pipes/PayloadExistsValidationPipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: TasksFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ObjectIdValidationPipe) id: ObjectId,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id', ObjectIdValidationPipe) id: ObjectId,
    @Body(PayloadExistsValidationPipe, ValidationPipe)
    updateTaskDto: UpdateTaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskRequestBodyDto,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ObjectIdValidationPipe) id: ObjectId,
  ): Promise<DeleteTaskResponseDto> {
    return this.tasksService.deleteTaskById(id);
  }
}
