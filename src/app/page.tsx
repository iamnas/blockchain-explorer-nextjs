"use client"
import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import { ethers } from "ethers";

export default function Home() {

  const [searchVal, setSearchVal] = useState(String)
  const router = useRouter();

  const search = (e: FormEvent) => {
    e.preventDefault();
    if(ethers.isAddress(searchVal)){
      router.push(`address/${searchVal}`)

    }else{

      router.push(`transaction/${searchVal}`)
    }
    
  }
  return (
    <main id="main" >

      <h1 id="title">Blockchain Explorer</h1>

      <div id="header">
        Ethereum Blockchain explorer
      </div>

      <div id="content">
        <form >
          <input id="search" type="text" placeholder="Search transaction hash / address" onChange={e => setSearchVal(e.target.value)} value={searchVal} />
          <button id="submit" type="submit" onClick={search}> Search</button>
        </form>
      </div>

    </main>
  );
}
