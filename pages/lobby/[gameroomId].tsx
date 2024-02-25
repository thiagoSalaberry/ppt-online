import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./lobby.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { useParams } from "next/navigation";
import { WaitingComp } from "@/components/waiting.tsx";
export default function Lobby() {
  const params = useParams();
  const gameRoomId = params?.gameroomId;
  const [host, setHost] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: true, ready: false, name: "Thiago", wins: 1});
  const [guest, setGuest] = useState<{connected: boolean, ready:boolean, name:string, wins:number}>({connected: true, ready: false, name: "Samay", wins: 3});
  if(host.ready && guest.ready) {
    Router.push(`/in-game/${gameRoomId}`);
  }
  return (
    <main className={styles["lobby-page"]}>
        <header className={styles["lobby-header"]}>
            <div className={styles["lobby-players"]}>
                <span className={styles["player"]}>{host.connected ? (<><WaitingComp type="lines" connected={host.connected}/><TextComp tag="p" weight="bold" color="#2b2b2b">{host.name}: {host.wins.toString()}</TextComp></>) : (<><WaitingComp type="lines" connected={host.connected}/><TextComp tag="p" weight="bold" color="#2b2b2b">{host.name}: {host.wins.toString()}</TextComp></>)}</span>
                <span className={styles["player"]}>{guest.connected ? (<><WaitingComp type="lines" connected={guest.connected}/><TextComp tag="p" weight="bold" color="#2b2b2b">{guest.name}: {guest.wins.toString()}</TextComp></>) : (<><WaitingComp type="lines" connected={guest.connected}/><TextComp tag="p" weight="bold" color="#2b2b2b">Guest: 0</TextComp></>)}</span>
            </div>
            <div className={styles["lobby-info"]}>
                <TextComp tag="p" weight="700" color="#2b2b2b">SALA</TextComp>
                <TextComp tag="p" color="#2b2b2b">{gameRoomId ? gameRoomId : ""}</TextComp>
            </div>
        </header>
        <section className={styles["lobby-content"]}>
          {host.connected && guest.connected && !host.ready ? (
            <>
              <TextComp tag="p" align="center">¡Presioná: <br></br><span className={styles["bold"]}>PIEDRA</span>, <span className={styles["bold"]}>PAPEL</span> ó <span className={styles["bold"]}>TIJERA</span><br></br> antes de que pasen 3 segundos!</TextComp>
              <Button onClick={()=>{setHost({...host, ready: true}); setTimeout(()=>{setGuest({...guest, ready:true})},3000)}} color="black">¡Jugar!</Button>
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
        </section>
        <footer className={styles["footer"]}>
            <Move size="small" move="piedra" selected={null}/>
            <Move size="small" move="papel" selected={null}/>
            <Move size="small" move="tijera" selected={null}/>
      </footer>
    </main>
  )
}
