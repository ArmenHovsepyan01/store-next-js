import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import axios from 'axios';

export async function GET(request: Request) {
  const token = cookies().get('token')?.value;

  if (!token) return new Response(redirect('/'));

  const { data } = await axios.get('http://localhost:5000/api/users/auth', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (data.role === 'user') return new Response(redirect('/'));

  const date = new Date();
  date.setTime(date.getTime() + 60 * 1000);

  cookies().set('checked', token, {
    expires: date
  });

  return new Response(redirect('/dashboard'));
}
