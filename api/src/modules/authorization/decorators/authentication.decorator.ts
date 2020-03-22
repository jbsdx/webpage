import {SecuredType, MyAuthenticationMetadata} from '../types';
import {
  MethodDecoratorFactory,
  CoreBindings,
  inject,
  Constructor,
  MetadataInspector,
} from '@loopback/core';
import {
  AUTHENTICATION_METADATA_KEY,
  AuthMetadataProvider,
} from '@loopback/authentication';

// the decorator function, every required param has its own default
// so we can supply empty param when calling this decorartor.
// we will use 'secured' to match Spring Security annotation.
export function secured(
  type: SecuredType = SecuredType.IS_AUTHENTICATED,
  roles: string[] = [],
  strategy: string = 'jwt',
  options?: object,
) {
  // we will use a custom interface. more on this below
  return MethodDecoratorFactory.createDecorator<MyAuthenticationMetadata>(
    AUTHENTICATION_METADATA_KEY,
    {
      type,
      roles,
      strategy,
      options,
    },
  );
}

// metadata provider for `MyAuthenticationMetadata`. Will supply method's metadata when injected
export class MyAuthMetadataProvider extends AuthMetadataProvider {
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS, {optional: true})
    protected _controllerClass: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME, {optional: true})
    protected _methodName: string,
  ) {
    super(_controllerClass, _methodName);
  }

  value(): MyAuthenticationMetadata | undefined {
    if (!this._controllerClass || !this._methodName) return;
    return MetadataInspector.getMethodMetadata<MyAuthenticationMetadata>(
      AUTHENTICATION_METADATA_KEY,
      this._controllerClass.prototype,
      this._methodName,
    );
  }
}
