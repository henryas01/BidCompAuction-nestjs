import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
  UseGuards,
  UploadedFiles,
  UseInterceptors,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserSwaggerDto } from './dto/update-user-swagger.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import type { JwtRequest } from '../auth/interfaces/jwt-request.interface';
import { imageFileFilter, resizeAndSaveImage } from '../common/upload';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Post('signup')
  signUp(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.signUp(data);
  }

  @ApiBearerAuth('access-token')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateUserSwaggerDto,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(
    FilesInterceptor('image', 5, {
      storage: multer.memoryStorage(),
      fileFilter: imageFileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // 2MB per file
      },
    }),
  )
  async updateProfile(
    @UploadedFiles() files: Express.Multer.File[] | undefined,
    @Body() dto: UpdateUserDto,
    @Req() req: JwtRequest,
  ): Promise<User> {
    const updateData: Partial<User> = { ...dto };

    for (const key in updateData) {
      if (
        updateData[key] === '' ||
        updateData[key] === null ||
        updateData[key] === undefined
      ) {
        delete updateData[key];
      }
    }

    // Resize image jika ada
    if (files && files.length > 0) {
      const path = await resizeAndSaveImage(files[0], {
        format: 'webp',
        quality: 80,
        dest: 'uploads/users',
      });
      updateData.image = path;
    }

    return this.usersService.update(req.user.sub, updateData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.usersService.remove(id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}
