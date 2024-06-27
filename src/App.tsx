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

    const addBook = async (newBook: { title: string; author: string; year: number }) => {
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            const addedBook = await response.json();
            dispatch({ type: 'ADD_BOOK', payload: addedBook });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteBook = async (id: number) => {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            dispatch({ type: 'DELETE_BOOK', payload: id });
        } catch (error) {
            console.error(error);
        }
    };

    const updateBook = async (book: { id: number; title: string; author: string; year: number }) => {
        try {
            const response = await fetch(`/api/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            dispatch({ type: 'UPDATE_BOOK', payload: book });
        } catch (error) {
            console.error(error);
        }
    };

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
            <Repoitem addBook={addBook} />
            <input
                type="text"
                value={state.searchQuery}
                onChange={handleSearch}
                placeholder="Search by title"
            />
            <BookList books={currentBooks} deleteBook={deleteBook} updateBook={updateBook} />
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
