import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
   
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule{}