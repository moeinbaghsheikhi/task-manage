import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Res, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import ProjectStatusEnum from './enums/ProjectStatusEnum';
import { Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    const createProject = await this.projectsService.create(createProjectDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: createProject,
      message: "پروژه با موفقیت ساخته شد"
    })
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: ProjectStatusEnum,
    @Query('limit')  limit  : number = 10,
    @Query('page')   page   : number = 1
  ) {
    const projects = await this.projectsService.findAll(status, limit, page)

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: projects,
      message: "لیست پروژه ها با موفقیت دریافت شد"
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: project,
      message: "پروژه با موفقیت دریافت شد"
    })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto, @Res() res: Response) {
    await this.projectsService.update(+id, updateProjectDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: "پروژه شما با موفقیت آپدیت شد"
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.projectsService.remove(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: "پروژه شما با موفقیت حذف شد"
    })
  }
}
