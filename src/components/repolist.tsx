import React from 'react';
import { Book } from '../types';

interface BookListProps {
    books: Book[];
    deleteBook: (id: number) => void;
    updateBook: (book: Book) => void;
}

const Repolist: React.FC<BookListProps> = ({ books, deleteBook, updateBook }) => {
    const [editBookId, setEditBookId] = React.useState<number | null>(null);
    const [editTitle, setEditTitle] = React.useState('');
    const [editAuthor, setEditAuthor] = React.useState('');
    const [editYear, setEditYear] = React.useState('');

    const handleDelete = (id: number) => {
        deleteBook(id);
    };

    const handleEdit = (book: Book) => {
        setEditBookId(book.id);
        setEditTitle(book.title);
        setEditAuthor(book.author);
        setEditYear(String(book.year));
    };

    const handleSave = async (id: number) => {
        await updateBook({ id, title: editTitle, author: editAuthor, year: Number(editYear) });
        setEditBookId(null);
    };

    const handleCancel = () => {
        setEditBookId(null);
    };

    return (
        <div className="booklist">
            <table>
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
                                        onChange={e => setEditTitle(e.target.value)}
                                        title='title'
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
                                        onChange={e => setEditAuthor(e.target.value)}
                                        title='author'
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
                                        onChange={e => setEditYear(e.target.value)}
                                        title='year'
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

export default Repolist;
