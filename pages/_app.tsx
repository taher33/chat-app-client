import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../state";
import { useState } from "react";
import { serverEndPoint } from "../constants";
import { io } from "socket.io-client";

const socket = io(serverEndPoint);

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState({ name: "", room: "" });
  return (
    <AppContext.Provider value={{ value, setValue, socket }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
