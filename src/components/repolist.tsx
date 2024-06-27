import React, { useState } from 'react';
import { Book, } from '../types';
import '../App.scss';

interface BookListProps {
    books: Book[];
    deleteBook: (id: number) => void;
    updateBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook, updateBook }) => {
    const [editBookId, setEditBookId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editYear, setEditYear] = useState('');

    const handleDelete = (id: number) => {
        deleteBook(id);
    };

    const handleEdit = (book: Book) => {
        setEditBookId(book.id);
        setEditTitle(book.title);
        setEditAuthor(book.author);
        setEditYear(book.year.toString());
    };

    const handleSave = (id: number) => {
        updateBook({ id, title: editTitle, author: editAuthor, year: Number(editYear) });
        setEditBookId(null);
    };

    const handleCancel = () => {
        setEditBookId(null);
    };

    return (
        <div className="booklist">
            <table border={1}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>
                                {editBookId === book.id ? (
                                    <input 
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)} 
                                        title='Title'
                                    />
                                ) : (
                                    book.title
                                )}
                            </td>
                            <td>
                                {editBookId === book.id ? (
                                    <input 
                                        type="text" 
                                        value={editAuthor} 
                                        onChange={(e) => setEditAuthor(e.target.value)} 
                                        title='Author'
                                    />
                                ) : (
                                    book.author
                                )}
                            </td>
                            <td>
                                {editBookId === book.id ? (
                                    <input 
                                        type="number" 
                                        value={editYear} 
                                        onChange={(e) => setEditYear(e.target.value)} 
                                        title='Publication Year'
                                    />
                                ) : (
                                    book.year
                                )}
                            </td>
                            <td>
                                {editBookId === book.id ? (
                                    <>
                                        <button onClick={() => handleSave(book.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(book)}>Edit</button>
                                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
