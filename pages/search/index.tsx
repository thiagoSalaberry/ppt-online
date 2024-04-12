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
    const [code, setCode] = useState("");
    const [missing, setMissgin] = useState(false);
    const [gameroom, setGameroom] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const handleInputChange = (value: string):void => {
      setCode(value)
      setMissgin(false)
    };
    const handleOnInvalid = (e: React.FormEvent<HTMLFormElement>):void => {
      e.preventDefault();
      setMissgin(true)
    }
    const handleCodeSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
      e.preventDefault();
      Router.push(`/search?gameroom=${code}`);
    };
    useEffect(()=>{
      setLoading(true)
      gameroomId && searchGameroom(parseInt(code))
        .then((res) => {
          setLoading(false);
          if(!res) {
            setError(true)
          } else {
            setError(false);
            setGameroom(res)
          }
        })
        .catch(()=>{
          setError(true)
        })
        .finally(()=>{
          setLoading(false)
        });
      console.log(gameroom)
    }, [gameroomId])
  return (
    <main className={styles["search-page"]}>
      <Header/>
      <section className={styles["search-section"]}>
        <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">{!gameroomId ? "Buscá tu sala acá" : "Salas"}</TextComp>
        {!gameroomId ? (
          <form onSubmit={handleCodeSubmit} onInvalid={handleOnInvalid} className={styles["code-form"]}>
            <TextField type="number" name="code" label="Código" id="code" required missing={missing} value={code} onChange={(value) => handleInputChange(value)}/>
            <Button type="submit" color="black">Buscar</Button>
            <Button type="button" color="back" onClick={()=>Router.push("/")}>Volver</Button>
          </form>
        ) : (
          <>
            {loading ? <CircularProgress color="inherit"/> : error ? (
              <TextComp tag="p" size="24px" align="center" weight="600" color="#2b2b2b">La sala no existe.</TextComp>
              ) : (
              <p>god</p>
                // <GameroomCard full={false} players={{host: {}}} gameroomId={String(gameroom?.shortRoomId)} requester={{name: player.playerData.name, pin: player.playerData.pin}}/>
            )}
            <Button type="button" color="back" onClick={()=>{Router.push("/search")}}>Volver</Button>
          </>
        )}
      </section>
    </main>
  )
}
