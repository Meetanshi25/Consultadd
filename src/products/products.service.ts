import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService{
    private products: Product[]=[];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>){}

     private async findProduct(id:string): Promise<Product>
    {
        let product;
        try{

         product = await this.productModel.findById(id).exec();
        }
         catch(error){
            throw new NotFoundException('Not Found the Product');
        }
       
        if(!product)
        {
          throw new NotFoundException('Could Not Find Product');
        }
        return product;
    }

    async insertProduct( title:string, description:string, price:number){
        
        const prodId= Math.random().toString();
        const newProduct=new this.productModel({title,description,price});

        const result = await newProduct.save();
        this.products.push(newProduct);
        console.log(result);
        return result.id as string;
        //return prodId;

    }

    async getProducts(){
       
        const result = await this.productModel.find();
        console.log(result);
       return result.map((prod)=> ({id: prod.id, title:prod.title,description: prod.description,price:prod.price})); 
    }

    async getSingleProduct(productID:string)
    {
      const product= await this.findProduct(productID);
      return {id: product.id, title: product.title, description: product.description, price: product.price};
    }

    async updateProduct(productID:string, title:string,desc:string,price:number){
        const updatedProduct=await this.findProduct(productID);
        
      
        if(title)
        {
          updatedProduct.title=title;
        }
        if(desc)
        {
          updatedProduct.description=desc;
        }
        if(price)
        {
          updatedProduct.price=price;
        }
        
        updatedProduct.save();
    }
    

    async deleteProduct(productID:string)
    {
        let product=this.findProduct(productID);

       const result = await this.productModel.deleteOne({_id:productID}).exec();
       if(!product)
       {
        throw new NotFoundException('Could Not Find Product');
       }
    }
    
}