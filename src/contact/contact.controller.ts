import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { ContactResponse, CreateContactRequest, UpdateContactRequest } from "../model/contact.model";
import { WebResponse } from "../model/web.model";
import { Auth } from "../common/auth.decorator";
import { User } from "@prisma/client";

@Controller("/api/contacts")
export class ContactController{
  constructor( private contactService: ContactService) {}

  @Post()
  async create(
    @Auth() user: User,
    @Body() request: CreateContactRequest): Promise<WebResponse<ContactResponse>> {

    const result = await this.contactService.create(user, request);

    return {
      data: result,
    }
  }

  @Get("/:contactId")
  async get(
    @Auth() user: User,
    @Param("contactId", ParseIntPipe) contactId: number): Promise<WebResponse<ContactResponse>> {

    const result = await this.contactService.get(user, contactId);

    return {
      data: result,
    }
  }

  @Put("/:contactId")
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param("contactId", ParseIntPipe) contactId: number,
    @Body() request: UpdateContactRequest): Promise<WebResponse<ContactResponse>> {
    request.id = contactId;

    const result = await this.contactService.update(user, request);

    return {
      data: result,
    }
  }
}