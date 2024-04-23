import React, { useEffect, useState } from "react";
import { Card, Image, List, ListItem } from "semantic-ui-react";
import axios from "axios";

const PokemonCard = ({ pokemonID }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

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

  return (
    <Card>
      <Image
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        size="medium"
      />
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
