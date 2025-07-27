import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import {environment} from '../../environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const apiKey = environment.apiKey;

  const modified = req.clone({
    setHeaders: {
      Authorization: `Api-Key ${apiKey}`
    }
  });

  return next(modified);
};
