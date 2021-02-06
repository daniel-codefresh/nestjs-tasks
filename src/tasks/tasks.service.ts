import _ from 'lodash';
import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteTaskResponseDto } from './dto/delete-task.dto';
import { TasksFilterDto } from './dto/get-tasks.dto';
import { CreateTaskRequestBodyDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { UpdateTaskRequestBodyDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getTasks(filterDto: TasksFilterDto): Promise<TaskDocument[]> {
    return this.taskModel.find(filterDto).exec();
  }

  async createTask(
    createTaskDto: CreateTaskRequestBodyDto,
  ): Promise<TaskDocument> {
    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  async getTaskById(id: Types.ObjectId): Promise<TaskDocument> {
    const targetTask = await this.taskModel.findById(id).exec();
    if (!targetTask)
      throw new NotFoundException(`Task with ${id} is not found`);

    return targetTask;
  }

  async deleteTaskById(id: Types.ObjectId): Promise<DeleteTaskResponseDto> {
    await this.getTaskById(id);
    const res = await this.taskModel.findByIdAndDelete(id).exec();
    console.log(`Delete acknowledgement: ${JSON.stringify(res)}`);
    return {
      removed: { id: id.toString() },
    };
  }

  async updateTaskById(
    id: Types.ObjectId,
    updateTaskDto: UpdateTaskRequestBodyDto,
  ): Promise<TaskDocument> {
    const targetTask = await this.getTaskById(id);
    _.merge(targetTask, updateTaskDto);
    console.log(`updated task: ${JSON.stringify(targetTask)}`);
    return targetTask.save();
  }
}
