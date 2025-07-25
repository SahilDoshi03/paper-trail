'use server'

import { signIn } from '@/auth'

export async function signInWithGithub() {
  return await signIn('github', {
    redirectTo: "http://localhost:3000"
  })
}

