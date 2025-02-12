import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { Todo } from "./entities/todo.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),
    UserModule
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}