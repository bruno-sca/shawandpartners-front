type User = {
  id: number;
  login: string;
};

type DetailedUser = User & {
  avatar_url: string;
  created_at: string;
};

type UserRepo = {
  id: number;
  name: string;
  html_url: string;
};
