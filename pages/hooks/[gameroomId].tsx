import styles from "./hooks.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useCurrentGame } from "@/lib/hooks";
import { useParams } from "next/navigation";
import LobbyHeader from "@/components/lobby-header";
import { useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { getMe } from "@/lib/api-calls";
export default function Hooks() {
  const [player, setPlayer] = useRecoilState<PlayerData>(playerState);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    if(player.id) {
      console.log("Este user viene de Recoil", player);
    } else {
      console.log("Este user viene de getMe()");
      setLoading(true)
      getMe()
      .then((data: PlayerData) => {
        setPlayer(data);
        setLoading(false);
      });
    }
  }, []);
  return (
    <main className={styles["hooks-page"]}>
      {loading ? "Cargando" : JSON.stringify(player)}
    </main>
  )
}
