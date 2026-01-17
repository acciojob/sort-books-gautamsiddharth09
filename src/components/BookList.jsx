import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBookSelector } from '../features/bookSelector'
import { setSortBy, setOrder, booksApi } from '../features/bookSlice'

const BookList = () => {

   console.log("RENDER"); 
   
  const dispatch = useDispatch()

  const books = useSelector(sortBookSelector)
  const { isLoading, error, sortBy, order } = useSelector(
    (state) => state.books
  )
useEffect(() => {
  console.log("DISPATCHING API");
  dispatch(booksApi());
}, [dispatch]);

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    
    <div>
      <h1>Books List</h1>
      <select value={sortBy} onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select value={order} onChange={(e) => dispatch(setOrder(e.target.value))}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>

        <tbody>
          {books?.map((book) => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookList
