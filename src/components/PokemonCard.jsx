import React, { useEffect, useState } from "react";
import { Card, Image, List, ListItem, Button } from "semantic-ui-react";
import axios from "axios";

const PokemonCard = ({ pokemonID }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (data[pokemonID]) {
      console.log(data);
      return;
    }

    setLoading(true);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((response) => {
        setData((prevData) => ({
          ...prevData,
          [pokemonID]: response.data,
        }));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, [pokemonID]);

  const pokemonData = data[pokemonID];

  if (!pokemonData) {
    return loading ? <div>Loading...</div> : <div>No data available</div>;
  }

  const typeColors = {
    normal: "grey",
    fire: "red",
    water: "blue",
    electric: "yellow",
    grass: "green",
    ice: "teal",
    fighting: "orange",
    poison: "purple",
    ground: "brown",
    flying: "violet",
    psychic: "pink",
    bug: "olive",
    rock: "brown",
    ghost: "violet",
    dragon: "blue",
    dark: "black",
    steel: "grey",
    fairy: "pink",
  };

  const images = [
    pokemonData.sprites.front_default,
    pokemonData.sprites.back_default,
    pokemonData.sprites.front_shiny,
    pokemonData.sprites.back_shiny,
  ].filter(Boolean);

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  return (
    <Card>
      <Image src={images[currentImage]} alt="Pokemon Sprite" size="large" />
      <Button.Group>
        <Button onClick={handlePrevious} icon="left chevron" />
        <Button onClick={handleNext} icon="right chevron" />
      </Button.Group>
      <Card.Content>
        <Card.Header>
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </Card.Header>
        {pokemonData.types.map((type, index) => (
          <div key={index} className={`ui ${typeColors[type.type.name]} label`}>
            {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
          </div>
        ))}
        <List divided relaxed className="large">
          {pokemonData.stats.map((stat, index) => (
            <ListItem key={index}>
              <List.Content floated="left">
                {stat.stat.name.toUpperCase()}
              </List.Content>
              <List.Content floated="right">{stat.base_stat}</List.Content>
            </ListItem>
          ))}
        </List>
      </Card.Content>
    </Card>
  );
};

export { PokemonCard };
