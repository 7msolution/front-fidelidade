import { getSession } from 'next-auth/react';

export async function getSessionData() {
  try {
    const session = await getSession();
  
    return session;
  } catch (error) {
    console.error('Error fetching session:', error);
    return null;
  }
}