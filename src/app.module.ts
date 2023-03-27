import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ ProductsModule, MongooseModule.forRoot('mongodb+srv://meetanshi:Mongo6671@cluster1.bztckjf.mongodb.net/project-db?retryWrites=true&w=majority'), ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
