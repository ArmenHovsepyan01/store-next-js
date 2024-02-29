// 'use server';
//
// import { cookies } from 'next/headers';
// import { encrypt } from 'next/dist/server/app-render/action-encryption-utils';
//
// export async function handleLogin(sessionData) {
//   const encryptedSessionData = encrypt(sessionData);
//   cookies().set('session', encryptedSessionData, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'development',
//     maxAge: 60 * 60 * 24 * 7,
//     path: '/'
//   });
// }
