import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsString, Matches, MaxLength, ValidateNested } from 'class-validator';

export class ConsentItemDto {
  @ApiProperty({ example: 'terms' })
  @IsString()
  @Matches(/^[a-z][a-z0-9_]{2,49}$/)
  type: string;

  @ApiProperty({ example: '2026-09-01' })
  @IsString()
  @MaxLength(30)
  version: string;

  @ApiProperty()
  @IsBoolean()
  accepted: boolean;
}

export class RecordConsentsDto {
  @ApiProperty({ type: [ConsentItemDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ConsentItemDto)
  consents: ConsentItemDto[];
}
