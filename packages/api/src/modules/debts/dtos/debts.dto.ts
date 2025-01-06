import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  IsUUID,
  IsDateString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDebtInstallmentDto } from './debt-installments.dto';
import { DebtStatus } from 'src/enums/debt-status.enum';

export class CreateDebtDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  totalAmount: number;

  @ApiProperty()
  @IsNumber()
  paidAmount: number;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ default: 'PENDING' })
  @IsOptional()
  @IsEnum(DebtStatus)
  status?: string;

  @ApiProperty({ type: [CreateDebtInstallmentDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDebtInstallmentDto)
  installments?: CreateDebtInstallmentDto[];
}

export class UpdateDebtDto extends PartialType(CreateDebtDto) {}
