import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../types/task.types';

export class TasksFilterDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
