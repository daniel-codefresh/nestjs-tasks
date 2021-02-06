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
import { TaskDocument } from './task.schema';
import { Types } from 'mongoose';
import { UpdateTaskRequestBodyDto } from './dto/update-task.dto';
import { ObjectIdValidationPipe } from '../pipes/ObjectIdValidationPipe';
import { PayloadExistsValidationPipe } from '../pipes/PayloadExistsValidationPipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getTasks(
    @Query(ValidationPipe) filterDto: TasksFilterDto,
  ): Promise<TaskDocument[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ObjectIdValidationPipe) id: Types.ObjectId,
  ): Promise<TaskDocument> {
    return this.tasksService.getTaskById(id);
  }

  @Patch('/:id')
  updateTaskById(
    @Param('id', ObjectIdValidationPipe) id: Types.ObjectId,
    @Body(PayloadExistsValidationPipe, ValidationPipe)
    updateTaskDto: UpdateTaskRequestBodyDto,
  ): Promise<TaskDocument> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskRequestBodyDto,
  ): Promise<TaskDocument> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ObjectIdValidationPipe) id: Types.ObjectId,
  ): Promise<DeleteTaskResponseDto> {
    return this.tasksService.deleteTaskById(id);
  }
}
