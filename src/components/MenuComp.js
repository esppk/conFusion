import React, { Component } from "react"
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  CardColumns,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap"
import { Link } from "react-router-dom"
import { Loading } from "./LoadingComp"

function RenderMenuItem({ dish }) {
  return (
    <Card>
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle style={{ color: "white" }}>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  )
}

const Menu = props => {
  const menu = props.dishes.dishes.map(dish => {
    return <RenderMenuItem key={dish.id} dish={dish} />
  })

  if (props.dishes.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (props.dishes.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.dishes.errMess}</h4>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">HOME</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>MENU</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <CardColumns>{menu}</CardColumns>
        </div>
      </div>
    )
  }
}

export default Menu
