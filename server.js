const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
import prisma from '@/db';

const app = express();
const port = 3000;

const refreshToken = async (runner) => {
  try {
    const response = await axios.post('https://www.strava.com/oauth/token', null, {
      params: {
        client_id: '125102',
        client_secret: 'baf7f62b9ccc8636309d04404f9673f3c8bc9f95',
        grant_type: 'refresh_token',
        refresh_token: runner.refresh_token,
      },
    });

    if (response.status === 200) {
      const { access_token, refresh_token, expires_at } = response.data;
      console.log(`New access token for runner ${runner.id}: ${access_token}`);

      await prisma.runner.update({
        where: { id: runner.id },
        data: {
          accessToken:access_token,
          refreshToken:refresh_token,
          expires_at,
        },
      });

      return access_token;
    }
  } catch (error) {
    console.error(`Error refreshing token for runner ${runner.id}:`, error.response ? error.response.data : error.message);
  }
};

const fetchAthleteActivities = async (accessToken, before, after, page) => {
  try {
    const response = await axios.get(`https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=100`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });

    if (response.status === 200) {
      console.log('Fetched athlete activities:', response.data);
    }
  } catch (error) {
    console.error('Error fetching athlete activities:', error.response ? error.response.data : error.message);
  }
};

cron.schedule('*/15 * * * *', async () => {
  console.log('Running scheduled task...');
  
  const runners = await prisma.runner.findMany();
  const now = Math.floor(Date.now() / 1000);

  for (const runner of runners) {
    if (runner.expires_at <= now) {
      const newAccessToken = await refreshToken(runner);
      if (newAccessToken) {
        const before = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime() / 1000
        let after = (Math.trunc(new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000)) - 60 
        const page = 1;

        await fetchAthleteActivities(newAccessToken, before, after, page);
      }
    } else {
      const before = Math.floor(Date.now() / 1000);
      const after = before - (7 * 24 * 60 * 60);
      const page = 1;

      await fetchAthleteActivities(runner.access_token, before, after, page);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
