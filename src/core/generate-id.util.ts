import { v7 as uuidv7, version as uuidVersion, validate } from 'uuid';

export const generateId = (id?: string) => {
  // if not provided, invalid, or not v7, generate a new one
  if (!id || !validate(id) || uuidVersion(id) !== 7) return uuidv7();

  return id;
};
