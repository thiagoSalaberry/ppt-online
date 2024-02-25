import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./home.module.css";
import { Header } from "@/components/header";
import React, { useRef, useState } from "react";
import Router from "next/router";
import { getPlayer } from "@/lib/api-calls";
export default function Home() {
  const [currentPlayer, setCurrentPlayer] =  useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const handleNameSubmit = async (e:any) => {
    e.preventDefault();
    if(nameInputRef.current && pinInputRef.current) {
      const player = await getPlayer(nameInputRef.current.value, parseInt(pinInputRef.current.value));
      console.log(player?.playerData?.name)
      // if(player) {
      //   console.log(player.playerData)
      //   // setPlayer(player.playerData?.name);
      //   // setTimeout(()=>{
      //   //   setCurrentStep(1);
      //   // }, 100)
      // };
    }
  };
  const handleCodeSubmit = (e:any) => {
    e.preventDefault();
    if(codeInputRef.current) {
      Router.push(`/search?gameroom=${codeInputRef.current.value}`);
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
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Ingresá tus datos para jugar</TextComp>,
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">¡Hola {currentPlayer}!<br></br>Elegí una opción</TextComp>,
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Ingresá el código de la sala</TextComp>,
  ]
  const steps: JSX.Element[] = [
    (
      <form onSubmit={handleNameSubmit} className={styles["name-form"]}>
        <TextField compRef={nameInputRef} type="text" name="name" label="NOMBRE" required={true}/>
        <TextField compRef={pinInputRef} type="number" name="pin" label="PIN" required={true}/>
        <Button type="submit" color="black">Continuar</Button>
      </form>
    ),
    (
      <div className={styles["step"]}>
        <Button type="button" color="black" onClick={()=>handleClick("newGame")}>Nuevo juego</Button>
        <Button type="button" color="black" onClick={()=>handleClick("joinRoom")}>Ingresar a una sala</Button>
      </div>
    ),
    (
      <form onSubmit={handleCodeSubmit} className={styles["code-form"]}>
        <TextField compRef={codeInputRef} type="number" name="code" label="Código" required={true}/>
        <Button type="submit" color="black">Buscar</Button>
        <Button type="button" color="back" onClick={()=>setCurrentStep(prev => prev - 1)}>Volver</Button>
      </form>
    ),
  ];
  return (
    <main className={styles["home-page"]}>
      <Header/>
      <section className={styles["header-section"]}>
        {stepHeaders[currentStep]}
        {steps[currentStep]}
      </section>
    </main>
  )
}
