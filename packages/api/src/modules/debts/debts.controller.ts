import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto, UpdateDebtDto } from './dtos/debts.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateDebtInstallmentDto } from './dtos/debt-installments.dto';

@ApiTags('Debts')
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create Debt with Installments' })
  @ApiCreatedResponse({ description: 'Debt and installments created' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async createDebt(@Body() createDebtDto: CreateDebtDto) {
    return await this.debtsService.createDebtWithInstallments(createDebtDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Debt by ID' })
  @ApiOkResponse({ description: 'Debt found' })
  @ApiNotFoundResponse({ description: 'Debt not found' })
  async getDebtById(@Param('id') id: string) {
    return await this.debtsService.getDebtById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get Debts by User ID' })
  @ApiOkResponse({ description: 'Debts found' })
  async getDebtsByUserId(@Param('userId') userId: string) {
    return await this.debtsService.getDebtsByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Debt and Add Installments' })
  @ApiNoContentResponse({ description: 'Debt updated and installments added' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  @ApiNotFoundResponse({ description: 'Debt not found' })
  async updateDebt(
    @Param('id') id: string,
    @Body() updateDebtDto: UpdateDebtDto,
    @Res() response: Response,
  ) {
    await this.debtsService.updateDebtAndAddInstallments(id, updateDebtDto);
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Debt' })
  @ApiOkResponse({ description: 'Debt deleted' })
  @ApiNotFoundResponse({ description: 'Debt not found' })
  async deleteDebt(@Param('id') id: string): Promise<void> {
    await this.debtsService.deleteDebt(id);
  }

  @Patch('installments/:installmentId')
  @ApiOperation({ summary: 'Update a specific Debt Installment' })
  @ApiOkResponse({ description: 'Debt installment updated' })
  @ApiNotFoundResponse({ description: 'Debt installment not found' })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  async updateDebtInstallment(
    @Param('installmentId') installmentId: string,
    @Body() updateDebtInstallmentDto: UpdateDebtInstallmentDto, // Crie um DTO específico para atualizar parcelas
  ) {
    await this.debtsService.updateInstallment(
      installmentId,
      updateDebtInstallmentDto,
    );
  }

  @Delete('installments/:installmentId')
  @ApiOperation({ summary: 'Delete a specific Debt Installment' })
  @ApiOkResponse({ description: 'Debt installment deleted' })
  @ApiNotFoundResponse({ description: 'Debt installment not found' })
  async deleteDebtInstallment(@Param('installmentId') installmentId: string) {
    await this.debtsService.deleteInstallment(installmentId);
  }
}
