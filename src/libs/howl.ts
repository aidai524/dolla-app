import { Howl } from "howler";

const flipSound = new Howl({
  src: ["/btc/flip.mp3"],
  volume: 0.5,
  loop: false
});

window.howl = {
  flip: flipSound
};
