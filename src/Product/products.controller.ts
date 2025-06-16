import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ProductService } from "./products.service";
import { Roles } from "src/auth/decorators/roles.decorator";
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./dto/product.dto";
import { JwtAuthGuard, Public } from "src/auth/guards/auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guards";

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
    constructor(private readonly productService: ProductService) { }
    //Admin Routes CRUD

    @Post()
    @Roles('admin')
    create(@Body() createProductDto: CreateProductDto, @Req() req) {
        return this.productService.create(createProductDto, req.user.userId)
    }
    @Patch(':id')
    @Roles('admin')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req) {
        return this.productService.update(id, updateProductDto, req.user.userId);
    }

    @Delete(':id')
    @Roles('admin')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
    //update stock
    @Patch(':id/stock')
    @Roles('admin')
    updateStock(@Param('id') id: string, @Body('qunatity') quantity: number) {
        return this.productService.updateStock(id, quantity)
    }
    @Get('admin/stats')
    @Roles('admin')
    getStats() {
        return this.productService.getProductStats()
    }



    //public routes

    @Public()
    @Get()
    findAll(@Query() query: ProductQueryDto) {
        return this.productService.findAll(query)
    }
    @Public()
    @Get('category/:category')
    getBycategory(
        @Param('category') category: string,
        @Query('limit') limit?: number
    ) {
        return this.productService.getProductsByCategory(category, limit)
    }

    @Public()
    @Get('artist/:artist')
    getByArtist(
        @Param('artist') artist: string,
        @Query('limit') limit?: number
    ) {
        return this.productService.getProductsByArtist(artist, limit)
    }
    @Public()
    @Get('origin/:origin')
    getByOrigin(
        @Param('origin') origin: string,
        @Query('limit') limit?: number
    ) {
        return this.productService.getProductsByOrigin(origin, limit)
    }
    @Public()
    @Get('featured')
    getFeatured(@Query('limit') limit?: number) {
        return this.productService.getFeaturedProducts(limit)
    }
    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id)
    }


}