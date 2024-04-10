import styles from "./lobby.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CircularProgress } from "@mui/material";
import { joinRoom, searchGameroom } from "@/lib/api-calls";
import { useRoom } from "@/lib/hooks";
import LobbyContent from "./lobby-content";
import { useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { gameroomState } from "@/atoms/currentGameState";
export default function Lobby() {
  const params = useParams();
  const gameRoomId = params?.gameroomId!;
  const [loading, setLoading] = useState<boolean>(true);
  const [gameroom, setGameroom] = useRecoilState(gameroomState);
  const [player, setPlayer] = useRecoilState<PlayerAPIResponse>(playerState);
  const [pageContent, setPageContent] = useState<number>(0);
  const room = useRoom(String(gameRoomId));
  useEffect(()=>{
    if(player && gameroom) {
      joinRoom(Number(gameRoomId), player?.playerData.name, player?.playerData.pin)
        .then((res:string) => {
          setLoading(false);
          setPageContent(2);
        })
        .catch(() => {
          setLoading(false);
          setPageContent(1)
        })
    }
  }, [player]);
  console.log(gameroom)
  return (
    <main className={styles["lobby-page"]}>
      {loading ? <CircularProgress color="inherit"/> : <LobbyContent gameroom={gameroom!} gameroomId={String(gameRoomId)} index={pageContent} player={player!} room={room}/>}
    </main>
  )
}