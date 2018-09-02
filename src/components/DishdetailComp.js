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
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from "react-router-dom"

const RenderDish = ({ dish }) => {
  if (dish != null) {
    return (
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
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

const RenderComments = props => {
  let dishComments = null
  if (props.comments !== null) {
    dishComments = props.comments.map(com => {
      // console.log(com.comment)
      return (
        <ListGroupItem key={com.id}>
          <ListGroupItemText>
            <span>{com.comment}</span>
            <br />
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
  return <ListGroup>{dishComments}</ListGroup>
}

const Dishdetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">HOME</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu">MENU</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish[0].name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish[0]} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  )
}

export default Dishdetail
