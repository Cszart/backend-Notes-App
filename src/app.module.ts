import { Module } from '@nestjs/common';

// Config modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { CategoriesModule } from './categories/categories.module';

// Notes

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://wurhfjxedwysmc:9a7a3094614e7c98de7479cc98f62b1d437d1720978796a5fedf0a8bf1fb8c8c@ec2-3-217-14-181.compute-1.amazonaws.com:5432/d2etbstc2806m7',
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      retryDelay: 3000,
      retryAttempts: 10,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    NotesModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
