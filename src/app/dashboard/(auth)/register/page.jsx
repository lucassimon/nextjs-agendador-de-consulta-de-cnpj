"use client";
import axios from "axios";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'; 

const SignupSchema = yup.object().shape({
  full_name: yup.string().required(),
  email: yup.string().required(),
  cpf_cnpj: yup.string().required(),
  date_of_birth: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup.string().required(),
});

const Register = () => {
  const session = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const [error, setError] = useState(null);


  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data),
      });
      const response = await res.json()
      // console.log(response)
      if (res.status === 201) {
        router.push("/dashboard/login?success=Account has been created");
      } else {
        setError(response.error)
      }
    } catch (err) {
      // console.log(err)
      setError(err);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <h2>Please sign up to see the dashboard.</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="text" placeholder="Nome completo" required {...register('full_name')} />
          {errors.full_name && <p role="alert">{errors.full_name?.message}</p>}
        </div>

        <div>
          <input type="text" placeholder="Email" required {...register('email')} />
          {errors.email && <p role="alert">{errors.email?.message}</p>}
        </div>

        <div>
          <input type="text" placeholder="Cpf somente numeros" required {...register('cpf_cnpj')} />
          {errors.cpf_cnpj && <p role="alert">{errors.cpf_cnpj?.message}</p>}
        </div>

        <div>
          <input type="text" placeholder="YYYY-MM-DD" required {...register('date_of_birth')} />
          {errors.date_of_birth && <p role="alert">{errors.date_of_birth?.message}</p>}
        </div>

        <div>
          <input type="password" placeholder="Password" required {...register('password')} />
          {errors.password && <p role="alert">{errors.password?.message}</p>}
        </div>

        <div>
          <input type="confirm_password" placeholder="Confirm Password" {...register('confirm_password')} />
          {errors.confirm_password && <p role="alert">{errors.confirm_password?.message}</p>}
        </div>
        
        {error !== null && <div>{error}</div>}
        
        <button type="submit">Register</button>
      </form>
      <span>- OR -</span>
      <Link href="/dashboard/login">Login with an existing account</Link>
    </div>
  );

};

export default Register;
