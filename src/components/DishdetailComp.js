import React, { Component } from "react"
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  ListGroupItem,
  ListGroup,
  ListGroupItemText,
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from "react-redux-form"
import { Loading } from "./LoadingComp"

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
  return (
    <ListGroup>
      {dishComments}
      <CommentForm dishId={props.dishId} addComment={props.addComment} />
    </ListGroup>
  )
}

const maxLength = len => val => !val || val.length <= len
const minLength = len => val => val && val.length >= len

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.toggle = this.toggle.bind(this)
  }

  handleSubmit(value) {
    this.toggle()
    this.props.addComment(
      this.props.dishId,
      value.rating,
      value.author,
      value.comment
    )
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div>
        <Button
          outline
          color="secondary"
          onClick={this.toggle}
          className="mt-1">
          <i className="fas fa-edit" /> New Commnet
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <Label htmlFor="yourrating" md={12}>
                Your Rating
              </Label>
              <Control.select
                model=".rating"
                id="rating"
                className="form-control">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Control.select>
              <Label htmlFor="author" md={12} className="mt-1">
                Your Name
              </Label>
              <Control.text
                model=".author"
                id="author"
                name="author"
                placeholder="Your Name"
                className="form-control"
                validators={{
                  minLength: minLength(3),
                  maxLength: maxLength(15)
                }}
              />
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  minLength: "Must be greater than 3 characters",
                  maxLength: "Must be 15 characters or less"
                }}
              />
              <Label htmlFor="comment" md={12} className="mt-1">
                Comment
              </Label>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows="6"
                className="form-control"
              />
              <Button type="submit" color="primary" className="mt-1">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const Dishdetail = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    )
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  } else if (props.dish !== null) {
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
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish[0].id}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Dishdetail
