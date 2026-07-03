import { traceOp } from 'services/telemetry';
import request from 'services/api/client';
import { AUTH } from 'services/api/endpoints';

export async function registerAdmin({ name, email, password }) {
  return traceOp('auth.register', { 'auth.email': email }, async () => {
    return request(AUTH.REGISTER, { body: { name, email, password } });
  });
}

export async function loginAdmin({ email, password }) {
  return traceOp('auth.login', { 'auth.email': email }, async () => {
    return request(AUTH.LOGIN, { body: { email, password } });
  });
}
