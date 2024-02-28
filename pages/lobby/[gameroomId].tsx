import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./lobby.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { WaitingComp } from "@/components/waiting.tsx";
import { usePlayer, joinRoom, searchGameroom, setReady } from "@/lib/api-calls";
import { useRoom } from "@/lib/hooks";
import { LobbyContent } from "./lobby-content";
export default function Lobby() {
  const params = useParams();
  const gameRoomId = params?.gameroomId!;
  const [loading, setLoading] = useState<boolean>(true);
  const [gameroom, setGameroom] = useState<GameroomData>();
  const [player, setPlayer] = useState<PlayerAPIResponse>();
  const [pageContent, setPageContent] = useState<number>(0);
  const room = useRoom(String(gameRoomId));
  useEffect(()=>{
    usePlayer().then((p:PlayerAPIResponse) => setPlayer(p));
  }, []);
  useEffect(()=>{
    if(!gameRoomId) return;
    searchGameroom(Number(gameRoomId))
      .then((g:GameroomData) => {
        setGameroom(g);
        setPageContent(2)
      })
      .catch(()=>{setPageContent(0)})
      .finally(()=>setLoading(false));
  }, [gameRoomId]);
  useEffect(()=>{
    if(player && gameroom) {
      joinRoom(Number(gameRoomId), player?.playerData.name, player?.playerData.pin)
        .then(() => {
          setLoading(false);
          setPageContent(2)
        })
        .catch(() => {
          setLoading(false);
          setPageContent(1)
        })
    }
  }, [player]);
  return (
    <main className={styles["lobby-page"]}>
        {loading ? <CircularProgress color="inherit"/> : <LobbyContent gameroom={gameroom!} gameroomId={String(gameRoomId)} index={pageContent} player={player!} room={room}/>}
    </main>
  )
}