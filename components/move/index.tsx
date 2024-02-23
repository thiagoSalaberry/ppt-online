import styles from "./move.module.css";
export function Move(props:MoveProps) {
    const handleSelect = (move:"piedra" | "papel" | "tijera") => {
        if(props.onClick) props.onClick(move);
    };
    return <img src={`/${props.move}.png`} alt="move.png" className={!props.selected ? `${styles["move"]} ${styles[props.size]}` : props.selected && props.selected == props.move ? `${styles["selected"]} ${styles[props.size]}` : `${styles["not-selected"]} ${styles[props.size]}`} onClick={!props.selected ? ()=>handleSelect(props.move) : ()=>{}}/>
}