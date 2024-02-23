import styles from "./page.module.css";
import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { useState } from "react";
import { WaitingComp } from "@/components/waiting.tsx";
export default function UIPage() {
    const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
    return (
      <main className={styles["ui-page"]}>
        <section className={styles["components-section"]}>
            <Button>Botón azul</Button>
            <Button color="red">Botón rojo</Button>
            <Button color="back">Volver</Button>
            <div className={styles["moves-container"]}>
              <Move move="piedra" selected={selected} onClick={()=>{setSelected("piedra")}}/>
              <Move move="papel" selected={selected} onClick={()=>setSelected("papel")}/>
              <Move move="tijera" selected={selected} onClick={()=>setSelected("tijera")}/>
            </div>
            <WaitingComp connected={false}/>
            <WaitingComp connected={true}/>
        </section>
      </main>
    )
  }
  