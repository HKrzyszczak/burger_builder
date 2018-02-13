import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render () {
    return (
      <Aux>
        <Burger />
        <div>Build burger</div>
      </Aux>
     
    );
  }
}

export default BurgerBuilder;