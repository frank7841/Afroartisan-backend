import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService,
        private authService: AuthService
    ){
        const jwtSecret = configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not configured');
        }
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: jwtSecret,
        });
    }
    async validate(payload:any){
        const user = await this.authService.validateUserById(payload.sub, payload.type)
        if(!user){
            throw new UnauthorizedException();

        }
        return { userId: payload.sub, email: payload.email, role:payload.role, type:payload.type}
    }

}
