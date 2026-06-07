import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calculation } from './entities/calculation.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(Calculation)
    private readonly calculationRepo: Repository<Calculation>,
  ) {}

  async findAll(): Promise<Calculation[]> {
    return this.calculationRepo.find({
      order: { createdAt: 'DESC' },
      take: 20,
      select: {
        id: true,
        createdAt: true,
        movieTitle: true,
        genre: true,
        budget: true,
        marketingBudget: true,
        fbp: true,
        iab: true,
        vrc: true,
        riskLabel: true,
      },
    });
  }

  async remove(id: string) {
    await this.calculationRepo.delete(id);
    return { deleted: true };
  }
}
