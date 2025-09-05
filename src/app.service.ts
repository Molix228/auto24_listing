import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ListingRepository } from './listing.repository';
import { CreateListingInputDto } from './dto/create-listing-input.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedResponseDto } from './dto/pagination-response.dto';
import { Listing } from './entities/listings.entity';
import { GetListingsDto } from './dto/get-listings.dto';

@Injectable()
export class AppService {
  constructor(private readonly listingRepository: ListingRepository) {}

  async createNewAd(createAdDto: CreateListingInputDto, userId: string) {
    try {
      return await this.listingRepository.create(createAdDto, userId);
    } catch (err) {
      console.error('[AppService] Error creating new ad:', err);
      throw new InternalServerErrorException(
        'Failed to create new ad',
        err.message,
      );
    }
  }

  async getListings(
    data: GetListingsDto,
  ): Promise<PaginatedResponseDto<Listing>> {
    const { items, total } = await this.listingRepository.findWithFilters(
      data.filters,
      data.pagination,
    );

    return new PaginatedResponseDto(
      items,
      total,
      data.pagination.page || 1,
      data.pagination.limit || 20,
    );
  }
}
