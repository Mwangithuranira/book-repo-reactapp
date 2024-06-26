
import React, { useCallback } from 'react';
import Repoitem from './components/repoitem';
import BookList from './components/repolist';
import Page from './components/repopage';
import { useBooksReducer } from './hooks/usereporeducer';
import './App.scss';


const App: React.FC = () => {
    const [state, dispatch] = useBooksReducer();

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_SEARCH_QUERY', payload: event.target.value });
    }, [dispatch]);

    const filteredBooks = state.books.filter(book =>
        book.title.toLowerCase().includes(state.searchQuery.toLowerCase())
    );

    const currentBooks = filteredBooks.slice(
        (state.currentPage - 1) * state.booksPerPage,
        state.currentPage * state.booksPerPage
    );

    return (
        <div>
            <h1>Book Repository</h1>
            <Repoitem dispatch={dispatch} />
            <input
                type="text"
                value={state.searchQuery}
                onChange={handleSearch}
                placeholder="Search by title"
            />
            <BookList books={currentBooks} dispatch={dispatch} />
            <Page
                currentPage={state.currentPage}
                booksPerPage={state.booksPerPage}
                totalBooks={filteredBooks.length}
                dispatch={dispatch}
            />
        </div>
    );
};

export default App;