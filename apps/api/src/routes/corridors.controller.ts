import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateCorridorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  originRegion!: string;

  @IsString()
  destinationRegion!: string;

  @IsString()
  status!: string;
}

@ApiTags('corridors')
@Controller('corridors')
export class CorridorsController {
  private readonly corridors = [{ id: 'demo', name: 'Northern Cape → Gauteng' }];

  @Get()
  list() {
    return this.corridors;
  }

  @Get('geojson')
  geojson() {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [20.0, -30.0],
              [28.0, -26.0],
            ],
          },
          properties: { id: 'demo', name: 'Northern Cape → Gauteng' },
        },
      ],
    };
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.corridors.find((corridor) => corridor.id === id);
  }

  @Post()
  create(@Body() dto: CreateCorridorDto) {
    const corridor = { id: crypto.randomUUID(), ...dto };
    this.corridors.push(corridor);
    return corridor;
  }
}
