import styles from "./texts.module.css";

export function TextComp(props:TextProps) {
    return (<props.tag style={{fontWeight: props.weight, fontSize: props.size || "24px", color: props.color, lineHeight: props.height, textAlign: props.align, margin: 0}}>{props.children}</props.tag>)
}