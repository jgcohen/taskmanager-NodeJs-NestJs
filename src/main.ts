import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Liste de tache')
    .setDescription('Permet d\'acceder à toute mes taches et les modifier')
    .setVersion('1.0')
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: "*",
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders:
        "ACCEPT-HEADERS, ACCEPT-ACTIONS,Content-Type, Accept, x-api-key, Authorization"
})
  await app.listen(3000);
}
bootstrap();
