import { Fragment, useEffect, useState } from 'react';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import axios from 'axios';

import "keen-slider/keen-slider.min.css";
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react";
import './styles/main.css';

import logoImg from './assets/logo-nlw-esports.svg';
import { CaretLeft, CaretRight, CircleNotch } from 'phosphor-react';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      slider.update()
    })
  })
  const config = { childList: true }

  slider.on("created", () => {
    observer.observe(slider.container, config)
  })
  slider.on("destroyed", () => {
    observer.disconnect()
  })
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    dragSpeed: 3,
    slides: {
      perView: 2,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 325px)": {
        dragSpeed: 1,
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width: 400px)": {
        dragSpeed: 2,
        slides: {
          perView: 2,
          spacing: 18,
        },
      },
      "(min-width: 640px)": {
        slides: {
          perView: 3,
          spacing: 16,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 4,
          spacing: 18,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 5,
          spacing: 20,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 6,
          spacing: 24,
        },
      },
    },
  }, [MutationPlugin])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data))
  },[])
  
  return (
    <div className="mx-auto my-10 flex max-w-[1344px] flex-col items-center px-4 sm:my-14 md:my-16 xl:my-20">
      <img src={logoImg} alt="" />
      
      <h1 className="mt-10 text-3xl font-black text-white sm:mt-14 md:mt-16 md:text-4xl lg:text-5xl xl:mt-20 xl:text-6xl">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      {games.length !== 0 ? (
          <Fragment>
            <div className="mt-16 flex w-full items-center justify-between gap-6">
              <button
                type="button"
                className="aspect-square w-6 text-zinc-400 hover:text-zinc-500 sm:w-8 md:w-10 lg:w-12"
                onClick={() => {
                  instanceRef.current?.prev();
                }}
              >
                <CaretLeft
                  width="100%"
                  height="100%"
                  className="transition-colors"
                />
              </button>
  
              <div className="w-full max-w-[1200px] overflow-hidden">
                <div ref={sliderRef} className="keen-slider">
                {games.map((game) => (
                  <GameBanner
                    key={game.id}
                    title={game.title}
                    bannerUrl={game.bannerUrl}
                    adsCount={game._count.ads}
                  />
                ))}
                </div>
              </div>
  
              <button
                type="button"
                className="aspect-square w-6 text-zinc-400 hover:text-zinc-500 sm:w-8 md:w-10 lg:w-12"
                onClick={() => {
                  instanceRef.current?.next();
                }}
              >
                <CaretRight
                  width="100%"
                  height="100%"
                  className="transition-colors"
                />
              </button>
            </div>

            <CreateAdBanner />
              
          </Fragment>
        ) : (
          <div className="mt-16 flex justify-center" aria-busy="true">
            <CircleNotch
              size={48}
              className="text-violet-500 motion-safe:animate-spin"
            />
          </div>
        )
      }
    </div>
  )

}

export default App
