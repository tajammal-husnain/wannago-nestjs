import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

async function loadDatabaseConfig(): Promise<DataSource> {
  // configService: ConfigService,
  const configModule: any = ConfigModule.forRoot();
  const configService = new ConfigService(configModule.options);
  return new DataSource({
    type: 'postgres',
    host: configService.get('.POSTGRES_HOST'),
    port: +configService.get('.POSTGRES_PORT'),
    username: configService.get('.POSTGRES_USER'),
    password: configService.get('.POSTGRES_PASSWORD'),
    database: configService.get('.POSTGRES_DB'),
    // ssl: {
    //   rejectUnauthorized: false,
    // },

    entities: [__dirname + '/src/**/entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: false,
  });
}

export default loadDatabaseConfig();
