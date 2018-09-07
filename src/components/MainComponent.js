import React, { Component } from "react"
import Menu from "./MenuComp"
import Header from "./HeaderComp"
import Footer from "./FooterComp"
import Contact from "./ContactComp"
import Aboutus from "./AboutusComp"
import Home from "./HomeComp"

import Dishdetail from "./DishdetailComp"
import { Switch, Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { addComment, fetchDishes } from "../redux/ActionCreaters"

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes())
  }
})

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes()
  }

  render() {
    const HomePage = () => (
      <Home
        dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.filter(promo => promo.featured)[0]}
        leader={this.props.leaders.filter(leader => leader.featured)[0]}
      />
    )

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail
          dish={this.props.dishes.dishes.filter(
            dish => dish.id === parseInt(match.params.dishId, 10)
          )}
          isLoading={this.props.dishes.isLoading}
          ErrMess={this.props.dishes.errMess}
          comments={this.props.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      )
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route
            exact
            path="/aboutus"
            component={() => <Aboutus leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
)
