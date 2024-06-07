import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('/test')
export class TestController{
    @Get('/admin')
    async adminApi(@Res()res:Response){
        res.status(HttpStatus.ACCEPTED).json({
            statusCode:HttpStatus.ACCEPTED,
            message:"Admin api",
          })
    }
    @Get('/member')
    async memberApi(@Res()res:Response){
        res.status(HttpStatus.ACCEPTED).json({
            statusCode:HttpStatus.ACCEPTED,
            message:"Member api",
          })
    }

    @Get('/super-admin')
    async superAdminApi(@Res()res:Response){
        res.status(HttpStatus.ACCEPTED).json({
            statusCode:HttpStatus.ACCEPTED,
            message:"Super admin api",
          })
    }
}