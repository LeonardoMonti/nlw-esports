interface GameBannereProps {
  title: string;
  bannerUrl: string;
  adsCount: number;
}

export function GameBanner(props: GameBannereProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden">
    <img src={props.bannerUrl} alt={`image de ${props.title}`} />

    <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
      <strong className="fond-bold text-white block">{props.title}</strong>
      <span className="text-zinc-300 text-sm block">{props.adsCount} anúncio(s)</span>
    </div>
  </a>
  )
}