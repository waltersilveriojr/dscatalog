import { Role } from 'Types/role';
import { getTokenData } from './token';

export const isAuthenticated = (): boolean => {
    const TokenData = getTokenData();
    return (TokenData && TokenData.exp * 1000 > Date.now()) ? true : false;
}

export const hasAnyRoles = (roles: Role[]): boolean => {

    if (roles.length === 0) {
        return true;
    }

    const tokenData = getTokenData();
    if (tokenData !== undefined) {
        return roles.some(role => tokenData.authorities.includes(role));
    }

    return false;
}