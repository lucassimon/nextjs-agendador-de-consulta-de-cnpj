"use client"
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import AuthProvider from "@/providers/AuthProvider";
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from "react";
import { useSession } from "next-auth/react";
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  const [activeItem, setActiveItem] = useState("")
  const handleItemClick = (e, { name }) => setActiveItem(name)
  
  return (
    <html lang="en">
      <body >
        <ul>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/dashboard'>Dashboard</Link></li>
          <li><Link href='/dashboard/jobs'>Jobs</Link></li>
        </ul>
        <AuthProvider>
          

          
            {children}
          
        </AuthProvider>
      </body>
    </html>
  )
}
