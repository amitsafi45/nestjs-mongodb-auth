import { Connection } from "mongoose";
import { TokenSchema } from "src/schemas/token.schema";

export const tokenProvider=[
    {
     provide:"TOKEN_MODEL",
     useFactory:(connection:Connection)=>connection.model('Token',TokenSchema),
     inject:["DATABASE_CONNECTION"]
    }
]