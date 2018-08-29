import React, { Component } from "react"
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle
} from "reactstrap"

function RenderMenuItem({ dish, onClick }) {
  const dishImg = "https://source.unsplash.com/hTR1XPtTo_k/800x600"
  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dishImg} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle style={{ color: "white" }}>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  )
}

const Menu = props => {
  const menu = props.dishes.map(dish => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  )
}

export default Menu
