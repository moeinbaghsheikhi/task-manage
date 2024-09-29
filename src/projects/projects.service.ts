import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import ProjectStatusEnum from './enums/ProjectStatusEnum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ){}


  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try{
      const newProject = this.projectRepository.create(createProjectDto)

      return await this.projectRepository.save(newProject)

    } catch(error){
      throw new BadRequestException("هنگام ایجاد پروژه خطایی رخ داد");
    }
  }

  async findAll(status?: ProjectStatusEnum, limit: number = 10, page: number = 1) {
    const query = this.projectRepository.createQueryBuilder('projects');

    if(status){
      query.where('status = :status', { status })
    }
    
    query.skip((page - 1) * limit).take(limit)

    return await query.getMany();
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id })

    if(!project) throw new NotFoundException(`پروژه ${id} پیدا نشد!`)

    return project
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id })

    if(!project) 
      throw new NotFoundException(`پروژه ${id} پیدا نشد!`)

    try{
      const updateProject = await this.projectRepository.update(id, updateProjectDto)

      return updateProject
    } catch{
      throw new BadRequestException("هنگام آپدیت پروژه خطایی رخ داد!")
    }

  }

  async remove(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id)
    
    if(result.affected === 0)
      throw new NotFoundException(`پروژه ${id} پیدا نشد!`)
  }
}
