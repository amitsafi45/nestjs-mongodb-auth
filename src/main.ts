import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  const PORT_NUMBER=app.get(ConfigService).get('PORT')
  await app.listen(PORT_NUMBER,()=>{
    console.log(`Server listening at http://localhost:${PORT_NUMBER}`)
  });
}
bootstrap();
