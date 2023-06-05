"use client";
import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react"
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Dashboard = () => {

  const session = useSession();

  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <h1>Dashboard</h1>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }
};

export default Dashboard;
