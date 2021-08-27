import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../state";
import { useState } from "react";
import { serverEndPoint } from "../constants";
import { io } from "socket.io-client";

const socket = io(serverEndPoint);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({} as any);
  return (
    <AppContext.Provider value={{ user, setUser, socket }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
