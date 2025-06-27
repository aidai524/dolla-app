import { Howl } from "howler";

declare global {
  interface Window {
    howl: {
      switcher: Howl;
      hints: Howl;
    };
    drawsUpdateTimer: NodeJS.Timeout;
  }
}

export {};
