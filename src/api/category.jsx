import Axios from 'axios';
export default Axios.create({
    baseURL: 'https://api-jollibee-menu.vercel.app',
    headers: {}
});