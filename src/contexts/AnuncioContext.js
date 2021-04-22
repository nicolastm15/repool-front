/* eslint-disable no-restricted-syntax */
import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  checkIfInterest,
  checkIfFavorite,
  extractComodidades,
} from 'src/utils/anuncioUtils';
import anuncioApi from '../api/anuncios';
import AuthContext from './AuthContext';

const AnuncioContext = createContext({
  anuncios: null,
  activeAnuncio: null,
  fetchAnuncios: null,
  fetchActiveAnuncio: null,
  toggleInterest: null,
  toggleFavorite: null,
  loadFavorites: null,
});

export const AnuncioProvider = ({ children }) => {
  const [anuncios, setAnuncios] = useState([]);
  const [activeAnuncio, setActiveAnuncio] = useState({});
  const { userToken, user, reloadUser, favorites, fetchFavorites } = useContext(
    AuthContext
  );

  const fetchAnuncios = async () => {
    try {
      const returnedAnuncios = await anuncioApi.getAll();
      const auxAnuncios = [];
      for (const anuncio of returnedAnuncios) {
        let editedAnuncio = extractComodidades(anuncio);
        editedAnuncio = checkIfFavorite(anuncio, favorites);
        auxAnuncios.push(editedAnuncio);
      }
      setAnuncios(auxAnuncios);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const fetchActiveAnuncio = async (id) => {
    try {
      const tmpAnuncio = await anuncioApi.getOne(id);
      let editedAnuncio = extractComodidades(tmpAnuncio);
      editedAnuncio = checkIfInterest(editedAnuncio, user);
      editedAnuncio = checkIfFavorite(editedAnuncio, favorites);
      setActiveAnuncio(editedAnuncio);
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const toggleFavorite = async (anuncioId) => {
    try {
      await anuncioApi.toggleFavorite(userToken, anuncioId);
      await fetchFavorites();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const toggleInterest = async (anuncioId) => {
    try {
      if (!activeAnuncio.isInterest) {
        await anuncioApi.createInterest(userToken, anuncioId);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: true };
        });
      } else {
        await anuncioApi.removeInterest(userToken, anuncioId);
        setActiveAnuncio((prevState) => {
          return { ...prevState, isInterest: false };
        });
      }
      reloadUser();
      return 'success';
    } catch (error) {
      return 'error';
    }
  };

  const loadFavorites = () => {
    const auxAnuncios = [];
    for (const anuncio of favorites) {
      const editedAnuncio = checkIfFavorite(anuncio, favorites);
      auxAnuncios.push(editedAnuncio);
    }

    setAnuncios(auxAnuncios);
  };

  return (
    <AnuncioContext.Provider
      value={{
        anuncios,
        activeAnuncio,
        fetchAnuncios,
        fetchActiveAnuncio,
        toggleInterest,
        toggleFavorite,
        loadFavorites,
      }}
    >
      {children}
    </AnuncioContext.Provider>
  );
};

AnuncioProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AnuncioContext;
