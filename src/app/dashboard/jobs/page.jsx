"use client";
import useSWR from 'swr'
import React, { useEffect, useState } from "react";
import Link from 'next/link'
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/jobs?page=1&per_page=2', fetcher)
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
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  if (status === "authenticated") {
    return (
      <div className={styles.container}>

        <h1>Jobs</h1>
        <ul>
          <li><Link href='/dashboard/jobs/create'>Create</Link></li>
        </ul>

        <table border="1">
          <thead>
              <tr>
                  <th scope="col">Title</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">Actions</th>
              </tr>
          </thead>
          <tbody>
            {data.data.items.map(job => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.cpf_cnpj}</td>
                <td>
                  <Link href={`/dashboard/job/${job.id}`}>Ver mais</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Jobs;
