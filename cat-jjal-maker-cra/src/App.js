import Title from './components/Title';
import CatItem from './components/CatItem';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';
import Form from './components/Form';

import logo from './logo.svg';
import './App.css';
import React from "react";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

console.log("야옹");

const App = () => {
  const CAT1 =
    "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 =
    "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });
  const [mainCat, setMainCat] = React.useState(CAT1);
  const [favoriteCat, setFavoriteCat] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favoriteCat.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);
    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    if (favoriteCat.includes(mainCat)) {
      const nextFavorites = [...favoriteCat].filter((item) => {
        return item !== mainCat });
      jsonLocalStorage.setItem("favorites", nextFavorites);
      setFavoriteCat(nextFavorites);
    } else {
      const nextFavorites = [...favoriteCat, mainCat];
      jsonLocalStorage.setItem("favorites", nextFavorites);
      setFavoriteCat(nextFavorites);
    }
  }

  return (
    <div>
      <Title>
        {counter === null ? "" : `${counter}번째`} 고양이 가라사대
      </Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favoriteCat={favoriteCat} />
    </div>
  );
};

export default App;
