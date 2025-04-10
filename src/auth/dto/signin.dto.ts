import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User’s email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description:
      'Password must be at least 8 characters long and include at least one letter, one number, and one special character.',
    minLength: 8,
    type: String,
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[a-zA-Z])/, {
    message: 'Password must contain at least one letter.',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number.',
  })
  @Matches(/(?=.*[^a-zA-Z0-9])/, {
    message: 'Password must contain at least one special character.',
  })
  password: string;
}
