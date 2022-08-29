import React, { useEffect, useRef, useState } from 'react';
import './App.scss';
import { ReactEpubViewer } from 'react-epub-viewer';
import BookType from 'react-epub-viewer/lib/types/book'
import Page from 'react-epub-viewer/lib/types/page'
import { AvailableBooks } from './app/books';

function App() {
  const [books, setBooks] = useState(AvailableBooks);
  const [locations, setLocations] = useState<string[]>([''])
  const [curretBookDetails, setCurrentBookDetails] = useState<BookType>();
  const [curretBook, setCurrentBook] = useState(books[0]);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setLocations(JSON.parse(localStorage.getItem(Object.keys(localStorage).find(key => key.includes('locations'))!)!))
    }, 0)
  }, [])

  useEffect(() => {
    setTimeout(()=>{
      if(curretBookDetails && viewerRef.current){
        viewerRef.current.setLocation(locations[Number(localStorage.getItem('currentPage'))])
      }
    }, 150)
  }, [curretBookDetails])


  const onBookInfoChange = (book: BookType) => {
    setCurrentBookDetails(book);
  }

  const onPageChange = (page: Page) => {
    if(page.currentPage !== 0){
      localStorage.setItem('currentPage', page.currentPage.toString())
    }
  }

  return (
    <div className="App">
      <div className="Body">
        <ReactEpubViewer
          url={curretBook.path}
          ref={viewerRef}
          onBookInfoChange={onBookInfoChange}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}

export default App;
