import {AuthenticationMetadata} from '@loopback/authentication';

// enum for available secured type,
export enum SecuredType {
  IS_AUTHENTICATED, // any authenticated user
  PERMIT_ALL, // bypass security check, permit everyone
  HAS_ANY_ROLE, // user must have one or more roles specified in the `roles` attribute
  HAS_ROLES, // user mast have all roles specified in the `roles` attribute
  DENY_ALL, // you shall not pass!
}

export interface MyAuthenticationMetadata extends AuthenticationMetadata {
  type: SecuredType;
  roles: string[];
}

export interface Credentials {
  username: string;
  password: string;
}

export interface ClientCredentials {
  clientId: string;
  clientSecret: string;
}

export interface AuthUser {
  id?: string;
  username: string;
  password?: string;
}

export interface ClientAuthCode<T extends AuthUser> {
  clientId: string;
  userId?: string;
  user?: T;
}
