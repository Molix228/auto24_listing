import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ListingRepository } from './listing.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listings.entity';
import { BodyType } from './entities/nested/body-type.entity';
import { Make } from './entities/nested/makes.entity';
import { Model } from './entities/nested/models.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forFeature([Listing, BodyType, Make, Model]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ListingRepository],
})
export class AppModule {}
