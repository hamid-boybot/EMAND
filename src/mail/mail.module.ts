import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({})
export class MailModule {
  providers: [MailService];
  exports: [MailService];
}
