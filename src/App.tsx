import React, { useEffect, useRef, useState } from "react";
import {
  Application,
  Container,
  Sprite,
  Texture,
  Graphics,
  Loader,
  Spritesheet,
  AnimatedSprite,
} from "pixi.js";
import bunnyImg from "./assets/bunny.png";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const app = new Application({
      width: 640,
      height: 160,
      antialias: true,
      backgroundColor: 0x002fa7,
    });
    // Bunny
    const bunny = Sprite.from("http://localhost:3000/src/assets/bunny.png");
    bunny.anchor.set(0.5);
    app.stage.addChild(bunny);
    app.ticker.add((delta) => {
      bunny.interactive = true;
      bunny.x = 300;
      bunny.y = 120;
      // bunny.rotation += 0.1 * delta;
      // bunny.x += 1 * delta;
      // bunny.y += 1 * delta;
      // if (bunny.x > 640 && bunny.y > 640) {
      //   bunny.x = 0;
      //   bunny.y = 0;
      // }
    });
    bunny.scale.set(2);
    bunny.on("click", () => {
      console.log("bunny: 你点到我啦!");
    });
    // Finn
    app.loader
      .add("http://localhost:3000/src/assets/FinnSprite.json")
      .load(() => {
        const frames = [];
        for (let i = 0; i < 4; i++) {
          const val = i < 10 ? `0${i}` : i;
          frames.push(Texture.from(`Finn00${val}.png`));
        }
        const finn = new AnimatedSprite(frames);
        finn.animationSpeed = 0.1;
        finn.play();
        finn.y = 76;
        finn.interactive = true;
        finn.scale.set(3);
        app.stage.addChild(finn);
        document.addEventListener("keydown", ({ key }) => {
          console.log('key', key);
          if (key === "ArrowRight") finn.x += 24;
          if (key === "ArrowLeft") finn.x -= 24;
        });
      });
    appRef.current?.appendChild(app.view);
  }, []);
  return <div ref={appRef}></div>;
}

export default App;
