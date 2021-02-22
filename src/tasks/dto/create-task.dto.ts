import{IsNotEmpty} from 'class-validator';
import { string } from 'yargs';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    status: string;
}


