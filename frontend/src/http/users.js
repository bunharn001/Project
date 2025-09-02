import { http } from './client';

export function createUser(payload) {
  return http.post('/users', payload);
}

