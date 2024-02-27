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
import { searchGameroom } from "@/lib/api-calls";
import { usePlayer } from "@/lib/api-calls";
import { joinRoom } from "@/lib/api-calls";
export default function Lobby() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [loading, setLoading] = useState<boolean>(true);
  const [gameroom, setGameroom] = useState<GameroomData>();
  const [pageContent, setPageContent] = useState<number>(0);
  useEffect(()=> {
    if(!gameRoomId) return;
    searchGameroom(Number(gameRoomId)).then((res) => {
      setGameroom(res);
      usePlayer().then((p:PlayerAPIResponse) => {
        joinRoom(Number(gameRoomId), p.playerData.name, p.playerData.pin)
        .then(()=>setPageContent(2))
        .catch(()=>setPageContent(1));
      })
      setLoading(false);
      setPageContent(2);
    }).catch(()=>{
      setLoading(false);
      setPageContent(0);
    });
  }, [gameRoomId]);
  const contentList:JSX.Element[] = [
    (
      <div className={styles["no-gameroom"]}>
        <TextComp tag="p" weight="700" color="#2b2b2b">La sala {gameRoomId} no existe.</TextComp>
        <Button type="button" color="black" onClick={()=>Router.push("/search")}>Buscar sala</Button>
      </div>
    ),
    (
      <div className={styles["unauhtorized"]}>
        <TextComp tag="p" weight="700" color="#2b2b2b">No estás autorizado a ingresar a esta sala.</TextComp>
        <Button type="button" color="black" onClick={()=>Router.push("/search")}>Buscar sala</Button>
      </div>
    ),
    (
      <>
        <header className={styles["lobby-header"]}>
          <div className={styles["lobby-players"]}>
              <span className={styles["player"]}>{gameroom?.players.host ? (<><WaitingComp type="lines" connected={true}/><TextComp tag="p" weight="bold" color="#2b2b2b">{gameroom.players.host.name}: {gameroom.history.hostWins}</TextComp></>) : (<><WaitingComp type="lines" connected={false}/><TextComp tag="p" weight="bold" color="#2b2b2b">Host: 0</TextComp></>)}</span>
              <span className={styles["player"]}>{gameroom?.players.guest ? (<><WaitingComp type="lines" connected={false}/><TextComp tag="p" weight="bold" color="#2b2b2b">{gameroom.players.guest.name}: {gameroom.history.guestWins}</TextComp></>) : (<><WaitingComp type="lines" connected={false}/><TextComp tag="p" weight="bold" color="#2b2b2b">Guest: 0</TextComp></>)}</span>
          </div>
          <div className={styles["lobby-info"]}>
              <TextComp tag="p" weight="700" color="#2b2b2b">SALA</TextComp>
              <TextComp tag="p" color="#2b2b2b">{gameRoomId ? gameRoomId : ""}</TextComp>
          </div>
        </header>
        {/* <section className={styles["lobby-content"]}>
          {host.connected && guest.connected && !host.ready ? (
            <>
              <TextComp tag="p" align="center">¡Presioná: <br/><span className={styles["bold"]}>PIEDRA</span>, <span className={styles["bold"]}>PAPEL</span> ó <span className={styles["bold"]}>TIJERA</span><br></br> antes de que pasen 3 segundos!</TextComp>
              <Button type="button" onClick={()=>{setHost({...host, ready: true}); setTimeout(()=>{setGuest({...guest, ready:true})},3000)}} color="black">¡Jugar!</Button>
            </>
          ) : host.connected && host.ready ? (
            <>
              <TextComp tag="p" size="28px" align="center">Esperando a que <span style={{fontWeight: "bold"}}>{guest.name}</span> presione ¡Jugar!<span className={styles["inline-block"]}><WaitingComp type="dots" connected={false}></WaitingComp></span></TextComp>
            </>
          ) : (
            <>
              <TextComp tag="p">Compartí el código:</TextComp>
              <TextComp tag="p" weight="bold" size="28px">{gameRoomId ? gameRoomId : ""}</TextComp>
              <TextComp tag="p">Con tu contrincante</TextComp>
            </>
          )}
        </section> */}
        <footer className={styles["footer"]}>
            <Move size="small" move="piedra" selected={null}/>
            <Move size="small" move="papel" selected={null}/>
            <Move size="small" move="tijera" selected={null}/>
        </footer>
      </>
    ),
  ];
  return (
    <main className={styles["lobby-page"]}>
        {loading ? <CircularProgress color="inherit"/> : contentList[pageContent]}
    </main>
  )
}
