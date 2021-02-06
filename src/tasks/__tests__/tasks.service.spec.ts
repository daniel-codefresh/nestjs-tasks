import { Test } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from '../task.schema';
import { Types } from 'mongoose';
import { UpdateTaskRequestBodyDto } from '../dto/update-task.dto';

// const createMockTaskModel = () => ({
//   save: jest.fn().mockResolvedValue(this.data),
//   findById: jest.fn(),
// });

class MockModel {
  constructor(public data?: any) {}

  save() {
    return this.data;
  }

  static findById(id) {
    return {
      exec: async () => ({
        _id: id,
        save: () => ({ _id: id }),
      }),
    };
  }
}

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: MockModel,
          // useFactory: createMockTaskModel,
        },
      ],
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
  });

  describe('getTaskById', () => {
    it('should be called', async () => {
      const id = new Types.ObjectId();
      const res = await tasksService.getTaskById(id);
      console.log(res);

      await tasksService.updateTaskById(id, new UpdateTaskRequestBodyDto());
      // await tasksService.deleteTaskById(id);
    });
  });
});
