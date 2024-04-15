import { Button } from "@/ui/buttons";
import { TextField } from "@/ui/text-fields";
import { Move } from "@/components/move";
import { TextComp } from "@/ui/texts";
import styles from "./home.module.css";
import { Header } from "@/components/header";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { getPlayer, createGameroom } from "@/lib/api-calls";
import { useRecoilState } from "recoil";
import { playerState } from "@/atoms/playerState";
import { getMe } from "@/lib/api-calls";
export default function Home() {
  const [player, setPlayer] = useRecoilState<PlayerData>(playerState);
  const [currentStep, setCurrentStep] = useState<number>(player?.name ? 1 : 0);
  const [form, setForm] = useState<{
    name: string;
    pin: string;
  }>({
    name: "",
    pin: ""
  });
  const [missing, setMissing] = useState<{
    name: boolean,
    pin: boolean
  }>({
    name: false,
    pin: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const handleInputChange = (fieldName: "name" | "pin", value: string):void => {
    setForm({
      ...form,
      [fieldName]: value
    });
    setMissing({
      ...missing,
      [fieldName]: false
    });
  }
  const handleOnInvalid = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    setMissing({
      ...missing,
      [input.name]: true
    })
  }
  const handleSubmit = async (e:React.FormEvent):Promise<void> => {
    e.preventDefault();
    setError(false)
    setSubmitting(true);
    const apiResponse = form.pin && await getPlayer(form.name, parseInt(form.pin));
    if(apiResponse) {
      setPlayer(apiResponse.playerData);
      localStorage.setItem("accessToken", apiResponse.playerData.id);
      setTimeout(()=>{
        setSubmitting(false);
        setCurrentStep(1);
      }, 100)
    } else {
      setError(true);
      setSubmitting(false);
    }
  }
  const handleClick = async (option: "newGame" | "joinRoom" | "back"):Promise<void> => {
    if(option == "newGame") {
      setSubmitting(true)
      const newGameroom = await createGameroom();
      if(newGameroom) {
        setSubmitting(false)
        Router.push(`/lobby/${newGameroom?.shortRoomId}`);
      }
    };
    if(option == "joinRoom") {
      Router.push(`/search`);
    };
    if(option == "back") {
      setCurrentStep(0);
    };
  };
  const stepHeaders: JSX.Element[] = [
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Ingresá tus datos para jugar</TextComp>,
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">¡Hola {player?.name}!<br></br>Elegí una opción</TextComp>,
    <TextComp tag="label" size="28px" weight="700" align="center" color="#2b2b2b">Ingresá el código de la sala</TextComp>,
  ]
  const steps: JSX.Element[] = [
    (
      <form onInvalid={handleOnInvalid} onSubmit={handleSubmit} className={styles["name-form"]}>
        <TextField label="NOMBRE DE USARIO" id="name" type="text" name="name" value={form.name} missing={missing.name} disabled={submitting} onChange={(value) => handleInputChange("name", value)} required/>
        <TextField label="PIN" id="pin" type="number" name="pin" value={form.pin} missing={missing.pin} disabled={submitting} onChange={(value) => handleInputChange("pin", value)} required/>
        {error ? <p className={styles["error__message"]}>El pin es incorrecto</p> : null}
        <Button type="submit" color="black" submitting={submitting}>Ingresar</Button>
      </form>
    ),
    (
      <div className={styles["step"]}>
        <Button type="button" color="black" onClick={()=>handleClick("newGame")}>Nuevo juego</Button>
        <Button type="button" color="black" onClick={()=>handleClick("joinRoom")}>Ingresar a una sala</Button>
        <Button type="button" color="back" onClick={()=>handleClick("back")}>Salir</Button>
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
