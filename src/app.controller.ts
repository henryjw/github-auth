import { Controller, Body, Post } from '@nestjs/common';
import { AppService, TokenRequest, TokenResponse } from './app.service';

@Controller('token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async token(@Body() input: TokenRequest): Promise<TokenResponse> {
    return this.appService.token(input);
  }
}
