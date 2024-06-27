import React, { useCallback, useEffect, useState } from 'react';
import Repoitem from './components/repoitem';
import BookList from './components/repolist';
import Page from './components/repopage';
import './App.scss';

const App: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://book-repo-backend.onrender.com/api/books');
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

  
    const deleteBook = async (id: number) => {
        setLoading(true);
        try {
            const response = await fetch(`https://book-repo-backend.onrender.com/api/books/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateBook = async (book: { id: number; title: string; author: string; year: number }) => {
        setLoading(true);
        try {
            const response = await fetch(`https://book-repo-backend.onrender.com/api/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            setBooks(books.map(b => (b.id === book.id ? { ...b, ...book } : b)));
        } catch (error) {
            console.error('Error updating book:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }, []);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const booksPerPage = 5;
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    return (
        <div className="app">
            {loading && <div className="loader" />}
            <div className="content">
                <h1>Book Repository</h1>
                <Repoitem  />
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search by title"
                    />
                </div>
                <BookList books={currentBooks} deleteBook={deleteBook} updateBook={updateBook} />
                <Page
                    currentPage={currentPage}
                    booksPerPage={booksPerPage}
                    totalBooks={filteredBooks.length}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default App;

interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}
