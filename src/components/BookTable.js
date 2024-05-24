import React, { useEffect, useState, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { fetchBooks, getAuthor, getAuthorDetails, getBooksByAuthorName } from "../services/api";
import { useAuth0 } from "@auth0/auth0-react";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const BookTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const { user, isAuthenticated, logout } = useAuth0();

  const fetchData = async () => {
    setLoading(true);
    const result = await fetchBooks();

    const formattedData = await Promise.all(
      result.docs.map(async (book) => {
        const authorName = book.author_name[0];
        const authorKey = book.author_key[0];
        const authorDetails = await getAuthorDetails(authorKey);
        const author = await getAuthor(authorName);
        console.log(author.docs)
        return {
          ...book,
          subject: Array.isArray(book.subject)
            ? book.subject.join(" and ")
            : book.subject,
          author_birth_date: authorDetails
            ? authorDetails.birth_date
            : "Unknown",
          author_top_work: author ? author.docs[0].top_work : "Unknown",
        };
      })
    );
    setData(formattedData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (e) => {
    setSearchInput(e.target.value);
    if (searchInput.length === 0) {
      fetchData();
    } else {
      const response = await getBooksByAuthorName(searchInput);
      const data = await response.json();
      console.log(data);
      setData(data);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Author Name", accessor: "author_name" },
      { Header: "First Publish Year", accessor: "first_publish_year" },
      { Header: "Ratings Average", accessor: "ratings_average" },
      { Header: "Subject", accessor: "subject" },
      { Header: "Author Birth Date", accessor: "author_birth_date" },
      { Header: "Author Top Work", accessor: "author_top_work" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const downloadCSV = () => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "book_data.csv");
  };

  if (loading) {
    return <div className="h-screen flex justify-center items-center text-3xl">Wait 2 minutes while Loading...........</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-4">Book Dashboard</h1>
      <div className="flex justify-between">
        <h3 className='bg-black w-40 p-3 rounded text-white'>Hello {isAuthenticated && user.name}</h3>
        <button className='bg-black w-40 p-3 rounded text-white' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
      </div>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <input
            type="search"
            className="p-3 w-full"
            placeholder="Search Name here"
            value={searchInput}
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded ml-4"
            onClick={downloadCSV}
          >
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
          >
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="text-center w-1/12"
                    >
                      <div className="flex justify-center items-center space-x-2">
                        <span>{column.render("Header")}</span>
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <FontAwesomeIcon icon={faSortDown} />
                            ) : (
                              <FontAwesomeIcon icon={faSortUp} />
                            )
                          ) : (
                            <FontAwesomeIcon icon={faSort} />
                          )}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="divide-x divide-black">
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center w-1/7 ${
                          [
                            "author_name",
                            "subject",
                            "author_top_work",
                            "title",
                            "first_publish_year",
                            "author_birth_date",
                            "ratings_average",
                          ].includes(cell.column.id)
                            ? "max-w-4 truncate"
                            : ""
                        }`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {[10, 50, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="flex items-center justify-center px-3 h-8 ms-0 text-sm leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1L1 5l4 4"
                />
              </svg>
            </button>
            <span className="text-sm text-gray-700">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="flex items-center justify-center px-3 h-8 ms-3 text-sm leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTable;

