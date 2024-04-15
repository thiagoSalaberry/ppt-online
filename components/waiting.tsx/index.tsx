import styles from "./waiting.module.css";
export function WaitingComp(props:WaitingProps) {
    const signal:JSX.Element = (
        <span className={styles["lines-container"]}>
            <span className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></span>
            <span className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></span>
            <span className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></span>
            <span className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></span>
        </span>
    );
    const dots:JSX.Element = (
        <span className={styles["dots-container"]}>
            <span className={`${styles["dot"]} ${props.color ? styles["white"] : ""}`}></span>
            <span className={`${styles["dot"]} ${props.color ? styles["white"] : ""}`}></span>
            <span className={`${styles["dot"]} ${props.color ? styles["white"] : ""}`}></span>
        </span>
    );
    if(props.type == "lines") return signal;
    if(props.type == "dots") return dots;
}