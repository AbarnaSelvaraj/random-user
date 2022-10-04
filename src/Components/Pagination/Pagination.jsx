export default function Pagination({ page, setPage, getUsers }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <span
            className="page-link"
            onClick={(e) => {
              setPage(page - 1);
              getUsers();
            }}
          >
            Previous
          </span>
        </li>
        {page !== 1 && (
          <li className="page-item">
            <span
              className="page-link"
              onClick={(e) => {
                setPage(page - 1);
                getUsers();
              }}
            >
              {page - 1}
            </span>
          </li>
        )}
        <li className="page-item">
          <span
            className="page-link active"
            onClick={(e) => {
              setPage(page);
              getUsers();
            }}
          >
            {page}
          </span>
        </li>
        <li className="page-item">
          <span
            className="page-link"
            onClick={(e) => {
              setPage(page + 1);
              getUsers();
            }}
          >
            {page + 1}
          </span>
        </li>
        <li className="page-item">
          <span
            className="page-link"
            onClick={(e) => {
              setPage(page + 1);
              getUsers();
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
}
