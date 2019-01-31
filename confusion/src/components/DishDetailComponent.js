import React, { Component } from 'react';
import { Card, CardImg , CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody,
    Label, Button, Row, Col  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Stagger, Fade, FadeTransform } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }
    
    toggleModal() {
       this.setState({
         isModalOpen : !this.state.isModalOpen
       });
    }
    handleSubmitComment(values){
        //evt.preventDefault();
        this.props.postComment(this.props.dishId,values.rating,values.yourname,values.comment)
    }

    render() {
        return(
            <div className="container">
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                  <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                  <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                        <Row className="form-group">
                            <Col md={12}>
                                <Label htmlFor="rating">Rating</Label>
                            </Col>
                            <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Label htmlFor="yourname">Your Name</Label>
                            </Col>
                            <Col md={12}>
                                <Control.text model=".yourname" id="yourname" name="firstname"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                     />
                                <Errors
                                    className="text-danger"
                                    model=".yourname"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                 />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                            <Label htmlFor="comment">Comment</Label>
                            </Col>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10}}>
                                <Button type="submit" color="primary">
                                Comment
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                  </ModalBody>
              </Modal>
            </div>
        );
    }
} 

function RenderDish({dish}) {
    return(
    <FadeTransform
        in
        transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)'
        }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    </FadeTransform>
    );
}

function RenderComments(props){
    const comments = props.comments.map((comment) => {
        return(
            <Fade in>
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {comment.date}</p>
            </li>
            </Fade>
        );
    });

    return(
        <div className="col-12 col-md-5 m-2">
            <ul className="list-unstyled">
            <Stagger in>
            <h3>Comments</h3>
            {comments}
            </Stagger>
            </ul>
            <CommentForm postComment={props.postComment} dishId={props.dishId}/>
        </div>
    );

}

function DishDetail({dish,comments,postComment,isLoading,errMess}){
    if(isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }else if(errMess){
        return(
            <div className="container">
                <div className="row">
                    {errMess}
                </div>
            </div>
        );
    }else if (dish != null)
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                  <div className="col-12 col-md-5 m-2">
                    <RenderDish dish={dish}/>
                  </div>
                  <RenderComments comments={comments} postComment={postComment} dishId={dish.id}/>
                </div>
            </div>
        );
}

export default DishDetail;