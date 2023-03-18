import Input from "@/components/reusable/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import {signIn} from "next-auth/react"
import { useRouter } from "next/router";

const Auth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [variant, setVariant] = useState('login');

    const changeVariant = useCallback(() => {
        setVariant((currentVarient) => currentVarient === 'login' ? 'register' : 'login');
    }, []);
    
    const login = useCallback(async ()=>{
        try {
            signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/',
            })

            router.push('/');
            
        } catch (error) {
            console.log(error)
        }
    }, [])
    const register = useCallback(async ()=> {
        try {
            await axios.post('/api/auth/register', {
                email,
                name,
                password
            })
            login();
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpeg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 p-16 self-center lg:w-2/5 lg:max-w-md w-full rounded-md">
            <h2 className="text-white font-semibold text-4xl mb-4">{variant === 'login' ? 'Sign in' : 'Register'}</h2>
            <div className="flex flex-col gap-4">
              {
                variant === 'register' && 
                <Input
                label="Your name"
                id="name"
                type="text"
                onChange={(ev : any) => {setName(ev.target.value)}}
                value={name}
              />
              }
              <Input
                label="Your email"
                id="email"
                type="email"
                onChange={(ev : any) => {setEmail(ev.target.value)}}
                value={email}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                onChange={(ev : any) => {setPassword(ev.target.value)}}
                value={password}
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 text-white py-3 mt-10 rounded-md w-full hover:bg-red-700 transition">
                {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className="text-neutral-500 mt-12 text-center"> {variant === 'login' ? 'New to netflix? ' : 'Already have an account? '} 
                <span className="text-white ml-1 cursor-pointer hover:underline" onClick={changeVariant}>{variant === 'login' ? 'create an account' : 'login'}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
