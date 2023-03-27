import { Controller, Post, Body, Get,Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController{

    constructor(private readonly productS:ProductsService){}

    @Post()
    addProduct(@Body('title') productT:string,@Body('description') productD:string,@Body('price') productP: number ): any{
        const generatedId= this.productS.insertProduct(productT,productD,productP);
        return {Id: generatedId};
    }

    @Get()
    getAllProducts(){
       return this.productS.getProducts();
    }
    
    @Get(':id')
    getProduct(@Param('id') prodID: string){
        return this.productS.getSingleProduct(prodID);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodID: string, @Body('title') prodTitle:string, @Body('description') prodDesc:string, @Body('price') prodPrice:number){

        this.productS.updateProduct(prodID,prodTitle,prodDesc,prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodID: string)
    {
       this.productS.deleteProduct(prodID);
       return null;
    }
}