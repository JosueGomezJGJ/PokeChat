import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Image,
  List,
  ListItem,
  Button,
  Icon,
  Label,
} from "semantic-ui-react";
import axios from "axios";

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

const PokemonCard = ({ pokemonID }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  console.log("Here is the pokemonID", pokemonID, typeof pokemonID);

  if (typeof pokemonID === "object") {
    pokemonID = pokemonID.id;
  }
  useEffect(() => {
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

  useEffect(() => {
    if (data[pokemonID]) {
      audioRef.current.src = data[pokemonID].cries.latest;
      audioRef.current.volume = 0.2;
      audioRef.current.addEventListener("ended", handleAudioEnded);
    }

    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnded);
    };
  }, [data, pokemonID]);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleAudioEnded = () => {
    setPlaying(false);
  };

  const images = [
    data[pokemonID]?.sprites.front_default,
    data[pokemonID]?.sprites.back_default,
    data[pokemonID]?.sprites.front_shiny,
    data[pokemonID]?.sprites.back_shiny,
  ].filter(Boolean);

  const handleNext = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  if (!data[pokemonID]) {
    return loading ? <div>Loading...</div> : <div>No data available</div>;
  }

  return (
    <Card>
      <Image
        src={images[currentImage]}
        alt="Pokemon Sprite"
        wrapped
        ui={false}
      />
      <Button.Group attached="top" widths="2">
        <Button icon onClick={handlePrevious}>
          <Icon name="left chevron" />
        </Button>
        <Button icon onClick={handleNext}>
          <Icon name="right chevron" />
        </Button>
      </Button.Group>
      <Card.Content>
        <Card.Header>
          {data[pokemonID].name.charAt(0).toUpperCase() +
            data[pokemonID].name.slice(1)}
          <Button icon floated="right" onClick={togglePlay}>
            <Icon name={playing ? "pause" : "play"} />
          </Button>
        </Card.Header>
        <Card.Meta>
          {data[pokemonID].types.map((type, index) => (
            <Label key={index} color={typeColors[type.type.name]}>
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </Label>
          ))}
        </Card.Meta>
        <List divided relaxed>
          {data[pokemonID].stats.map((stat, index) => (
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
