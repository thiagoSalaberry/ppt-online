import styles from "./page.module.css";
import { Button } from "@/ui/buttons";
import { Timer } from "@/components/timer";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { useState } from "react";
import { WaitingComp } from "@/components/waiting.tsx";
export default function UIPage() {
    const [selected, setSelected] = useState<"piedra" | "papel" | "tijera" | null>(null);
    return (
      <main className={styles["ui-page"]}>
        {/* <section className={styles["components-section"]}>
            <Button type="button">Botón azul</Button>
            <Button type="button" color="red">Botón rojo</Button>
            <Button type="button" color="back">Volver</Button>
            <div className={styles["moves-container"]}>
              <Move size="big" move="piedra" selected={selected} onClick={()=>{setSelected("piedra")}}/>
              <Move size="big" move="papel" selected={selected} onClick={()=>setSelected("papel")}/>
              <Move size="big" move="tijera" selected={selected} onClick={()=>setSelected("tijera")}/>
            </div>
            <WaitingComp type="dots" connected={false}/>
            <WaitingComp type="dots" connected={true}/>
            <Timer/>
        </section> */}
      </main>
    )
  }
  