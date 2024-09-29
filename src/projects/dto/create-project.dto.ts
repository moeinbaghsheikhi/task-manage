import { IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import ProjectStatusEnum from "../enums/ProjectStatusEnum";

export class CreateProjectDto {
    @IsNotEmpty({ message: "نام پروژه نمیتواند خالی باشد" })
    @IsString({ message: "نام پروژه باید یک رشته باشد" })
    name: string;

    @IsEnum(ProjectStatusEnum, { message: "وضعیت پروژه باید یکی از مقادیر (enable, disable) باشد" })
    status: ProjectStatusEnum;
}