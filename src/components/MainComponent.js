import React, { Component } from "react"
import Menu from "./MenuComp"
import Header from "./HeaderComp"
import Footer from "./FooterComp"
import { DISHES } from "../shared/dishes"
import Dishdetail from "./DishdetailComp"

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={dishId => this.onDishSelect(dishId)}
        />
        <Dishdetail
          selectedDish={
            this.state.dishes.filter(
              dish => dish.id === this.state.selectedDish
            )[0]
          }
        />
        <Footer />
      </div>
    )
  }
}

export default Main
