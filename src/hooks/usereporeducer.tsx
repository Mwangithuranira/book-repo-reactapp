import { Book, State, Action } from "../types";
import { useReducer, useEffect } from "react";
import useLocalStorage from "./uselocalstorage";

const initialstate: State = {
  books: [],
  searchQuery: '',
  currentPage: 1,
  booksPerPage: 5,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...state, books: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "ADD_BOOK":
      return { ...state, books: [...state.books, action.payload] };
    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book: Book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book: Book) => book.id !== action.payload),
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export const useBooksReducer = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>("books", []);
  const [storedCurrentPage, setStoredCurrentPage] = useLocalStorage<number>("currentPage", initialstate.currentPage);
  
  const [state, dispatch] = useReducer(reducer, { 
    ...initialstate, 
    books: storedBooks, 
    currentPage: storedCurrentPage 
  });

  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);

  useEffect(() => {
    setStoredCurrentPage(state.currentPage);
  }, [state.currentPage, setStoredCurrentPage]);

  return [state, dispatch] as [State, React.Dispatch<Action>];
};

export default useBooksReducer;
