'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export const SignInWithGoogle = () => {
    const { data: session, status } = useSession();
    
    return (
        <button onClick={() => signIn("google",{ callbackUrl: "/" })}>Sign in with Google</button>
    );

}