import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "domain";
import { Model, Types } from "mongoose";
import { Product, ProductDocument, ProductStatus } from "src/schemas/product.schema";
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    ) { }
    async create(createProductDto: CreateProductDto, adminId: string): Promise<Product> {
        const product = new this.productModel({
            ...createProductDto,
            addedBy: new Types.ObjectId(adminId),
        });
        return product.save();
    }
    async findAll(query: ProductQueryDto) {
        const {
            search, category, origin, artist, minPrice, maxPrice, condition, status = ProductStatus.ACTIVE, isFeatured, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 20
        } = query;
        const filter: any = { status };

        if (search) {
            filter.$text = { $search: search };
        }

        if (category) {
            filter.category = category;
        }

        if (origin) {
            filter.origin = new RegExp(origin, 'i');
        }

        if (artist) {
            filter.artist = new RegExp(artist, 'i');
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) filter.price.$gte = minPrice;
            if (maxPrice !== undefined) filter.price.$lte = maxPrice;
        }

        if (condition) {
            filter.condition = condition;
        }

        if (isFeatured !== undefined) {
            filter.isFeatured = isFeatured;
        }

        // Build sort object
        const sort: any = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Execute query
        const [products, total] = await Promise.all([
            this.productModel
                .find(filter)
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .populate('addedBy', 'email')
                .exec(),
            this.productModel.countDocuments(filter),
        ]);

        return {
            products,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id: string): Promise<Product> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid product ID');
        }
        const product = await this.productModel.findById(id).populate('addedBy', 'email').populate('lastModifiedBy', 'email');
        if (!product) {
            throw new NotFoundException('Product not found')
        }
        await this.productModel.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
        return product;
    }
    async update(id: string, updateProductDto: UpdateProductDto, adminId: string): Promise<Product> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid Product Id');
        }
        const product = await this.productModel.findByIdAndUpdate(id, {
            ...updateProductDto, lastModifiedBy: new Types.ObjectId(adminId),
        }, {
            new: true, runValidators: true
        });
        if (!product) {
            throw new NotFoundException('Product Not Found')
        }
        return product;
    }

}