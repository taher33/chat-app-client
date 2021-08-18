import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface State {
  value: {
    name: string;
    room: string;
  };
  setValue: Dispatch<SetStateAction<{ name: string; room: string }>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
export const AppContext = createContext<State>({} as State);

export function useAppContext() {
  return useContext(AppContext);
}
