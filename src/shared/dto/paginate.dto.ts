import { IsOptional } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  take: number;

  @IsOptional()
  offset: number;
}
