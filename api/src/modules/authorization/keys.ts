import {BindingKey} from '@loopback/core';
import {AuthenticationStrategy} from '@loopback/authentication';

// implement custom namespace bindings
export namespace MyAuthBindings {
  export const STRATEGY = BindingKey.create<AuthenticationStrategy | undefined>(
    'authentication.strategy',
  );
}
