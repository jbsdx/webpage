import {Injectable} from '@angular/core';

export abstract class BaseApiService {
  protected accessToken: string;
  protected basePath: string = '';

  constructor() {}
}
