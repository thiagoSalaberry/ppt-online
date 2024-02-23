// import { useRef } from "react";
// import styles from "./timer.module.css";
// export function Timer() {
//     let circularProgress = useRef<HTMLDivElement>(null),
//         progressValue = useRef<HTMLDivElement>(null);
    
//     let progressStartValue = 0,
//         progressEndValue = 1000,
//         seconds = 0;
    
//     let progress = setInterval(()=>{
//         progressStartValue++;
//         if(circularProgress.current) {
//             const circulo = circularProgress.current;
//             circulo.style.background = `conic-gradient(#ff7469 ${progressStartValue * 1.2}deg, #ededed 0deg)`
//         }
//         if(progressStartValue == progressEndValue) {
//             clearInterval(progress);
//         }
//     }, 10);
//     let addSeconds = setInterval(()=>{
//         seconds++
//         if(progressValue.current) {
//             progressValue.current.textContent = `${seconds}`
//         }
//         if(seconds == 3 && progressValue.current) {
//             progressValue.current.textContent = `¡YA!`
//             clearInterval(addSeconds);
//         }
//     }, 1000)
//     return (
//         <div className={styles["circular-progress"]} ref={circularProgress}>
//             <span className={styles["progress-value"]} ref={progressValue}>{progressStartValue}</span>
//         </div>
//     )
// }
import { useEffect, useRef, useState } from "react";
import styles from "./timer.module.css";
export function Timer() {
    const [progressStartValue, setProgressStartValue] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const circularProgressRef = useRef<HTMLDivElement>(null);
    const progressValueRef = useRef<HTMLSpanElement>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const secondsIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const progressEndValue = 1000;
        progressIntervalRef.current = setInterval(() => {
            setProgressStartValue(prevValue => prevValue + 1);
        }, 10);

        secondsIntervalRef.current = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
            if (secondsIntervalRef.current) clearInterval(secondsIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (progressStartValue >= 1000 && progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
    }, [progressStartValue]);

    useEffect(() => {
        if (seconds === 3 && secondsIntervalRef.current) {
            clearInterval(secondsIntervalRef.current);
            if (progressValueRef.current) {
                progressValueRef.current.textContent = `¡YA!`;
            }
        }
    }, [seconds]);

    useEffect(() => {
        if (circularProgressRef.current) {
            const circulo = circularProgressRef.current;
            circulo.style.background = `conic-gradient(#ff7469 ${progressStartValue * 1.2}deg, #ededed 0deg)`;
        }
        if (progressValueRef.current) {
            progressValueRef.current.textContent = `${seconds}`;
        }
    }, [progressStartValue, seconds]);

    return (
        <div className={styles["circular-progress"]} ref={circularProgressRef}>
            <span className={styles["progress-value"]} ref={progressValueRef}>
                {progressStartValue}
            </span>
        </div>
    )
}