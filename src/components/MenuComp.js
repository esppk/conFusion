import React, { Component } from "react"
import DishdetailComp from "./DishdetailComp"
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishImg: "https://source.unsplash.com/hTR1XPtTo_k/800x600",
      selectedDish: null
    }
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish })
  }

  render() {
    const menu = this.props.dishes.map(dish => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={this.state.dishImg} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle style={{ color: "white" }}>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <DishdetailComp selectedDish={this.state.selectedDish} />
      </div>
    )
  }
}

export default Menu
