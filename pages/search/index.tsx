import { Button } from "@/ui/buttons";
import { Header } from "@/components/header";
import { TextField } from "@/ui/text-fields";
import { TextComp } from "@/ui/texts";
import { CircularProgress } from "@mui/material";
import styles from "./search.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { GameroomCard } from "@/components/gameroom-card";
import { searchGameroom } from "@/lib/api-calls";
import { useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/currentGameState";
export default function Search() {
    const params = useSearchParams();
    const gameroomId = params.get("gameroom");
    const [gameroom, setGameroom] = useRecoilState(gameroomState);
    const [loading, setLoading] = useState<boolean>(true);
    const [player, _] = useRecoilState(playerState);
    const [error, setError] = useState(false);
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
          setError(true)
        } else {
          setError(false)
          setGameroom(res);
        };
      })
      .catch(()=>setError(true))
      .finally(()=>setLoading(false));
    }, [gameroomId]);
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
            {loading ? <CircularProgress color="inherit"/> : error ? (
              <TextComp tag="p" size="24px" align="center" weight="600" color="#2b2b2b">La sala no existe.</TextComp>
              ) : (
              <GameroomCard full={letIn} players={gameroom?.players} gameroomId={String(gameroom?.shortRoomId)} requester={{name: player.playerData.name, pin: player.playerData.pin}}/>
            )}
            <Button type="button" color="back" onClick={()=>Router.back()}>Volver</Button>
          </>
        )}
      </section>
    </main>
  )
}
