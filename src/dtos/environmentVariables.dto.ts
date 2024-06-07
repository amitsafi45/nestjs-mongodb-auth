import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsString()
  @Matches(/^mongodb:\/\/[a-zA-Z0-9-]+(:\d+)?\/[a-zA-Z0-9-]+/)
  DB_URL: string;

  @IsNotEmpty()
  REFRESH_SECRET_KEY: string;

  @IsNotEmpty()
  ACCESS_SECRET_KEY: string;

  @IsNotEmpty()
  REFRESH_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  ACCESS_TOKEN_EXPIRES_IN: string;
}
