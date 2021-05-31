import React from 'react';
import {
  DataTable,
  DataTableHeader,
  DataTableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
} from 'carbon-components-react';

interface RepoTableProps<Row extends DataTableRow = DataTableRow, Header extends DataTableHeader = DataTableHeader> {
  rows: Row[];
  headers: Header[];
}

interface GenericRow extends DataTableRow, Record<string, any> {
}

const RepoTable: React.FC<RepoTableProps<GenericRow>> = ({rows, headers}) => {
  const getRowDescription = (rowId: string) => {
    const row = rows.find(({ id }) => id === rowId);
    return row ? row.description : '';
  };

  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
                 rows,
                 headers,
                 getHeaderProps,
                 getRowProps,
                 getTableProps,
               }) => (
        <TableContainer
          title="Carbon Repositories"
          description="A collection of public Carbon repositories.">
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader/>
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({header})}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <React.Fragment key={row.id}>
                  <TableExpandRow {...getRowProps({row})}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    <p>{getRowDescription(row.id)}</p>
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

export default RepoTable;