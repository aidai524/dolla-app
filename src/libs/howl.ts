import { Howl } from "howler";

const switcherSound = new Howl({
  src: ["/1-dollar-win/switcher-pull.mp3"],
  volume: 0.5,
  loop: false
});

const hintsSound = new Howl({
  src: ["/1-dollar-win/new-hints.mp3"],
  volume: 0.5,
  loop: false
});

window.howl = {
  switcher: switcherSound,
  hints: hintsSound
};
