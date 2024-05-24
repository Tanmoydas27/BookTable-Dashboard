import axios from 'axios';

const API_URL = 'https://openlibrary.org';

export const fetchBooks = async (page, limit) => {
  try {
    console.log("loading backend")
    const response = await axios.get(`${API_URL}/search.json`, {
        params: {
          page,
          limit,
          q: 'books' 
        }
      });
      return response.data;
  } catch (error) {
    console.error('Error getting Books :', error);
    return null;
  }
};

export const getAuthorDetails = async (authorKey) => {
    try {
      const response = await axios.get(`${API_URL}/authors/${authorKey}.json`);
      return response.data;
    } catch (error) {
      console.error('Error getting author details:', error);
      return null;
    }
  };
 
export const getAuthor = async (authorName) => {
    try {
        const response = await axios.get(`${API_URL}/search/authors.json?q=${encodeURIComponent(authorName)}`);
        return response.data;
    } catch (error) {
        console.error('Error getting author details:', error);
        return null;
    }
}

export const  getBooksByAuthorName = async (authorName)=>{
  try {
    
  } catch (error) {
    console.error('Error getting author details:', error);
        return null;
  }
}