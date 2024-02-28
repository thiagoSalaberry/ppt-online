import { Button } from "@/ui/buttons";
import styles from "./hooks.module.css";
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useRoom } from "@/lib/hooks";
export default function Home() {
    const {apiData, loading,  error} = useRoom("129935");
  return (
    <main className={styles["hooks-page"]}>
        Hooks
    </main>
  )
}
