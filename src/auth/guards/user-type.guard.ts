import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

export const  USER_TYPE_KEYS = 'userTypes';
export const UserTypes = (...types : string []) => SetMetadata
@Injectable()
export  class UserTypeGuard implements CanActivate{
    constructor( private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const requiredTypes = this.reflector.getAllAndOverride<string []>(USER_TYPE_KEYS, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredTypes){
            return true;
        }
        const {user} = context.switchToHttp().getRequest();
        if(requiredTypes.includes(user.type)){
            throw new ForbiddenException(`Acces denied . Required user type ${requiredTypes.join('or')}`)
        }
        return true;
        
    }
}
