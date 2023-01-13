import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { IsValidDateStringPipe } from './IsValidDateString.pipe';
import { format } from 'date-fns';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto);
  // }

  @Get()
  findMessagesByDate(
    @Query(
      'date',
      new DefaultValuePipe(format(new Date(), 'yyyy-MM')),
      new IsValidDateStringPipe(),
    )
    datestring: string,
    @Query(
      'fromDate',
      // new DefaultValuePipe(format(new Date(), 'yyyy-MM')),
      new IsValidDateStringPipe(),
    )
    fromDateString: string | undefined,
    @Query(
      'toDate',
      // new DefaultValuePipe(format(new Date(), 'yyyy-MM')),
      new IsValidDateStringPipe(),
    )
    toDateString: string | undefined,
  ) {
    // console.log('date', date);
    return this.messageService.findMessagesByDate({
      datestring,
      fromDateString,
      toDateString,
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
