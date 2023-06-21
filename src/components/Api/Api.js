import axios from 'axios';
const API_KEY = '35784631-ba5c8985f27dc4b55b0d6e182';
axios.defaults.baseURL = 'https://pixabay.com/api';

export const getItems = async (search, page = 1, controller) => {
    const newSearch = search.slice(search.indexOf('/') + 1);
  return await axios.get(`/?key=${API_KEY}&image_type=photo&per_page=12&q=${newSearch}&page=${page}&orientation=horizontal`,
    { signal: controller.signal, }
  );

  
};