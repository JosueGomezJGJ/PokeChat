
import React, {useState, useEffect} from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = () => {


  

  return (
    <div className="CenteredTopLayout">
      <Segment raised stacked color='red'>
        <Header as="h1">Welcome to the Pokeverse!</Header>
        <Header as="h1"></Header>
        <Link to="/card">
          <Button primary animated>
            <Button.Content visible>Let's GO!</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Link>
      </Segment>
    </div>
  );
};
  
export default Home;