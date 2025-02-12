import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from "./exception/filter.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // add this line to transform the request body into class objects
  }));
  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.setGlobalPrefix('api/v1');
  const port = process.env.PROJECT_PORT
  await app.listen(port, ()=> {console.log(`listening on port:${port}`);
});

}
bootstrap();
