import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AppContext } from "../state";
import { useState } from "react";
import { serverEndPoint } from "../constants";
import { io, Socket } from "socket.io-client";

let socket: Socket;

if (typeof window !== "undefined") {
  socket = io(serverEndPoint, {
    auth: {
      token: localStorage.getItem("jid"),
    },
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({} as any);
  return (
    <AppContext.Provider value={{ user, setUser, socket }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
export default MyApp;
