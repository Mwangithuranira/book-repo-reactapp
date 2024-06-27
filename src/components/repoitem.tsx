import React, { useRef } from 'react';
import '../App.scss';

interface BookFormProps {
    addBook: (newBook: { title: string; author: string; year: number }) => Promise<void>;
}

const RepoItem: React.FC<BookFormProps> = ({ addBook }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (titleRef.current && authorRef.current && yearRef.current) {
            const newBook = {
                title: titleRef.current.value,
                author: authorRef.current.value,
                year: Number(yearRef.current.value),
            };
            try {
                await addBook(newBook);
                titleRef.current.value = '';
                authorRef.current.value = '';
                yearRef.current.value = '';
            } catch (error) {
                console.error('Failed to add book:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="book-form">
            <input ref={titleRef} type="text" placeholder="Title" required />
            <input ref={authorRef} type="text" placeholder="Author" required />
            <input ref={yearRef} type="number" placeholder="Publication Year" required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default RepoItem;
