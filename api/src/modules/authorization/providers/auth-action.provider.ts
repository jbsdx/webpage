import {
  AuthenticateFn,
  AuthenticationStrategy,
  AuthenticationBindings,
  UserProfile,
} from '@loopback/authentication';
import {Provider, Getter, Setter, inject} from '@loopback/core';
import {MyAuthBindings} from '../keys';
import {SecuredType, MyAuthenticationMetadata} from '../types';
import {Request} from '@loopback/rest';

// the entry point for authentication.
export class MyAuthActionProvider implements Provider<AuthenticateFn> {
  constructor(
    @inject.getter(MyAuthBindings.STRATEGY)
    readonly getStrategy: Getter<AuthenticationStrategy>,
    @inject.setter(AuthenticationBindings.CURRENT_USER)
    readonly setCurrentUser: Setter<UserProfile>,
    @inject.getter(AuthenticationBindings.METADATA)
    readonly getMetadata: Getter<MyAuthenticationMetadata>,
  ) {}

  value(): AuthenticateFn {
    return request => this.action(request);
  }

  async action(request: Request): Promise<UserProfile | undefined> {
    const metadata = await this.getMetadata();
    if (metadata && metadata.type === SecuredType.PERMIT_ALL) return;

    const strategy = await this.getStrategy();
    if (!strategy) return;

    const user = await strategy.authenticate(request);
    if (!user) return;

    this.setCurrentUser(user);
    return user;
  }
}
