import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../types/task.types';

export class UpdateTaskRequestBodyDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  summary: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
