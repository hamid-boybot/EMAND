import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeorm.config';
import { AuthModule } from './auth/auth.module';
import { PropertyModule } from './property/property.module';
import { AgencyModule } from './agency/agency.module';
//import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PropertyModule,
    AgencyModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
