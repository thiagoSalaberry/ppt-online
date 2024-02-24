import { Button } from "@/ui/buttons";
import { Header } from "@/components/header";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./search.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { GameroomCard } from "@/components/gameroom-card";
export default function Search() {
    const params = useSearchParams();
    const gameroomId = params.get("gameroom")!;
  return (
    <main className={styles["search-page"]}>
      <Header/>
      <div className={styles["search-section"]}>
        {true ? (
          <>
            <TextComp tag="p">Salas</TextComp>
            <GameroomCard gameroomId={gameroomId} full={false} players={{host: {name: "Thiago", id: "12321"}, guest: {name: "Samay", id: "32123"}}}/>
            <GameroomCard gameroomId={gameroomId} full={true} players={{host: {name: "Franco", id: "15987"}, guest: {name: "Samay", id: "32123"}}}/>
          </>
        ) : <TextComp tag="p">La sala que buscas no existe</TextComp>}        
      </div>
    </main>
  )
}
