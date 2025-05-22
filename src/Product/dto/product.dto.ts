import { Transform, Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { ProductCategory, ProductCondition, ProductStatus } from "src/schemas/product.schema";

export class dimensionsDto{
    @IsOptional()
    @IsNumber()
    @Min(0)
    length? : number;


    @IsOptional()
    @IsNumber()
    @Min(0)
    width?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    height?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    weight?: number;
}

export class CreateProductDto {
    @IsString()
    @Transform(({ value }) => value.trim())
    name: string;
  
    @IsString()
    description: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsEnum(ProductCategory)
    category: ProductCategory;
  
    @IsString()
    origin: string;
  
    @IsString()
    artist: string;
  
    @IsOptional()
    @IsString()
    tribe?: string;
  
    @IsNumber()
    @Min(0)
    stock: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => dimensionsDto)
    dimensions?: dimensionsDto;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    materials?: string[];
  
    @IsOptional()
    @IsEnum(ProductCondition)
    condition?: ProductCondition;
  
    @IsOptional()
    @IsNumber()
    @Min(1000)
    @Max(new Date().getFullYear())
    yearCreated?: number;
  
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;
  
    @IsOptional()
    @IsString()
    culturalSignificance?: string;
  
    @IsOptional()
    @IsString()
    authenticityNote?: string;
  
    @IsOptional()
    @IsString()
    seoTitle?: string;
  
    @IsOptional()
    @IsString()
    seoDescription?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    seoKeywords?: string[];
  }
  export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    name?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
  
    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;
  
    @IsOptional()
    @IsString()
    origin?: string;
  
    @IsOptional()
    @IsString()
    artist?: string;
  
    @IsOptional()
    @IsString()
    tribe?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    stock?: number;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];
  
    @IsOptional()
    @ValidateNested()
    @Type(() => dimensionsDto)
    dimensions?: dimensionsDto;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    materials?: string[];
  
    @IsOptional()
    @IsEnum(ProductCondition)
    condition?: ProductCondition;
  
    @IsOptional()
    @IsNumber()
    @Min(1000)
    @Max(new Date().getFullYear())
    yearCreated?: number;
  
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  
    @IsOptional()
    @IsBoolean()
    isFeatured?: boolean;
  
    @IsOptional()
    @IsString()
    culturalSignificance?: string;
  
    @IsOptional()
    @IsString()
    authenticityNote?: string;
  
    @IsOptional()
    @IsString()
    seoTitle?: string;
  
    @IsOptional()
    @IsString()
    seoDescription?: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    seoKeywords?: string[];
  }
  
  export class ProductQueryDto {
    @IsOptional()
    @IsString()
    search?: string;
  
    @IsOptional()
    @IsEnum(ProductCategory)
    category?: ProductCategory;
  
    @IsOptional()
    @IsString()
    origin?: string;
  
    @IsOptional()
    @IsString()
    artist?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    minPrice?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    maxPrice?: number;
  
    @IsOptional()
    @IsEnum(ProductCondition)
    condition?: ProductCondition;
  
    @IsOptional()
    @IsEnum(ProductStatus)
    status?: ProductStatus;
  
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isFeatured?: boolean;
  
    @IsOptional()
    @IsString()
    sortBy?: string; // 'price', 'name', 'createdAt', 'rating'
  
    @IsOptional()
    @IsString()
    sortOrder?: 'asc' | 'desc';
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(100)
    @Type(() => Number)
    limit?: number = 20;
  }