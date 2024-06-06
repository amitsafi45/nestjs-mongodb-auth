import { IsNumber, IsString, Matches, Max, Min } from "class-validator";

export class EnvironmentVariablesDTO{
  
    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    @Matches(/^mongodb:\/\/[a-zA-Z0-9-]+(:\d+)?\/[a-zA-Z0-9-]+/)
    DB_URL: string;

  }