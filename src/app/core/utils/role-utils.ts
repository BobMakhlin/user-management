import {Role} from '../models/role.model';

export function getRandomRole(): Role {
  const roles = Object.values(Role) as Role[];
  return roles[Math.floor(Math.random() * roles.length)];
}
