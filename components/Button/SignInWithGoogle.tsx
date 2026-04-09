'use client'
import style from "./Button.module.css"
import { signIn, signOut, useSession } from "next-auth/react";
import { ImGoogle3 } from "react-icons/im";

export const SignInWithGoogle = () => {
    const { data: session, status } = useSession();
    
    return (
        <button className={style.signInAuthProvider}onClick={() => signIn("google",{ callbackUrl: "/" })}><ImGoogle3 />Sign in with Google</button>
    );

}