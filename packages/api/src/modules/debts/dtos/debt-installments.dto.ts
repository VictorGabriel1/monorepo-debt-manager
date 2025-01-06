import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNumber,
  IsDateString,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { DebtStatus } from 'src/enums/debt-status.enum';

export class CreateDebtInstallmentDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ default: 'PENDING' })
  @IsOptional()
  @IsEnum(DebtStatus)
  status?: string;
}

export class UpdateDebtInstallmentDto extends PartialType(
  CreateDebtInstallmentDto,
) {}
