import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTaskRequestBodyDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  summary: string;
}
