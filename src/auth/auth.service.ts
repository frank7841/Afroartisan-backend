import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Admin Authentication
  async validateAdmin(email: string, password: string): Promise<any> {
    const admin = await this.adminModel.findOne({ email, isActive: true });
    if (admin && await bcrypt.compare(password, admin.password)) {
      const { password, ...result } = admin.toObject();
      return result;
    }
    return null;
  }

  async loginAdmin(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = { 
      email: admin.email, 
      sub: admin._id, 
      role: admin.role,
      type: 'admin'
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: admin,
    };
  }

  async registerAdmin(email: string, password: string) {
    const existingAdmin = await this.adminModel.findOne({ email });
    if (existingAdmin) {
      throw new ConflictException('Admin already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const admin = new this.adminModel({
      email,
      password: hashedPassword,
    });

    await admin.save();
    const { password: _, ...result } = admin.toObject();
    return result;
  }

  // Social User Authentication
  async findOrCreateSocialUser(socialUser: any): Promise<User> {
    let user = await this.userModel.findOne({
      $or: [
        { email: socialUser.email },
        { providerId: socialUser.providerId, provider: socialUser.provider }
      ]
    });

    if (!user) {
      user = new this.userModel(socialUser);
      await user.save();
    } else {
      // Update user info if needed
      user.name = socialUser.name;
      user.avatar = socialUser.avatar;
      await user.save();
    }

    return user;
  }

  async loginSocialUser(socialUser: any) {
    const user = await this.findOrCreateSocialUser(socialUser);
    const userDoc = user as UserDocument;
    
    const payload = { 
      email: userDoc.email, 
      sub: userDoc._id,
      role: userDoc.role,
      type: 'user'
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: userDoc,
    };
}
  // Validation helper
  async validateUserById(userId: string, type: string): Promise<any> {
    if (type === 'admin') {
      return this.adminModel.findById(userId).select('-password');
    } else {
      return this.userModel.findById(userId);
    }
  }
}