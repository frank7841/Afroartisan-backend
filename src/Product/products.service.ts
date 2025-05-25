import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "domain";
import { Model, Types } from "mongoose";
import { Product, ProductDocument } from "src/schemas/product.schema";
import { CreateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ){}
    async create(createProductDto:CreateProductDto, adminId:string):Promise<Product>{
        const product = new this.productModel({
            ...createProductDto,
            addedBy: new Types.ObjectId(adminId),
        });
        return product.save();
    }


}