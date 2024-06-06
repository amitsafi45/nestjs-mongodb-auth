import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { GlobalErrorHandlingFilter } from './utils/exceptionsFilter/globalErrorHandling.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { errorMessageExtract } from './utils/errorMessageExtract';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger: ['debug', 'error', 'log', 'fatal'],});
  const  httpAdapter  = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api/v1');
  app.use(helmet())
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError:true,
    transform:true,
    // whitelist:true,
    exceptionFactory:errorMessageExtract,

  }));
  const PORT_NUMBER=app.get(ConfigService).get('PORT')

  await app.listen(PORT_NUMBER,()=>{
    console.log(`Server listening at http://localhost:${PORT_NUMBER}`)
  });
}
bootstrap();
