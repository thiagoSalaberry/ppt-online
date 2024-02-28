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
import { usePlayer } from "@/lib/api-calls";
import { searchGameroom } from "@/lib/api-calls";
export default function Search() {
    const params = useSearchParams();
    const gameroomId = params.get("gameroom");
    const [gameroom, setGameroom] = useState<GameroomData | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [player, setPlayer] = useState<{playerData: {name:string, pin:number}, playerId:string}>({playerData: {name: "", pin:0}, playerId: ""});
    const codeInputRef = useRef<HTMLInputElement>(null);
    const handleCodeSubmit = (e:any) => {
      e.preventDefault();
      if(codeInputRef.current) {
        Router.push(`/search?gameroom=${codeInputRef.current.value}`);
      };
    };
    useEffect(()=>{
      setLoading(true)
      gameroomId && searchGameroom(parseInt(gameroomId)).then((res) => {
        setLoading(false)
        if(!res) {
          return setGameroom(null);
        } else {
          setGameroom(res);
        };
      })
      .catch(()=>setGameroom(null))
      .finally(()=>setLoading(false));
    }, [gameroomId]);
    useEffect(()=>{
      usePlayer().then((p)=>{setPlayer(p)}).catch((err)=>console.log(err));
    }, []);
    const isOnwer = gameroom?.players?.host.id === player.playerId;
    const isGuest = gameroom?.players?.guest.id === player.playerId;
    const isFull = gameroom?.players?.guest.id !== "";
    const letIn = isOnwer || isGuest || !isFull;
  return (
    <main className={styles["search-page"]}>
      <Header/>
      <section className={styles["search-section"]}>
        <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">{!gameroomId ? "Buscá tu sala acá" : "Salas"}</TextComp>
        {!gameroomId ? (
          <form onSubmit={handleCodeSubmit} className={styles["code-form"]}>
            <TextField compRef={codeInputRef} type="number" name="code" label="Código" required={true}/>
            <Button type="submit" color="black">Buscar</Button>
            <Button type="button" color="back" onClick={()=>Router.push("/")}>Volver</Button>
          </form>
        ) : (
          <>
            {loading ? <CircularProgress color="inherit"/> : gameroom ? (
              <GameroomCard full={letIn} players={gameroom?.players} gameroomId={String(gameroom?.shortRoomId)} requester={{name: player.playerData.name, pin: player.playerData.pin}}/>
            ) : (
              <TextComp tag="p" size="24px" align="center" weight="600" color="#2b2b2b">La sala no existe.</TextComp>
            )}
            <Button type="button" color="back" onClick={()=>Router.back()}>Volver</Button>
          </>
        )}
      </section>
    </main>
  )
}
