import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './Product/products.module';


const mongodb  = process.env.MONGODB_URI as string;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || mongodb),
    AuthModule,
    ProductsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
