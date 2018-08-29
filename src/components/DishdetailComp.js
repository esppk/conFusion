import React from "react"

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  ListGroupItemText
} from "reactstrap"

const RenderDish = ({ dish }) => {
  const dishImg = "https://source.unsplash.com/hTR1XPtTo_k/800x600"
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dishImg} alt={dish.name} />
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

const RenderComments = ({ dish }) => {
  let comments = null
  if (dish != null && dish.comments != null) {
    comments = dish.comments.map(com => {
      // console.log(com.comment)
      return (
        <ListGroupItem key={com.id}>
          <ListGroupItemText>
            <p>{com.comment}</p>
            --- {com.author}{" "}
            <span>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(com.date)))}
            </span>
          </ListGroupItemText>
        </ListGroupItem>
      )
    })
  }
  return <ListGroup>{comments}</ListGroup>
}

const Dishdetail = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.selectedDish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish={props.selectedDish} />
        </div>
      </div>
    </div>
  )
}

export default Dishdetail
