import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from "@nestjs/common";
import { TestController } from "src/controllers/testController.controller";
import { AuthenticationMiddleware } from "src/middlewares/authentication.middleware";

@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
  exports: [],
})
export class TestModule implements NestModule{
       configure(consumer: MiddlewareConsumer) {
           consumer.apply(AuthenticationMiddleware).forRoutes({path:'/test/admin',method:RequestMethod.GET},{path:'/test/member',method:RequestMethod.GET})
       }        
}