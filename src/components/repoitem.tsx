
import React, { useRef } from 'react';
import { Action } from '../types';
import '../App.scss'


interface BookFormProps {
    dispatch: React.Dispatch<Action>
}

const Repoitem: React.FC<BookFormProps> = ({ dispatch }) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const authorRef = useRef<HTMLInputElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (titleRef.current && authorRef.current && yearRef.current) {
            const newBook = {
                id: Date.now(),
                title: titleRef.current.value,
                author: authorRef.current.value,
                year: Number(yearRef.current.value),
            };
            dispatch({ type: 'ADD_BOOK', payload: newBook });
            titleRef.current.value = '';
            authorRef.current.value = '';
            yearRef.current.value = '';
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input ref={titleRef} type="text" placeholder="Title" required />
            <input ref={authorRef} type="text" placeholder="Author" required />
            <input ref={yearRef} type="number" placeholder="Publication Year" required />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default Repoitem;
