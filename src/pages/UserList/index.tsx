import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Table, TableProps } from "../../components/Table";
import { services } from "../../services";

const tableConfigs: Omit<TableProps<User>, "data"> = {
  columns: [
    {
      key: "id",
      displayName: "ID",
    },
    {
      key: "login",
      displayName: "UserName",
    },
  ],
  transform: {
    login: (value) => <Link to={`/users/${value}`}>{value}</Link>,
  },
};

export const UserList = () => {
  const [page, setPage] = useState(1);

  const { data } = useQuery<User[]>(
    ["users", page],
    () =>
      services.users.getUsers({ page }).then((response) => response.data.users),
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
