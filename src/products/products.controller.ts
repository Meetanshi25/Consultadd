import { Controller, Post, Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{

    constructor(private readonly productS:ProductsService){}

    @Post()
    async addProduct(@Body('title') productT:string,@Body('description') productD:string,@Body('price') productP: number ) {
        const generatedId= await this.productS.insertProduct(productT,productD,productP);
        return {Id: generatedId};
    }

    @Get()
    async getAllProducts(){
       const products = await  this.productS.getProducts();
       return products;
    }
    
    @Get(':id')
     getProduct(@Param('id') prodID: string){
        return this.productS.getSingleProduct(prodID);
        
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodID: string, @Body('title') prodTitle:string, @Body('description') prodDesc:string, @Body('price') prodPrice:number){

        await this.productS.updateProduct(prodID,prodTitle,prodDesc,prodPrice);
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodID: string)
    {
       await this.productS.deleteProduct(prodID);
       return null;
    }
}