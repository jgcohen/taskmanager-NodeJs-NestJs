import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import Config from "./config"

@Module({
  imports: [TasksModule, AuthModule, MongooseModule.forRoot(Config.getInstance().mongodbUri), UsersModule]
})
export class AppModule { }
