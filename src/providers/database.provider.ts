import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

export const databaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const connection = await mongoose.connect(configService.get('DB_URL'));
      if (connection.connection.readyState !== 1) {
        console.log('Database connecttion Failed');
      }
      return connection;
    },
    inject: [ConfigService],
  },
];
