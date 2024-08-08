const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
import { prisma } from "./db";

const refreshToken = async (runner_dev) => {
  try {
    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      null,
      {
        params: {
          client_id: "125102",
          client_secret: "baf7f62b9ccc8636309d04404f9673f3c8bc9f95",
          grant_type: "refresh_token",
          refresh_token: runner_dev.refresh_token,
        },
      }
    );

    if (response.status === 200) {
      const { access_token, refresh_token, expires_at } = response.data;
      console.log(
        `New access token for runner_dev ${runner_dev.id}: ${access_token}`
      );

      await prisma.runner_dev.update({
        where: { id: runner_dev.id },
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          expires_at,
        },
      });

      return access_token;
    }
  } catch (error) {
    console.error(
      `Error refreshing token for runner_dev ${runner_dev.id}:`,
      error.response ? error.response.data : error.message
    );
  }
};

const fetchAthleteActivities = async (
  runner_dev,
  accessToken,
  before,
  after,
  page
) => {
  try {
    const response = await axios.get(
      `https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=200`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (response.status === 200) {
      console.log("Fetched athlete activities:", response.data);

      let totalDistance = 0;
      let activities = response.data;
      activities.forEach((activity) => {
        if (
          activity.type === "Run" ||
          activity.type === "Walk" ||
          activity.type === "Hike"
        ) {
          totalDistance += activity.distance;
        }
      });

      prisma.runner_dev.update({
        where: { id: runner_dev.id },
        data: {
          totalDistance,
        },
      });
    }
  } catch (error) {
    console.error(
      "Error fetching athlete activities:",
      error.response ? error.response.data : error.message
    );
  }
};

cron.schedule("* * * * *", async () => {
  console.log("Running scheduled task...");

  const runners = await prisma.runner_dev.findMany();
  const now = Math.floor(Date.now() / 1000);

  const before =
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime() / 1000;
  const after =
    Math.trunc(
      new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000
    ) - 60;
  const page = 1;

  for (const runner_dev of runners) {
    if (runner_dev.expires_at <= now) {
      const newAccessToken = await refreshToken(runner_dev);
      if (newAccessToken) {
        await fetchAthleteActivities(
          runner_dev,
          newAccessToken,
          before,
          after,
          page
        );
      }
    } else {
      await fetchAthleteActivities(
        runner_dev,
        runner_dev.access_token,
        before,
        after,
        page
      );
    }
  }
});
