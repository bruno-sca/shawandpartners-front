import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { services } from "../../services";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Avatar, CircularProgress, Stack, Typography } from "@mui/material";
import { UserReposTable } from "./components/UserReposTable";

export const UserDetails = () => {
  let { username } = useParams();

  // const data: DetailedUser = {
  //   id: 1,
  //   avatar_url:
  //     "https://avatars.githubusercontent.com/u/41133531?s=400&u=2ff5052a8e220f52c25a9a9ec98a3ebfe77a77b2&v=4",
  //   created_at: "2020-01-01T00:00:00Z",
  //   login: username ?? "",
  // };

  const { data, isError, isLoading } = useQuery(
    ["user-details", username],
    () =>
      services.users.getUser(username ?? "").then((response) => response.data),
    { keepPreviousData: true }
  );

  if (!data) {
    if (isError) return <Typography variant="h3">User not found!</Typography>;
    return <CircularProgress />;
  }

  const { user } = data;

  return (
    <Stack spacing={6}>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent={{
          xs: "center",
          sm: "flex-start",
        }}
      >
        <Grid>
          <Avatar src={user.avatar_url} sx={{ width: 192, height: 192 }} />
        </Grid>
        <Grid>
          <Stack spacing={2} justifyContent="center">
            <Typography variant="h4">{user.login}</Typography>
            <Typography variant="body1">
              ID: <strong>{user.id}</strong>
            </Typography>
            <Typography variant="body1">
              Created at: <strong>{user.created_at}</strong>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <UserReposTable />
    </Stack>
  );
};
