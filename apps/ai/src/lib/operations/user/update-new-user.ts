import type { Config } from 'unique-names-generator';

import { NumberDictionary, uniqueNamesGenerator } from 'unique-names-generator';

import { randomElement } from '@av/utils';

import { userColors } from '#editor/lib/constants';

import { colorNames, pokemonNames } from '#/lib/const';
import { db } from '#/lib/db';

const config: Config = {
  dictionaries: [
    pokemonNames,
    colorNames,
    NumberDictionary.generate({ min: 0, max: 999 }),
  ],
  style: 'lowerCase',
  separator: '-',
};

export async function generateUniqueDisplayName(): Promise<string> {
  let unique = false;
  let newName = '';

  while (!unique) {
    newName = uniqueNamesGenerator(config);
    const existingUser = await db.user.findFirst({
      where: { displayName: newName },
    });

    if (!existingUser) {
      unique = true;
    }
  }

  return newName;
}

export const createImage = (id: string, entity: 'team' | 'user') => {
  const color = randomElement(userColors).replace('#', '');
  const shape = entity === 'team' ? 'shapes' : 'adventurer-neutral';
  const imageUrl = `https://api.dicebear.com/7.x/${shape}/svg?seed=${id}.svg?backgroundColor=${color}`;
  return imageUrl;
};

// const teamImage = createImage(teamId, 'team');

export async function createOrUpdateName(userId: string): Promise<string> {
  const nameSuffix = userId.slice(-6);
  return `UU ${nameSuffix}`;
}

export async function createOrUpdateUsername(userId: string): Promise<string> {
  const usernameSuffix = userId.slice(-6);
  return `User ${usernameSuffix}`;
}

interface UserUpdate {
  displayName?: string;
  image?: string;
  name?: string;
  username?: string;
}

export async function updateNewUser(userId: string): Promise<UserUpdate> {
  const existingUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error(`User with ID ${userId} not found.`);
  }

  const updates: UserUpdate = {};

  if (!existingUser.displayName) {
    updates.displayName = await generateUniqueDisplayName();
  }

  if (!existingUser.image) {
    updates.image = createImage(userId, 'user');
  }

  if (!existingUser.name) {
    updates.name = await createOrUpdateName(userId);
  }

  if (!existingUser.username) {
    updates.username = await createOrUpdateUsername(userId);
  }

  if (Object.keys(updates).length > 0) {
    await db.user.update({
      where: { id: userId },
      data: updates,
    });
  }

  return updates;
}
