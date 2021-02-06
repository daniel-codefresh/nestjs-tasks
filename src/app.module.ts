import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

const mongoUri = 'mongodb://local.codefresh.io:27017/nest-tasks';

@Module({
  imports: [TasksModule, MongooseModule.forRoot(mongoUri)],
})
export class AppModule {}
