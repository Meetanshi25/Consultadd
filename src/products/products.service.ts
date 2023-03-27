import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductsService{
    private products: Product[]=[];

    private findProduct(id:string): [Product,number]
    {
        const productIndex=this.products.findIndex((prod)=> prod.id==id); 
        const product=this.products[productIndex];
        if(!product)
        {
          throw new NotFoundException('Could Not Find Product');
        }
        return [product,productIndex];
    }

    insertProduct( title:string, description:string, price:number){
        
        const prodId= Math.random().toString();
        const newProduct=new Product(prodId,title,description,price);
        this.products.push(newProduct);
        return prodId;

    }

    getProducts(){
       return [...this.products]; 
    }

    getSingleProduct(productID:string)
    {
      const product=this.findProduct(productID)[0];
      return {...product};
    }

    updateProduct(productID:string, title:string,desc:string,price:number){
        const [product,index]=this.findProduct(productID);
        const updatedProduct={...product};
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
        
        this.products[index]=updatedProduct;
    }
    

    deleteProduct(productID:string)
    {
        const index= this.findProduct(productID)[1];
        this.products.splice(index,1);
    }
    
}