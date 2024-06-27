import { Book, State, Action } from '../types';




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

// export const useBooksReducer = () => {
//   const [storedBooks, setStoredBooks, isSyncingBooks, booksError] = useLocalStorage<Book[]>("books", [], 'https://book-repo-backend.onrender.com/api/books');
//   const [storedCurrentPage, setStoredCurrentPage, isSyncingPage, pageError] = useLocalStorage<number>("currentPage", initialstate.currentPage, 'https://book-repo-backend.onrender.com/api/currentPage');

//   const [state, dispatch] = useReducer(reducer, { 
//     ...initialstate, 
//     books: storedBooks, 
//     currentPage: storedCurrentPage 
//   });

//   useEffect(() => {
//     setStoredBooks(state.books);
//   }, [state.books, setStoredBooks]);

//   useEffect(() => {
//     setStoredCurrentPage(state.currentPage);
//   }, [state.currentPage, setStoredCurrentPage]);

//   // Handle potential errors and syncing states
//   useEffect(() => {
//     if (booksError) {
//       console.error("Error syncing books:", booksError);
//     }
//     if (pageError) {
//       console.error("Error syncing current page:", pageError);
//     }
//   }, [booksError, pageError]);

//   useEffect(() => {
//     if (isSyncingBooks) {
//       console.log("Syncing books to the backend...");
//     }
//   }, [isSyncingBooks]);

//   useEffect(() => {
//     if (isSyncingPage) {
//       console.log("Syncing current page to the backend...");
//     }
//   }, [isSyncingPage]);

//   return [state, dispatch] as [State, React.Dispatch<Action>];
// };

// export default useBooksReducer;

