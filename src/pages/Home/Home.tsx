import { FC, useEffect, useRef, useState } from 'react';
import { ReactEpubViewer } from 'react-epub-viewer';
import BookType from 'react-epub-viewer/lib/types/book'
import Page from 'react-epub-viewer/lib/types/page'
import { AvailableBooks } from '../../app/books';
import styles from './Home.module.scss';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [books, setBooks] = useState(AvailableBooks);
  const [locations, setLocations] = useState<string[]>([''])

  
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);


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
    }, 1000)
  }, [curretBookDetails])


  const onBookInfoChange = (book: BookType) => {
    setCurrentBookDetails(book);
  }

  const onPageChange = (page: Page) => {
    if(totalPage === 0){
      setTotalPage(page.totalPage)
    }

    setPreviousPage(currentPage);
    setCurrentPage(page.currentPage);

    // if(page.totalPage > curretBook.totalPage){
    //   const realCurrentPage = curretBook.totalPage - page.currentPage;
    //   if(realCurrentPage !== 0){
    //     localStorage.setItem('currentPage', realCurrentPage.toString())
    //     console.log(`${realCurrentPage} / ${page.totalPage}`);
    //   }
    // }
    // else{
    //   if(page.currentPage !== 0){
    //     localStorage.setItem('currentPage', page.currentPage.toString())
    //     console.log(`${page.currentPage} / ${page.totalPage}`);
    //   }
    // }
  }

  return (
    <div className={styles.Home}>
      <div className={styles.Header}>
        <h1>{curretBook.name}</h1>
        <div className={styles.PageNumber}>{`Page: ${currentPage} / ${totalPage}`}</div>
      </div>
      <div className={styles.Body}>
        <ReactEpubViewer
          url={curretBook.path}
          ref={viewerRef}
          onBookInfoChange={onBookInfoChange}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
};

export default Home;
