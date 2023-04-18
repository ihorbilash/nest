
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './utility/filters/http-exception.filter';
import { NotFoundExceptionFilter } from './utility/filters/not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const configSwager = new DocumentBuilder()
    .setTitle('StarWar example')
    .setDescription('The starwar API description')
    .setVersion('1.0')
    .addTag('StarWars')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    })
    .build();

    
  app.useGlobalFilters(new HttpExceptionFilter(),
   new NotFoundExceptionFilter());
  
  const document = SwaggerModule.createDocument(app, configSwager);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log(`server app on ${PORT} port`,
    "test- attempt 3")
  });
}
bootstrap();
