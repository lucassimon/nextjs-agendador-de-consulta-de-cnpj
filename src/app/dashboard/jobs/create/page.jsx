"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; 
import { yupResolver } from '@hookform/resolvers/yup'; 

const CreateJobSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  cpf_cnpj: yup.string().required(),
  date: yup.date().required(),
  priority: yup.number().required()
});


const Jobs = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateJobSchema),
  });

  const onSubmit = async (data) => {
    console.log(data)
    const parsedData = dayjs(data.date.toISOString()).format('YYYY-MM-DD HH:mm:ss')
    data.date = parsedData
    try {
      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(data),
      });
      const response = await res.json()
      // console.log(response)
      if (res.status === 200) {
        setSuccess('ok')
        // console.log('success')
      } else {
        setError(response.error)
      }
    } catch (err) {
      // console.log(err)
      setError(err);
    }
  };

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <h1>Create Jobs</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input type="text" placeholder="title" required {...register('title')} />
            {errors.title && <p role="alert">{errors.title?.message}</p>}
          </div>

          <div>
            <input type="text" placeholder="description" required {...register('description')} />
            {errors.description && <p role="alert">{errors.description?.message}</p>}
          </div>

          <div>
            <input type="text" placeholder="cnpj" required {...register('cpf_cnpj')} />
            {errors.cpf_cnpj && <p role="alert">{errors.cpf_cnpj?.message}</p>}
          </div>

          <div>
            <input type="datetime-local" placeholder="date" required {...register('date')} />
            {errors.date && <p role="alert">{errors.date?.message}</p>}
          </div>

          <div>
            <input type="number" max="5" placeholder="priority" required {...register('priority')} />
            {errors.priority && <p role="alert">{errors.priority?.message}</p>}
          </div>
          {success !== "" && <div>Job created</div>}
          {error !== null && <div>{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
};

export default Jobs;
