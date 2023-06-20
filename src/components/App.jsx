import { useEffect, useState, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { Loader } from './Loader/LoaderSpiner'
import { getItems } from './Api/Api'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './LoadMoreBtn/LoadMoreBtn'
import Modal from './Modal/ModalWindow'

export const App = () => {

  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImage, setBigImage] = useState(null);

  const abortController = useRef(null);

  // Записує значення пошуку в state.search
  const handleSubmit = (newSearch) => {
    setSearch(newSearch.search);
    setPage(1);
    setImages([]);
    setShowButton(false);
    setError(null);
  };



  // Робить пошуковий запит на сервер, дозавантажує наступні фото
  useEffect(() => {
    if (!search) { return; };

    const axiosGetImages = async (changedSearch, currentPage) => {

      if (abortController.current) { abortController.current.abort(); };
      abortController.current = new AbortController();

      setisLoading(true);
      try {
        const { data } = await getItems(changedSearch, currentPage, abortController.current);

        const { hits, totalHits } = data;

        currentPage < Math.ceil(totalHits / 12)
          ? setShowButton(true)
          : setShowButton(false);
        currentPage === 1
          ? setImages(hits)
          : setImages(previosState => [...previosState, ...hits]);

        if (!hits.length) {
          setError(`Зображення ${search} відсутні`);
          return;
        };

      }
      catch (error) {
        setError(error.message);
      }
      finally {
        setisLoading(false);
      }

      return () => {
        if (abortController.current) {
          abortController.current.abort();
        }
      };
    };
    axiosGetImages(search, page);
  }, [search, page]);


  // Завантаження додаткових фото
  const addPage = () => {
    setPage(prevState => prevState + 1);
  };

  // Відкриття модального вікна
  const openModal = event => {
    setBigImage(event);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Закриття модального вікна
  const closeModal = () => {
    setBigImage(null);
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <Searchbar onSearch={handleSubmit} />
      {images.length > 0 && (<ImageGallery pictures={images} onOpenModal={openModal} />)}
      {isLoading && <Loader />}
      {error && <p style={appStyle}> {error} </p>}
      {showButton && (<Button morePictures={addPage} />)}
      {showModal && <Modal
        image={bigImage}
        onClose={closeModal}
      />}

    </>
  );

};




const appStyle = {
  fontSize: 30,
  textAlign: 'center',
}

