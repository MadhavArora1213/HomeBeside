import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class StartSessionDto {
  @ApiProperty({ description: 'Firebase ID token from phone OTP, email/password or Google sign-in' })
  @IsString()
  @MinLength(20)
  idToken: string;

  @ApiProperty({ enum: ['customer', 'helper'] })
  @IsIn(['customer', 'helper'])
  audience: 'customer' | 'helper';

  @ApiPropertyOptional({ description: 'Stable client-generated device identifier' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  deviceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  deviceName?: string;

  @ApiPropertyOptional({ enum: ['web', 'pwa', 'mobile'] })
  @IsOptional()
  @IsIn(['web', 'pwa', 'mobile'])
  platform?: 'web' | 'pwa' | 'mobile';
}
