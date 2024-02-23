import styles from "./texts.module.css";

export function TextComp(props:TextProps) {
    return (<props.tag style={{fontWeight: props.weight, fontSize: props.size || "24px", color: props.color, lineHeight: props.height, textAlign: props.align}}>{props.children}</props.tag>)
}