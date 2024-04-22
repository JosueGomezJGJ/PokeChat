import React, {Component} from "react";
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  state = {
      activeItem: 'homepage'
  }
  handleClick = (e, { name }) => {
      this.setState({ activeItem: name })
  }
  render() {
      const { activeItem } = this.state
      return (
          <Menu fixed='top' inverted className="Navigation">
              <Menu.Item
                  as={NavLink} to="/"
                  name='home'
                  active={activeItem === 'home'}
                  onClick={this.handleClick}>
                  Home
              </Menu.Item>
              <Menu.Item
                  as={NavLink} to="/card"
                  name='browse'
                  active={activeItem === 'card'}
                  onClick={this.handleClick}>
                  PokeCard
              </Menu.Item>
              <Menu.Item
                  as={NavLink} to="/chat"
                  name='browse'
                  active={activeItem === 'chat'}
                  onClick={this.handleClick}>
                  PokeChat
              </Menu.Item>
              </Menu>
      )
  }
}
export default Navigation;
