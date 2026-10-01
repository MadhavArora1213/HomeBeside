import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RefreshSessionDto {
  @ApiPropertyOptional({ description: 'Refresh token; normally read from the HttpOnly cookie' })
  @IsOptional()
  @IsString()
  @MaxLength(512)
  refreshToken?: string;
}
