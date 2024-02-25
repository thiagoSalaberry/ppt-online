import { Button } from "@/ui/buttons";
import { Header } from "@/components/header";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import { CircularProgress } from "@mui/material";
import styles from "./search.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { GameroomCard } from "@/components/gameroom-card";
import { searchGameroom } from "@/lib/api-calls";
export default function Search() {
    const params = useSearchParams();
    const gameroomId = params.get("gameroom")!;
    const [gameroom, setGameroom] = useState<GameroomData>();
    const [error, setError] = useState(false);
    useEffect(()=>{
      searchGameroom(parseInt(gameroomId)).then((res) => {
        if(res.message) return setError(true);
        else setGameroom(res);
      });
    }, [gameroomId]);
    console.log({gameroom})
  return (
    <main className={styles["search-page"]}>
      <Header/>
      <div className={styles["search-section"]}>
        <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Salas</TextComp>        
      </div>
    </main>
  )
}
