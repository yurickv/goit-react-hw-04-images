import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar'
import { Loader } from './Loader/LoaderSpiner'
import { getItems } from './Api/Api'
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './LoadMoreBtn/LoadMoreBtn'
import Modal from './Modal/ModalWindow'

export class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    status: 'idle',
    error: null,
    showButton: false,
    showModal: false,
    bigImage: null,
  }

  // Записує значення пошуку в state.search
  handleSubmit = ({ search }) => {
    this.setState({
      search,
      page: 1,
      images: [],
      showButton: false,
      error: null,
    });
  }

  // Робить пошуковий запит на сервер, дозавантажує наступні фото
  componentDidUpdate(_, prevState) {
    const { search, page, } = this.state;

    if (prevState.page !== page || prevState.search !== search) {
      if (prevState.search !== search) { this.setState({ status: 'pending' }); }

      this.axiosGetImages(search, page);
    }
  }

  axiosGetImages = async (search, page) => {

    try {
      const { data } = await getItems(search, page);

      const { hits, totalHits } = data;

      if (!hits.length) {
        this.setState({
          error: `Зображення ${search} відсутні`,
          status: 'rejected',
        });
        console.log(this.state.status)
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        showButton: this.state.page < Math.ceil(totalHits / 12),
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  componentWillUnmount() {
    this.setState({ status: 'idle' });
  }


  // Завантаження додаткових фото
  addPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

  };

  // Відкриття модального вікна
  openModal = event => {
    this.setState({ bigImage: event, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  // Закриття модального вікна
  closeModal = () => {
    this.setState({ bigImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };



  render() {

    const { status, error, images, showButton, showModal, bigImage } = this.state;
    return (
      <div >
        <Searchbar onSearch={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (<ImageGallery pictures={images} onOpenModal={this.openModal} />)}
        {status === 'rejected' && <p style={appStyle}>{error}</p>}
        {showButton && (<Button morePictures={this.addPage} />)}
        {showModal &&
          <Modal
            image={bigImage}
            onClose={this.closeModal}
          />}

      </div >
    );
  }
};




const appStyle = {
  //   height: '100vh',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  fontSize: 30,
  textAlign: 'center',
  //   color: '#010101'
}

