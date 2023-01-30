import {
  TableContainer,
  Table as MUITable,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePaginationProps,
  TablePagination,
} from "@mui/material";

export type TableProps<T extends { id: string | number }> = {
  data: T[];
  columns: {
    key: keyof T;
    displayName: string;
  }[];
  transform?: {
    [key in keyof Partial<T>]: (value: T[key]) => React.ReactNode;
  };
  pagination?: TablePaginationProps;
};

export function Table<T extends { id: string | number }>({
  data,
  columns,
  pagination,
  transform,
}: TableProps<T>) {
  return (
    <Paper>
      <TableContainer>
        <MUITable stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(({ displayName, key }) => (
                <TableCell key={String(key)}>{displayName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map(({ key }) => (
                  <TableCell>
                    {transform && key in transform ? (
                      transform[key](row[key])
                    ) : (
                      <>{row[key]}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>
      {pagination && <TablePagination component="div" {...pagination} />}
    </Paper>
  );
}
