import { IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import TaskStatusEnum from "../enums/taskStatusEnum";

export class CreateTaskDto {
    @IsString({ message: "عنوان باید یک رشته باشد" })
    @MinLength(3, { message: "عنوان باید حداقل 3 کاراکتر باشد" })
    @IsNotEmpty({ message: "عنوان حتما باید وارد شود" })
    title: string;

    @IsString({ message: "توضیحات باید یک رشته باشد" })
    @MinLength(10, { message: "توضیحات باید حداقل 10 کاراکتر باشد" })
    @IsOptional()
    description: string;


    @IsEnum(TaskStatusEnum, { message: "وضعیت نامعتبر است" })
    @IsOptional()
    status: TaskStatusEnum;

    @IsNotEmpty({ message: "پروژه حتما باید وارد شود" })
    projectId: number;
}
