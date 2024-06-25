// src/types.d.ts
export interface Book {
    id: number;
    title: string;
    author: string;
    year: number;
}

export interface State {
    books: Book[];
    searchQuery: string;
    currentPage: number;
    booksPerPage: number;
}

export type Action =
    | { type: 'SET_BOOKS'; payload: Book[] }
    | { type: 'ADD_BOOK'; payload: Book }
    | { type: 'UPDATE_BOOK'; payload: Book }
    | { type: 'DELETE_BOOK'; payload: number }
    | { type: 'SET_SEARCH_QUERY'; payload: string }
    | { type: 'SET_CURRENT_PAGE'; payload: number };
