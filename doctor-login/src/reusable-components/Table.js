// import { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from "react-table";
import "./CustomTable.css";
import ReactPaginate from 'react-paginate';

const CustomTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    setPageSize,
    gotoPage,
    rows,
    setGlobalFilter,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    usePagination
  );

  const handlePageChange = ({ selected }) => {
    gotoPage(selected);
  };
//   const { globalFilter } = state;
//   console.log(state, "state.....");
  return (
    <div className="container">
      <div className="search-container">
        <label className="mr-2">
          Search: <span></span>
        </label>
        <input
          className="form-control mb-3"
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* <div>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={Math.ceil(data.length / pageSize)}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
        <div className="page-size-container" style={{float:"right"}}>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        </div>
    </div>
  );
};

export default CustomTable;
