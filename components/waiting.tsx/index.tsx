import styles from "./waiting.module.css";
export function WaitingComp(props:WaitingProps) {
    const signal:JSX.Element = (
        <div className={styles["lines-container"]}>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
        </div>
    );
    const dots:JSX.Element = (
        <div className={styles["dots-container"]}>
            <div className={`${styles["dot"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["dot"]} ${props.connected ? styles["connected"] : ""}`}></div>
            <div className={`${styles["dot"]} ${props.connected ? styles["connected"] : ""}`}></div>
        </div>
    );
    if(props.type == "lines") return signal;
    if(props.type == "dots") return dots;
    // return (
    //     <div className={styles["lines-container"]}>
    //         <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
    //         <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
    //         <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
    //         <div className={`${styles["line"]} ${props.connected ? styles["connected"] : ""}`}></div>
    //     </div>
    // )
}