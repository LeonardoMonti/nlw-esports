import express from "express";

import { prisma } from "./prisma";

import { convertMinutesToHourString } from "./utils/convertHourStringToMinutes";
import { convertHourStringToMinutes } from "./utils/convertMinutesToHourString";
import { createAdValidationSchema } from "./validation/create-ad";

import { ValidationError } from "yup";

export const routes = express.Router();

routes.get("/games", async (_request, response, next) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });

    return response.json({
      ok: true,
      games,
    });
  } catch (error) {
    next(error);
  }
});

// list ads by game
routes.get("/games/:id/ads", async (request, response, next) => {
  try {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
      where: {
        gameId,
      },
      select: {
        id: true,
        gameId: true,
        name: true,
        yearsPlaying: true,
        discord: false,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedAds = ads.map(ad => ({
      ...ad,
      weekDays: JSON.parse(ad.weekDays) as number[],
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }));

    return response.json({
      ok: true,
      ads: formattedAds,
    });
  } catch (error) {
    next(error);
  }
});

// create ad for game
routes.post("/games/:id/ads", async (request, response, next) => {
  try {
    const gameId = request.params.id;

    const newAdData = await createAdValidationSchema.validate(request.body, {
      abortEarly: false,
      // strict: true,
      stripUnknown: true,
    });

    const ad = await prisma.ad.create({
      data: {
        gameId,
        ...newAdData,
        weekDays: JSON.stringify(newAdData.weekDays),
        hourStart: convertHourStringToMinutes(newAdData.hourStart),
        hourEnd: convertHourStringToMinutes(newAdData.hourEnd),
      },
    });

    return response.status(201).json({
      ok: true,
      ad: {
        ...ad,
        weekDays: newAdData.weekDays,
        hourStart: newAdData.hourStart,
        hourEnd: newAdData.hourEnd,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = error.inner.map(validationError => ({
        path: validationError.path ?? null,
        message: validationError.message,
      }));

      return response.status(400).json({
        ok: false,
        errors,
      });
    }

    next(error);
  }
});

// get discord by ad
routes.get("/ads/:id/discord", async (request, response, next) => {
  try {
    const adId = request.params.id;

    const ad = await prisma.ad.findUnique({
      where: {
        id: adId,
      },
      select: {
        discord: true,
      },
    });

    if (!ad) {
      return response.status(404).json({
        ok: false,
        message: "Ad not found",
      });
    }

    return response.json({
      ok: true,
      discord: ad.discord,
    });
  } catch (error) {
    next(error);
  }
});

// global error handler
routes.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);

    return response.status(500).json({
      ok: false,
      message: "Houston, we have a problem!",
    });
  },
);
