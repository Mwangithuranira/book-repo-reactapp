import { Book,State,Action } from "../types";

import { useReducer, useEffect } from "react";
import useLocalStorage from "./uselocalstorage";
 
const initialstate: State = {
  books: [],
  searchQuery:'',
  currentPage: 1,
  booksPerPage: 5,
};
 
export const reducer = (State: State, action: Action): State => {
  switch (action.type) {
    case "SET_BOOKS":
      return { ...State, books: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...State, searchQuery: action.payload };
    case "ADD_BOOK":
      return { ...State, books: [...State.books, action.payload] };
  
    case "UPDATE_BOOK":
      return {
        ...State,
        books: State.books.map((book: Book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case "DELETE_BOOK":
      return {
        ...State,
        books: State.books.filter((book: Book) => book.id !== action.payload),
      };
    default:
      return State;
  }
};
 
export const useBooksReducer = () => {
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>("books", []);
  const [state, dispatch] = useReducer(reducer, { ...initialstate, books: storedBooks });
 
  useEffect(() => {
    setStoredBooks(state.books);
  }, [state.books, setStoredBooks]);
 
  return [state, dispatch] as [State, React.Dispatch<Action>];
};
 
export default useBooksReducer;