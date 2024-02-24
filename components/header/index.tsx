import styles from "./header.module.css";
import { TextComp } from "@/ui/texts";
import { Move } from "../move";
export function Header() {
    return (
        <header className={styles["home-header"]}>
        <div className={styles["header-title"]}>
          <Move className={"izq"} move="piedra" size="small"></Move>
          <TextComp tag="p" size="63px" weight="900">PIEDRA</TextComp>
          <Move className={"der"} move="piedra" size="small"></Move>
        </div>
        <div className={styles["header-title"]}>
          <Move className={"izq"} move="papel" size="small"></Move>
          <TextComp tag="p" size="63px" weight="900">PAPEL</TextComp>
          <Move className={"der"} move="papel" size="small"></Move>
        </div>
        <div className={styles["header-title"]}>
          <Move className={"izq"} move="tijera" size="small"></Move>
          <TextComp tag="p" size="63px" weight="900">TIJERA</TextComp>
          <Move className={"der"} move="tijera" size="small"></Move>
        </div>
      </header>
    )
}