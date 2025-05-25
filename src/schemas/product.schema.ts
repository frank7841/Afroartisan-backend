import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ProductDocument = Product & Document;
export enum ProductCategory {
    SCULPTURE = 'sculpture',
    PAINTING = 'painting',
    MASK = 'mask',
    TEXTILE = 'textile',
    JEWELRY = 'jewelry',
    POTTERY = 'pottery',
    WOODCARVING = 'woodcarving',
    BEADWORK = 'beadwork',
    BASKET = 'basket',
    INSTRUMENT = 'instrument'
  }
  export enum ProductStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    OUT_OF_STOCK = 'out_of_stock',
    DISCONTINUED = 'discontinued'
  }
  
  export enum ProductCondition {
    NEW = 'new',
    VINTAGE = 'vintage',
    ANTIQUE = 'antique',
    RESTORED = 'restored'
  }
  interface IDimensions {
    length?: number;
    width?: number;
    height?: number;
    weight?: number; // in grams
  }
  
  @Schema({ timestamps: true })

  export class Product {
    @Prop({ required: true, trim: true })
    name: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true, min: 0 })
    price: number;
  
    @Prop({ required: true, enum: ProductCategory })
    category: ProductCategory;
  
    @Prop({ required: true })
    origin: string; // Country/region of origin
  
    @Prop({ required: true })
    artist: string; // Artist or artisan name
  
    @Prop()
    tribe?: string; // Tribal origin if applicable
  
    @Prop({ required: true, min: 0 })
    stock: number;
  
    @Prop([String])
    images: string[]; // Array of image URLs
  
    @Prop({
      type: {
        length: { type: Number },
        width: { type: Number },
        height: { type: Number },
        weight: { type: Number }
      }
    })
    dimensions? : IDimensions
  
    @Prop([String])
    materials: string[]; // e.g., ['wood', 'bronze', 'ivory']
  
    @Prop({ enum: ProductCondition, default: ProductCondition.NEW })
    condition: ProductCondition;
  
    @Prop()
    yearCreated?: number;
  
    @Prop({ enum: ProductStatus, default: ProductStatus.ACTIVE })
    status: ProductStatus;
  
    @Prop([String])
    tags: string[]; // For search and filtering
  
    @Prop({ default: false })
    isFeatured: boolean;
  
    @Prop({ default: 0, min: 0, max: 5 })
    averageRating: number;
  
    @Prop({ default: 0 })
    reviewCount: number;
  
    @Prop({ default: 0 })
    viewCount: number;
  
    @Prop()
    culturalSignificance?: string; // Historical/cultural context
  
    @Prop()
    authenticityNote?: string; // Authentication details
  
    @Prop({ type: Types.ObjectId, ref: 'Admin', required: true })
    addedBy: Types.ObjectId;
  
    @Prop()
    lastModifiedBy?: Types.ObjectId;
  
    // SEO fields
    @Prop()
    seoTitle?: string;
  
    @Prop()
    seoDescription?: string;
  
    @Prop([String])
    seoKeywords?: string[];
  }

  export const ProductSchema = SchemaFactory.createForClass(Product);

  //indexes for better performance

  ProductSchema.index({category:1, status:1});
  ProductSchema.index({origin:1})
  ProductSchema.index({artist:1})
  ProductSchema.index({price:1})
  ProductSchema.index({name:'text', description:'text', tags:'text'})
  
  
  