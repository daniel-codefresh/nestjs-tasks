import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './interfaces/task.interface';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop()
  summary: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
