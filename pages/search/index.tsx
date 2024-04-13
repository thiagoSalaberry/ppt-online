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
import { useRecoilValue, useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/gameroomState";
export default function Search() {
    const params = useSearchParams();
    const gameroomId = params.get("gameroom");
    const [code, setCode] = useState("");
    const [missing, setMissgin] = useState(false);
    const [gameroom, setGameroom] = useState<GameroomAPIResponse>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const player = useRecoilValue(playerState);
    const [recoilGameroom, setRecoilGameroom] = useRecoilState<GameroomAPIResponse>(gameroomState);
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
        .then((res:GameroomAPIResponse) => {
          setLoading(false);
          if(!res) {
            setError(true)
          } else {
            setError(false);
            setGameroom(res);
            setRecoilGameroom(res);
          }
        })
        .catch(()=>{
          setError(true)
        })
        .finally(()=>{
          setLoading(false)
        });
    }, [gameroomId, params]);
  const isOwner = gameroom?.players.host.id == player.id,
        isGuest = gameroom?.players.guest.id == player.id,
        isFull = gameroom?.players.guest.id !== "",
        letIn = isOwner || isGuest || !isFull;
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
              gameroom && <GameroomCard full={letIn} players={gameroom.players} gameroomId={String(gameroom.shortRoomId)} requester={{id: player.id!, name: player.name}}/>
            )}
            <Button type="button" color="back" onClick={()=>{Router.push("/search")}}>Volver</Button>
          </>
        )}
      </section>
    </main>
  )
}
