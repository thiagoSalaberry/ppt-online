import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./home.module.css";
import React, { useRef, useState } from "react";
import Router from "next/router";
export default function Home() {
  const [player, setPlayer] =  useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const handleNameSubmit = (e:any) => {
    e.preventDefault();
    if(nameInputRef.current) {
      setPlayer(nameInputRef.current.value);
      setTimeout(()=>{
        setCurrentStep(1);
      }, 100)
    };
  };
  const handleCodeSubmit = (e:any) => {
    e.preventDefault();
    if(codeInputRef.current) {
      Router.push(`/lobby/${codeInputRef.current.value}`);
    };
  };
  const handleClick = (option: "newGame" | "joinRoom") => {
    if(option == "newGame") {
      // Acá va el código necesario para crear la sala
      Router.push(`/lobby/${123456}`);
    };
    if(option == "joinRoom") {
      // console.log("Join Room")
      setCurrentStep(2);
    };
  }
  const stepHeaders: JSX.Element[] = [
    <TextComp tag="label" size="28px" weight="500" align="center" color="#333">Ingresá tu nombre para jugar</TextComp>,
    <TextComp tag="label" size="28px" weight="500" align="center" color="#333">Elegí una opción</TextComp>,
  ]
  const steps: JSX.Element[] = [
    (
      <form onSubmit={handleNameSubmit} className={styles["name-form"]}>
        <TextField compRef={nameInputRef} type="text" name="name" label="Nombre" required={true}/>
        <Button color="orange">Continuar</Button>
      </form>
    ),
    (
      <div className={styles["step"]}>
        <Button color="orange" onClick={()=>handleClick("newGame")}>Nuevo juego</Button>
        <Button color="orange" onClick={()=>handleClick("joinRoom")}>Ingresar a una sala</Button>
      </div>
    ),
    (
      <form onSubmit={handleCodeSubmit} className={styles["code-form"]}>
        <TextField compRef={codeInputRef} type="number" name="code" label="Código" required={true}/>
        <Button color="orange">Ingresar a la sala</Button>
      </form>
    ),
  ];
  return (
    <main className={styles["home-page"]}>
      <TextComp tag="h1" size="80px" weight="bold" color="#F17A3E" height="1" align="left">Piedra Papel ó Tijera</TextComp>
      <section className={styles["steps-container"]}>
        {stepHeaders[currentStep]}
        {steps[currentStep]}
      </section>
      <footer className={styles["footer"]}>
        <Move move="piedra" selected={null}/>
        <Move move="papel" selected={null}/>
        <Move move="tijera" selected={null}/>
      </footer>
    </main>
  )
}
