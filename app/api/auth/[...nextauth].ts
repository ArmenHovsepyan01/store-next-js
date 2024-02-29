import NextAuth from 'next-auth';
import { httpAdapter } from 'next-auth-http-adapter';
import adapter from 'next-auth-http-adapter';

export const authOptions = {
  providers: []
};

export default NextAuth(authOptions);
