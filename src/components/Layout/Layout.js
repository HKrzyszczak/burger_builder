<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React from 'react';
>>>>>>> abb154250ae78ef7e7f7882bfe41ca7eea7b2ffd
import classes from './Layout.css';
import Aux from '../../hoc/ReactAux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    } );
  }

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content} >
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;