import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CreateProductDto } from "./dto/product.dto";
import { JwtAuthGuard } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guards";

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController{
    constructor( private readonly productService: ProductService) {}
    //Admin Routes CRUD
    
@Post()
@Roles('admin')
create(@Body() createProductDto : CreateProductDto, @Req() req){
    return this. productService.create(createProductDto, req.user.userId)
}

}