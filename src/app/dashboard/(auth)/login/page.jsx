"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'; 


const SigninSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});


const Login = ({ url }) => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SigninSchema),
  });

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const onSubmit = async (data) => {
    // console.log(data)
    signIn("credentials", { email: data.email, password: data.password, callbackUrl: `/dashboard` });
  };

  return (
    <div>
      <h1>{success ? success : "Welcome Back"}</h1>
      <h2>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Email" required {...register('email')} />
          {errors.email && <p role="alert">{errors.email?.message}</p>}
        </div>

        <div>
          <input type="password" placeholder="Password" required {...register('password')} />
          {errors.password && <p role="alert">{errors.password?.message}</p>}
        </div>

        {error !== null && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
      {/* <button onClick={() => {signIn("google");}}>Login with Google</button> */}
      <span>- OR -</span>
      <Link href="/dashboard/register">Create new account</Link>
    </div>
  );
};

export default Login;
