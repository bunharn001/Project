import { http } from './client';

export function login(payload) {
  // payload: { email, password }
  return http.post('/api/login', payload);
}
