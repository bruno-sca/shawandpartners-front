import { api } from "./api";
import { usersService } from "./modules/users";

export const services = {
  users: usersService(api),
};
