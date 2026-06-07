import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculateMovieDto } from './dto/calculate-movie.dto';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly calculatorService: CalculatorService) {}

  @Post('calculate')
  async calculate(@Body() dto: CalculateMovieDto) {
    return this.calculatorService.calculate(dto);
  }
}
