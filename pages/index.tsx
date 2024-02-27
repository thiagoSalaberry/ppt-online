import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./home.module.css";
import { Header } from "@/components/header";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { getPlayer, createGameroom } from "@/lib/api-calls";
import { getRtdb } from "@/lib/api-calls";
export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerAPIResponse>({playerData: {name: "", pin: 0}, playerId: ""});
  const [currentStep, setCurrentStep] = useState<number>(0);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);
  const handleNameSubmit = async (e:any) => {
    e.preventDefault();
    if(nameInputRef.current && pinInputRef.current) {
      const player = await getPlayer(nameInputRef.current.value, parseInt(pinInputRef.current.value));
      if(player) {
        localStorage.setItem("accessId", player.playerId);
        setCurrentPlayer(player);
        setTimeout(()=>{
          setCurrentStep(1);
        }, 100)
      };
    }
  };
  const handleClick = async (option: "newGame" | "joinRoom") => {
    if(option == "newGame") {
      // Acá va el código necesario para crear la sala
      const newGameroom = await createGameroom(currentPlayer.playerData.name, currentPlayer.playerData.pin);
      Router.push(`/lobby/${newGameroom?.shortRoomId}`);
    };
    if(option == "joinRoom") {
      // console.log("Join Room")
      Router.push(`/search`);
    };
  };
  useEffect(()=>{
    getRtdb("7afc00ad-574a-4164-aebc-d04dead6ae2e")
      .then((res) => console.log(res));
  }, [])
  const stepHeaders: JSX.Element[] = [
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Ingresá tus datos para jugar</TextComp>,
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">¡Hola {currentPlayer.playerData.name}!<br></br>Elegí una opción</TextComp>,
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
