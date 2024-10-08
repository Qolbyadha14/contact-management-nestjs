import { Body, Controller, Delete, Get, HttpCode, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "../model/user.model";
import { WebResponse } from "../model/web.model";
import { User } from "@prisma/client";
import { Auth } from "../common/auth.decorator";


@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {

    const result = await this.userService.register(request);

    return {
      data: result
    }
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>> {

    const result = await this.userService.login(request);

    return {
      data: result
    }
  }

  @Get('/current')
  @HttpCode(200)
  async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.get(user);
    return {
      data: result
    }
  }

  @Patch('/current')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Body() request: UpdateUserRequest
  ): Promise<WebResponse<UserResponse>> {
    const result = await this.userService.update(user, request);
    return {
      data: result
    }
  }

  @Delete('/current')
  @HttpCode(200)
  async logout(@Auth() user: User): Promise<WebResponse<Boolean>> {
    await this.userService.logout(user);
    return {
      data: true
    }
  }


}