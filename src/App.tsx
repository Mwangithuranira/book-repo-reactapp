import './App.css'
// import Form from './components/form'
import BookList from './components/repolist'
// import useBooksReducer from './hooks/bookReducer'





function App() {


  // const filterBooks = state.books && state.books.filter((book) => book.title.toLowerCase().includes(state.searchquery.toLowerCase()))
  const booksPerPage:number=5;


  return (
    <>
    <div className="bookApp">
      <h1>Book App</h1>
     <div>
      
      <BookList    booksPerPage={booksPerPage}/>
     </div>
    </div>
    </>
  )
}

export default App