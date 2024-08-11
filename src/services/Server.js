import axios from 'axios';

const Server = axios.create({
    basedUrl: process.env.REACT_APP_SERVER_URL
})

export default Server;