import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateListingInputDto } from './dto/create-listing-input.dto';
import { PaginatedResponseDto } from './dto/pagination-response.dto';
import { Listing } from './entities/listings.entity';
import { GetListingsDto } from './dto/get-listings.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('listing.find')
  async getPaginated(
    @Payload() data: GetListingsDto,
  ): Promise<PaginatedResponseDto<Listing>> {
    return await this.appService.getListings(data);
  }

  @MessagePattern('listing.create-ad')
  async createAd(
    @Payload() data: { createAdDto: CreateListingInputDto; userId: string },
  ) {
    const { createAdDto, userId } = data;
    return await this.appService.createNewAd(createAdDto, userId);
  }
}
