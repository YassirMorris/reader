import { FC, useEffect, useRef, useState } from 'react';
import { ReactEpubViewer } from 'react-epub-viewer';
import BookType from 'react-epub-viewer/lib/types/book'
import Page from 'react-epub-viewer/lib/types/page'
import { AvailableBooks } from '../../app/books';
import styles from './Home.module.scss';
import generalStyles from '../../common/General.module.scss'
import Prompt from '../../common/Prompt/Prompt';
import ReactLoading from 'react-loading';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [books, setBooks] = useState(AvailableBooks);
  const [locations, setLocations] = useState<string[]>([''])
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  
  const [previousPage, setPreviousPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);

  const [curretBookDetails, setCurrentBookDetails] = useState<BookType>();
  const [curretBook, setCurrentBook] = useState(books[0]);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const getLocationsTimer = setInterval(() => {
      const localLocationsKey = Object.keys(localStorage).find(key => key.includes('locations'));
      if(localLocationsKey){
        const localLocationsItem = localStorage.getItem(localLocationsKey);
        if(localLocationsItem){
          setLocations(JSON.parse(localLocationsItem))
          clearInterval(getLocationsTimer);
          setIsAvailable(true);
          return;
        }
      }
      viewerRef.current.nextPage();
    }, 200)
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
  }

  return (
    <div className={styles.Home}>
      {
        !isAvailable && <Prompt element={
          <div className={styles.Loading}>
            <ReactLoading type={'spinningBubbles'} color="#fff" width={'8rem'} height={'8rem'}/>
            <p>Please press left or right arrow key after loading is finished!</p>
          </div>
        }/>
      }
      <div className={styles.Header}>
        <h1 className={styles.BookTitle}>{curretBook.name}</h1>
        <div className={styles.PageNumber}>{`Page: ${currentPage} / ${totalPage}`}</div>
      </div>
      <div className={`${styles.Body} ${generalStyles.Unselectable}`}>
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
