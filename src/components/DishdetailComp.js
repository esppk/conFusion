import React, { Component } from "react"

import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  ListGroupItemText
} from "reactstrap"

class DishdetailComp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dishImg: "https://source.unsplash.com/hTR1XPtTo_k/800x600"
    }
  }

  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg width="100%" src={this.state.dishImg} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      )
    } else {
      return <div>{null}</div>
    }
  }

  renderComments(dish) {
    if (dish != null && dish.comments != null) {
      const comments = dish.comments.map(com => {
        // console.log(com.comment)
        return (
          <ListGroupItem key={com.id}>
            <ListGroupItemText>
              <p>{com.comment}</p>
              --- {com.author} <span>{com.date}</span>
            </ListGroupItemText>
          </ListGroupItem>
        )
      })
      return <ListGroup>{comments}</ListGroup>
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          {this.renderComments(this.props.selectedDish)}
        </div>
      </div>
    )
  }
}

export default DishdetailComp
