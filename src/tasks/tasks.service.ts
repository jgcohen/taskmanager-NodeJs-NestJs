import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.model';
//rajouter taskstatus au dessus
// import { v1 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument } from './schemas/task.schema';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {

    constructor(@InjectModel("Task") private taskModel: Model<TaskDocument>) { }

    async getAllTasks(): Promise<Task[]> {
        return await this.taskModel.find();
    }

    async getTaskById(id: string): Promise<Task> {

        return  this.taskModel.findOne({ _id: id }).exec()

    }
 
    async findAndDelete(id: string): Promise<Task> {
        console.log('coucou on est bien dans le delete comme Pierre à demandé')
        return this.taskModel.findByIdAndRemove({ _id: id }).exec()
    } 

    async update(id: string, updatetaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskModel.findByIdAndUpdate({ _id: id },{title: updatetaskDto.title, description: updatetaskDto.description, status:updatetaskDto.status},).exec();
    } 

    async create(createTaskDto: CreateTaskDto): Promise<Task> {

        const createdTask = new this.taskModel({title: createTaskDto.title,description:createTaskDto.description,status:createTaskDto.status})

        return createdTask.save()
    }
}
