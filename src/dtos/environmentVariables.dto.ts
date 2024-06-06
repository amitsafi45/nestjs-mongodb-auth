import { IsNumber, Max, Min } from "class-validator";

export class EnvironmentVariablesDTO{
  
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;
  }