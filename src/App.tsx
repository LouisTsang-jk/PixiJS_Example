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
import TWEEN from "@tweenjs/tween.js";

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  function animate(time: number) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }

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
    });
    bunny.scale.set(2);
    bunny.on("click", () => {
      console.log("bunny: 你点到我啦!");
    });
    app.ticker.add(() => {
      // bunny.rotation += 0.1;
    })
    // Finn
    app.loader
      .add("http://localhost:3000/src/assets/FinnSprite.json")
      .load(() => {
        let isRunning = false;
        const frames = [];
        const runFames = [];
        for (let i = 0; i < 9; i++) {
          const val = i < 10 ? `0${i}` : i;
          frames.push(Texture.from(`Finn00${val}.png`));
        }
        for (let i = 9; i < 14; i++) {
          const val = i < 10 ? `0${i}` : i;
          runFames.push(Texture.from(`Finn00${val}.png`));
        }
        const finn = new AnimatedSprite(frames);
        const finn_run = new AnimatedSprite(runFames)
        finn.animationSpeed = 0.1;
        finn.play();
        finn.y = 76;
        finn.interactive = true;
        finn.scale.set(3);
        app.stage.addChild(finn);
        document.addEventListener("keydown", ({ key }) => {
          const coords = { x: finn.x };
          let offset = 0;
          if (key === "ArrowRight") offset = finn.x + 32;
          if (key === "ArrowLeft") offset = finn.x - 32;
          new TWEEN.Tween(coords)
            .to({ x: offset }, 100)
            .onUpdate(() => {
              isRunning = offset !== coords.x;
              finn.x = coords.x;
            })
            .start();
          requestAnimationFrame(animate);
        });
      });
    appRef.current?.appendChild(app.view);
  }, []);
  return <div ref={appRef}></div>;
}

export default App;
