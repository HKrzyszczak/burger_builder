import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://my-react-awesome-burger.firebaseio.com/'
})

export default instance;