import React, { useEffect, useState } from "react";
import { Card, Image, Table, TableRow, TableCell } from "semantic-ui-react";
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

  return (
    <Card raised>
      <Image
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        size="medium"
      />
      <Card.Content>
        <Card.Header>
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </Card.Header>
        <Table basic="very" unstackable>
          <Table.Body>
            {pokemonData.stats.map((stat, index) => (
              <TableRow key={index}>
                <TableCell verticalAlign="middle">
                  {stat.stat.name.toUpperCase()}
                </TableCell>
                <TableCell verticalAlign="middle" textAlign="right">
                  {stat.base_stat}
                </TableCell>
              </TableRow>
            ))}
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export { PokemonCard };
