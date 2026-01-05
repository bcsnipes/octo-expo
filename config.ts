// API Configuration
const ENV = {
  dev: {
    apiUrl: 'http://localhost:3010/api',
  },
  prod: {
    apiUrl: 'https://your-production-url.vercel.app/api',
  },
};

// Change this to 'prod' when testing production
const environment = 'dev';

export const API_URL = ENV[environment].apiUrl;
