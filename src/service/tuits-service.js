import axios from 'axios';
const TUITS_API = 'http://localhost:4000/api/tuits';

export const createTuit = async (tuit) => {
    const response = await axios.get(TUITS_API);
    const tuits = response.data;
    return tuits;
}

export const findTuits  = async ()     => {}

export const deleteTuit = async (tuit) => {}

export const updateTuit = async (tuit) => {}