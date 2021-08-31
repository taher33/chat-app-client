import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface State {
  user:
    | {
        name: string;
        email: string;
        id: string;
      }
    | undefined;
  setUser: Dispatch<
    SetStateAction<{ name: string; email: string; id: string } | undefined>
  >;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}
export const AppContext = createContext<State>({} as State);

export function useAppContext() {
  return useContext(AppContext);
}
