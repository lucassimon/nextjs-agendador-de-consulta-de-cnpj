"use client";
import styles from "./page.module.css";
import useSWR from 'swr'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Jobs = ({ params: { id } }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/job/${id}`, fetcher)
  const router = useRouter();
  const { status } = useSession({
    required: true, 
    onUnauthenticated() {
      router?.push("/dashboard/login");
    },
  })
  useEffect(() => {
    if(!data) return;
  }, [data]);

  if (status === "loading") { return <p>Loading...</p>; }
  if (status === "unauthenticated") { router?.push("/dashboard/login"); }
  if (isLoading) return <div>loading...</div>

  if (status === "authenticated") {
    return (
      <div className={styles.container}>
        <h1>Jobs ID {id}</h1>

        <p>
        Id: {data.data.id}
        </p>

        <p>
        title: {data.data.title}
        </p>

        <p>
        description: {data.data.description}
        </p>

        <p>
        Cnpj: {data.data.cpf_cnpj}
        </p>

        <p>
        priority: {data.data.priority}
        </p>

        <p>
        status: {data.data.status}
        </p>

        <p>
        creator_email: {data.data.creator_email}
        </p>

        <p>
        creator_id: {data.data.creator_id}
        </p>

        <p>
          <Link href={`/dashboard/results/${id}`}>Resultados</Link>
        </p>
      </div>
    );
  }
};

export default Jobs;
