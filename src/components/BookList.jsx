import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortBookSelector } from "../features/bookSelector";
import { setSortBy, setOrder, booksApi } from "../features/bookSlice";

const BookList = () => {
  console.log("RENDER");

  const dispatch = useDispatch();

  const books = useSelector(sortBookSelector);
  const { isLoading, error, sortBy, order } = useSelector(
    (state) => state.books,
  );
  useEffect(() => {
    console.log("DISPATCHING API");
    dispatch(booksApi());
  }, [dispatch]);

  
  const handleSortChange = (e) => dispatch(setSortBy(e.target.value));
  const handleOrderChange = (e) => dispatch(setOrder(e.target.value));


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

   return (
    <div className="books-container">
      <h1>Book List</h1>

      <div className="controls">
        <label>
          Sort by:
          <select
            data-test="sort-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>

        <label>
          Order:
          <select
            data-test="order-select"
            value={order}
            onChange={handleOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <table data-test="books-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.isbn}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;