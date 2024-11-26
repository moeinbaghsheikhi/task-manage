import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from 'express';
import TaskStatusEnum from './enums/taskStatusEnum';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const newTask = await this.tasksService.create(createTaskDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: newTask,
      message: "تسک با موفقیت ساخته شد"
    })
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: TaskStatusEnum,
    @Query('project') projectId?: number,
    @Query('limit')  limit  : number = 10,
    @Query('page')   page   : number = 1
  ) {
    const tasks = await this.tasksService.findAll(status, projectId, limit, page);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: tasks,
      message: "لیست تسک ها با موفقیت دریافت شد"
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const task = await this.tasksService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: task,
      message: "تسک با موفقیت دریافت شد"
    })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    await this.tasksService.update(+id, createTaskDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: "تسک شما با موفقیت آپدیت شد"
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.tasksService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: "تسک شما با موفقیت حذف شد"
    })
  }
}
