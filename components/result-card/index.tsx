import styles from "./result-card.module.css";
import { TextComp } from "@/ui/texts";
import { DoorOpenIcon } from "@/ui/icons/door-open";
import { DoorClosedIcon } from "@/ui/icons/door-closed";
import Router from "next/router";
export function ResultCard(props:ResultCardProps) {
    return (
        <div className={styles["result-card"]}>
            <div className={styles["img-container"]}>
                <img src={`/${props.img}.png`} alt="result.png" className={styles["img"]}/>
            </div>
            <div className={`${styles["result-label-container"]} ${props.img == "win" ? styles["win"] : styles["loss"]}`}>
                <p className={styles["result-label"]}>{props.img == "win" ? "¡GANASTE!" : "!PERDISTE!"}</p>
            </div>
        </div>
    )
}