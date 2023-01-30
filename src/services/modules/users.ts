import { Api, ApiResponse } from "../api";

type UserServicesType = {
  getUser: (username: string) => ApiResponse<{ user: DetailedUser }>;
  getUsers: (pagination?: PaginationOptions) => ApiResponse<{ users: User[] }>;
  getUserRepos: (
    username: string,
    pagination?: PaginationOptions
  ) => ApiResponse<{ repos: UserRepo[] }>;
};

export const usersService: (api: Api) => UserServicesType = (api) => ({
  getUser: async (username) => {
    return api.get(`users/${username}`);
  },
  getUsers: async (pagination) => {
    return api.get("users", { params: pagination });
  },
  getUserRepos: async (username, pagination) => {
    return api.get(`users/${username}/repos`, { params: pagination });
  },
});
