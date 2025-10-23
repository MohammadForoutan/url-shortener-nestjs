import z from 'zod';

export const isValidHttpUrl = (url: string): boolean => {
  return z.url({ protocol: /^https/i }).safeParse(url).success;
};
