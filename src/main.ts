import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { GlobalErrorHandlingFilter } from './utils/exceptionsFilter/globalErrorHandling.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const  httpAdapter  = app.get(HttpAdapterHost);
  app.use(helmet())
  app.useGlobalFilters(new GlobalErrorHandlingFilter(httpAdapter));
  const PORT_NUMBER=app.get(ConfigService).get('PORT')

  await app.listen(PORT_NUMBER,()=>{
    console.log(`Server listening at http://localhost:${PORT_NUMBER}`)
  });
}
bootstrap();
