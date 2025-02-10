import {Role} from '../models/role.model';

export function getRandomRole(): Role {
  const roles = getRoles();
  return roles[Math.floor(Math.random() * roles.length)];
}

export function getRoles(): Role[] {
  return Object.values(Role);
}

// todo role service
