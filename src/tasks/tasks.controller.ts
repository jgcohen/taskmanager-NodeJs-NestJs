import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './tasks.model';
// rajouter Taskstatus au dessus
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {

        return this.tasksService.getAllTasks();
 
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        const createdTask = this.tasksService.create(createTaskDto)
     
        return createdTask
    }

    @Get('/:id')
    getTaskById(@Param('id') _id: string): Promise<Task> {
        return this.tasksService.getTaskById(_id);
    }

    @Delete(":id")
    async remove(@Param("id") _id: string) {
        const deletedTask = await this.tasksService.findAndDelete(_id)
        // if (!deletedTask) {
        // }
        return deletedTask
    }

    @Put(':id')
    async update(@Param('id') _id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
       return this.tasksService.update(_id, updateTaskDto);
    }

}
