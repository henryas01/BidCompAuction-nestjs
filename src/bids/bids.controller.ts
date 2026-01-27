import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { UpdateBidDto } from './dto/update-bid.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtRequest } from '../auth/interfaces/jwt-request.interface';

@ApiTags('Bids')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('bids')
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  // 1️⃣ POST /api/bids
  @Post()
  create(@Body() dto: CreateBidDto, @Req() req: JwtRequest) {
    console.log('JWT USER:', req.user);
    return this.bidsService.create(dto, req.user.sub);
  }

  // 2️⃣ GET /api/bids (order by highest price)
  @Get()
  findAll() {
    return this.bidsService.findAll();
  }

  // 2️⃣ GET /api/bids/me GET MY BIDS based on JWT
  @ApiOperation({ summary: 'Get all bids created by current user' })
  @Get('me')
  findMyBids(@Req() req: JwtRequest) {
    return this.bidsService.findMyBids(req.user.sub);
  }

  // 3️⃣ GET /api/bids/:id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bidsService.findOne(Number(id));
  }

  // 4️⃣ PATCH /api/bids/:id
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBidDto) {
    return this.bidsService.update(Number(id), dto);
  }

  // 5️⃣ DELETE /api/bids/:id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bidsService.remove(Number(id));
  }

  // 6️⃣ POST /api/bids/:id/select-winner (ADMIN)
  @Post(':id/select-winner')
  selectWinner(@Param('id') id: number) {
    return this.bidsService.selectWinner(Number(id));
  }
}
