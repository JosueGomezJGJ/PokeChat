import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Input, List, Label, ListItem} from 'semantic-ui-react'
import '../App.scss';
import { POKE_API } from '../AppConfig';
import axios from 'axios';


const PokemonCard = ({pokemonID}) => {
    const [data, setData] = useState(null); // store the result here
    useEffect(() => {
        //AXIOS GET ON THE POKEAPI PT 
    }, [pokemonID]);
    
    return (
        <Card>
            {pokemonID}
        </Card>
    );
}

export {PokemonCard};