import React, { useEffect, useState } from 'react';
import FilterMenu from './FilterMenu';
import BookCard from './BookCard';
import AddBook from './AddBook';
import Nav from './Nav';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksThunk } from '../redux/bookSlice/thunk/fetchBooksThunk';

const Home = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const filterBooks = useSelector((state) => state.filter);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    dispatch(fetchBooksThunk);
  }, [dispatch]);

  const handleEdit = (book) => {
    setEditBook(book);
  };

  const filterByMenu = (bookObject) => {
    switch (filterBooks.menuItem) {
      case 'Featured':
        return bookObject.featured;

      default:
        return true;
    }
  };

  const filterBySearch = (bookObject) => {
    return (
      bookObject.name.toLowerCase().includes(filterBooks.searchKey) ||
      bookObject.author.toLowerCase().includes(filterBooks.searchKey)
    );
  };

  return (
    <div>
      <Nav />
      <main className="py-12 2xl:px-6">
        <div className="container grid xl:grid-cols-[auto_350px] 2xl:grid-cols-[auto_400px] gap-4 2xl:gap-8">
          <div className="order-2 xl:-order-1">
            <FilterMenu />
            {books.length > 0
              ? books
                  .filter(filterByMenu)
                  .filter(filterBySearch)
                  .map((book) => (
                    <BookCard book={book} key={book.id} onEdit={handleEdit} />
                  ))
              : 'No book found'}
          </div>
          <AddBook book={editBook} />
        </div>
      </main>
    </div>
  );
};

export default Home;
