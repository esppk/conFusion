import React, { Component } from "react"
import Menu from "./MenuComp"
import Header from "./HeaderComp"
import Footer from "./FooterComp"
import Home from "./HomeComp"
import { DISHES } from "../shared/dishes"
import Dishdetail from "./DishdetailComp"
import { Switch, Route, Redirect } from "react-router-dom"

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES
    }
  }
  render() {
    const HomePage = () => <Home />
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main
