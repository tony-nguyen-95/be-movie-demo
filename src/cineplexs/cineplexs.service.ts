import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cineplex } from './cineplex.entity';
import { CreateCineplexDto } from './dto/create-cineplex.dto';

@Injectable()
export class CineplexsService {
  constructor(
    @InjectRepository(Cineplex)
    private cineplexRepository: Repository<Cineplex>,
  ) {}

  async getAllCineplexs(): Promise<Array<Cineplex>> {
    const query = this.cineplexRepository.createQueryBuilder('cineplex');

    const cineplexs = this.cineplexRepository.find({
      relations: {
        cinemas: true,
      },
    });

    return cineplexs;
  }

  async getCineplexById(id: string): Promise<Cineplex> {
    const found = await this.cineplexRepository.findOne({
      where: { id },
      relations: {
        cinemas: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`Cineplex with ID "${id}" not found`);
    }

    return found;
  }

  async createCineplex(
    createCineplexDto: CreateCineplexDto,
  ): Promise<Cineplex> {
    const { cineplexName, logo } = createCineplexDto;

    const cineplex = this.cineplexRepository.create({
      cineplexName,
      logo,
    });

    await this.cineplexRepository.save(cineplex);
    return cineplex;
  }

  async deleteCineplex(id: string): Promise<void> {
    const result = await this.cineplexRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Cineplex with ID "${id}" not found`);
    }
  }

  async updateCineplex(
    id: string,
    updateCineplexDto: CreateCineplexDto,
  ): Promise<Cineplex> {
    const { cineplexName, logo } = updateCineplexDto;
    let cineplex = await this.getCineplexById(id);

    cineplex = {
      ...cineplex,
      cineplexName,
      logo,
    };

    await this.cineplexRepository.save(cineplex);

    delete cineplex.id;

    return cineplex;
  }
}
