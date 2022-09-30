import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const games = [
  {
    title: "League of Legends",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/21779-285x380.jpg",
  },
  {
    title: "Counter-Strike: Global Offensive",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/32399_IGDB-285x380.jpg",
  },
  {
    title: "Valorant",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/516575-285x380.jpg",
  },
  {
    title: "Grand Theft Auto V",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/32982_IGDB-285x380.jpg",
  },
  {
    title: "Dota 2",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/29595-285x380.jpg",
  },
  {
    title: "World of Warcraft",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/18122-285x380.jpg",
  },
  {
    title: "Fortnite",
    bannerUrl: "https://static-cdn.jtvnw.net/ttv-boxart/33214-285x380.jpg",
  }
];

async function main() {
  for (let game of games) {
    const existingGame = await prisma.game.findFirst({
      where: {
        title: game.title,
      },
    });

    const gameAlreadyExists = !!existingGame;
    
    if(!gameAlreadyExists) {
      await prisma.game.create({
        data: game
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect()
})
