import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux/ReactAux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  soyCheese: 0.6,
  cheese: 0.4,
  soyMeat: 1.5,
  meat: 1.3,
  bacon: 0.7,
  vegBacon: 0.9,
}
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      vegBacon: 0,
      bacon: 0,
      soyCheese: 0,
      cheese: 0,
      soyMeat: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updateCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState = (ingredients) => {    
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, elem) => {
        return  sum + elem;
      }, 0);

      this.setState({
        purchaseable: sum > 0
      });
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseConinueHandler = () => {
    this.setState({purchasing: false});
    alert('You continue!')
  }

  render () {
    const disabledInfo= {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseConinueHandler} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler} 
          ingredientRemoved={this.removeIngredientHandler} 
          disabled={disabledInfo}
          purchaseable ={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice} />
      </Aux>     
    );
  }
}

export default BurgerBuilder;
