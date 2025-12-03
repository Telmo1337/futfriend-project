import {config} from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

const parseAllowedOrigins = (value = '') => {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      if (entry.startsWith('/') && entry.endsWith('/')) {
        return new RegExp(entry.slice(1, -1));
      }
      return entry;
    });
};



export const { PORT, NODE_ENV } = process.env;
export const ALLOWED_ORIGINS = parseAllowedOrigins(process.env.ALLOWED_ORIGINS);



export { parseAllowedOrigins };