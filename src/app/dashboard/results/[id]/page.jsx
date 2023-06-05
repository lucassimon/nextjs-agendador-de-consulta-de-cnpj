"use client";
import useSWR from 'swr'
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Results = ({ params: { id } }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/results?job_id=${id}`, fetcher)
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

        <h2>Results</h2>

        <table border="1">
          <thead> 
              <tr>
                  <th  scope="col">id</th>
                  <th scope="col">job_id</th>
                  <th scope="col">CNPJ</th>
                  <th scope="col">nome_fantasia</th>
                  <th scope="col">nome_empresarial</th>
                  <th scope="col">atividade_principal</th>
                  
                  

                  <th scope="col">data_abertura</th>
                  
                  <th scope="col">email</th>
                  
                  
                  <th scope="col">matriz_filial</th>
                  
                  <th scope="col">natureza_juridica</th>
                  
                  <th scope="col">porte</th>
                  
                  <th scope="col">telefone</th>
                  <th scope="col">uf</th>
                  <th scope="col">municipio</th>
                  <th scope="col">logradouro</th>
                  <th scope="col">numero</th>
                  <th scope="col">complemento</th>
                  <th scope="col">bairro</th>
                  <th scope="col">cep</th>
                  <th scope="col">data_pesquisa</th>
                  <th scope="col">hora_pesquisa</th>
                  <th scope="col">creator_email</th>
                  <th scope="col">creator_id</th>
                  <th scope="col">source</th>
              </tr>
          </thead>
          <tbody border="1">
            {data.data.map(result => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.job_id}</td>
                <td>{result.cnpj}</td>
                <td>{result.nome_fantasia}</td>
                <td>{result.nome_empresarial}</td>
                <td>{result.atividade_principal}</td>
                <td>{result.data_abertura}</td>
                <td>{result.email}</td>
                <td>{result.matriz_filial}</td>
                
                <td>{result.natureza_juridica}</td>
                
                <td>{result.porte}</td>
                
                <td>{result.telefone}</td>
                <td>{result.uf}</td>
                <td>{result.municipio}</td>
                <td>{result.logradouro}</td>
                <td>{result.numero}</td>
                <td>{result.complemento}</td>
                <td>{result.bairro}</td>
                <td>{result.cep}</td>
                <td>{result.data_pesquisa}</td>
                <td>{result.hora_pesquisa}</td>
                <td>{result.creator_email}</td>
                <td>{result.creator_id}</td>
                <td>{result.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Results;
