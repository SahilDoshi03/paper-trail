'use server'

import { signIn } from '@/auth'

export async function signInWithGoogle() {
  return await signIn('google', {
    redirectTo: "http://localhost:3000"
  })
}

