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
    if((page.currentPage - 8114) > 0){
      localStorage.setItem('currentPage', (page.currentPage - 8114).toString())
      console.log(`${page.currentPage - 8114} / ${page.totalPage}`);
    }
  }

  return (
    <div className={styles.Home}>
      <div className="Header">
        </div>
        <div className="Body">
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
