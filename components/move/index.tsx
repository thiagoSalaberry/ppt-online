import styles from "./move.module.css";
export function Move(props:MoveProps) {
    const handleSelect = (move:"piedra" | "papel" | "tijera") => {
        if(props.onClick) props.onClick(move);
    };
    console.log(props.className)
    return <img src={`/${props.move}-linea-lleno.png`} alt="move.png" className={!props.selected ? `${styles["move"]} ${styles[props.size]} ${styles[props.className ? props.className : ""]}` : props.selected && props.selected == props.move ? `${styles["selected"]} ${styles[props.size]} ${styles[props.className ? props.className : ""]}` : `${styles["not-selected"]} ${styles[props.size]} ${styles[props.className ? props.className : ""]}`} onClick={!props.selected ? ()=>handleSelect(props.move) : ()=>{}}/>
}