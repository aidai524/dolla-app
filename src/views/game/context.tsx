import { createContext, useState } from "react";
import useCurrentGame from "@/views/game/hooks/use-current-game";

export const HomeContext = createContext<any>({});

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preopen, setPreopen] = useState(false);
  const { currentGame } = useCurrentGame({ setOpen, setPreopen });

  return (
    <HomeContext.Provider
      value={{
        open,
        preopen,
        currentGame
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
