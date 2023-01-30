import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { Table, TableProps } from "../../../../components";
import { services } from "../../../../services";

const tableConfigs: Omit<TableProps<UserRepo>, "data"> = {
  columns: [
    {
      key: "id",
      displayName: "ID",
    },
    {
      key: "name",
      displayName: "Repo Name",
    },
    {
      key: "html_url",
      displayName: "Repo URL",
    },
  ],
  transform: {
    html_url: (value) => (
      <Link to={{ pathname: value }} target="_blank">
        Repo Link
      </Link>
    ),
  },
};

export const UserReposTable = () => {
  let { username } = useParams();

  const [page, setPage] = useState(1);

  const { data } = useQuery(
    ["users", page],
    () =>
      services.users
        .getUserRepos(username ?? "", { page })
        .then((response) => response.data.repos),
    { keepPreviousData: true }
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Table
      {...tableConfigs}
      data={data || []}
      pagination={{
        count: -1,
        onPageChange: handleChangePage,
        page,
        rowsPerPage: 10,
        rowsPerPageOptions: [10],
      }}
    />
  );
};
