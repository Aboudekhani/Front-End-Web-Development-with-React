import React,{Component} from 'react'
import {Card,CardImg,CardBody,CardTitle,CardText,BreadcrumbItem,Breadcrumb, Label,
     Button, Modal, ModalHeader,ModalBody, Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'
import { Loading } from './LoadingComponent';
import { props } from 'bluebird';
import { baseUrl } from '../shared/baseUrl';


const required =(val)=>val && val.length 
const maxLength =(len)=> (val) =>!(val) || (val.length<= len)
const minLength =(len)=> (val) =>val && (val.length>= len)

class CommentForm extends Component{
    constructor(props){
        super(props)
        this.state ={
            isModalOpen :false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handelSubmit = this.handelSubmit.bind(this)
    }

    handelSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    toggleModal(){
        this.setState({isModalOpen:!this.state.isModalOpen})
    }
    render(){
        return(
            <div>
            <Button className="btn btn-outline-secondary" onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-ls"></span> Submit Comment
            </Button>
             <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
             <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
             <ModalBody>
                 <div className="container">
                 <LocalForm onSubmit={this.handelSubmit}>
                     <Row className="form-group">
                         <Label htmlFor="rating">Rating</Label>
                         <Col md={12}>
                         <Control.select model=".rating" type="select" name="rating" className="form-control">
                                    <option>1 </option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                         </Control.select>
                         </Col>
                     </Row>
                     <Row className="form-group">
                         <Label htmlFor="author">Your Name</Label>
                         <Col md={12}>
                         <Control.text model=".author" name="author"
                         placeholder="Your Name" 
                          className="form-control"
                          validators={{
                            minLength:minLength(3),
                            maxLength:maxLength(15)
                        }}
                         />
                         <Errors className="text-danger" model=".author" show="touched" messages={{
                                    required:'required',
                                    minLength:"must be more 3 charcter",
                                    maxLength:"must be less then 15 "
                                }}/>
                         </Col>
                     </Row>
                     <Row className="form-group">
                         <Label htmlFor="comment">Comment</Label>
                     <Control.textarea model=".comment" type="textarea" id="comment" name="comment" rows={6}  className="form-control"></Control.textarea>
                    
                     </Row>
                     <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                 </LocalForm>
                 </div>
             </ModalBody>
             
         </Modal>
         </div>
        );
    }

}

function RenderDish({dish}){
    if(props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if( props.errmess){
        return(
            <div className="container">
                <div className="row">
                   <h4>{props.errmess}</h4>
                </div>
            </div>
        )
    }
     else if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%"  src={ baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle >{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            );    
    }
    else return(<div></div>)
    
    
}

function RenderComment({comments, addComment, dishId}){
    
    if(comments !=null){
      const cmts =  comments.map((cmt)=>{
            return(
                <ul key={cmt.id} className="list-unstyled">
                        <li>
                            <p> {cmt.comment} </p>
                            <p> -- {cmt.author} , 
                               
                                {new Intl.DateTimeFormat('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit'
                                }).format(new Date(Date.parse(cmt.date)))}
                            </p>
                        </li>
                    </ul>
            )}
            )
            return(
                <div className="col-12 col-md-5 m-1">
                    <h1>Comments</h1>
                    {cmts}
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
    }

const DishDetail=(props)=>{
    if(props.dish != null){
        return(
            
            <div className="container">
                <div className="row">
                <Breadcrumb>
                    
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
            </div>
                <div className="row">
                   <RenderDish dish={props.dish}/>
                   <RenderComment comments={props.comments} addComment={props.addComment}
        dishId={props.dish.id}/>
                </div>
            </div>
        );
    
        }
        else {
            
            return(<div>
           

        </div>)}


}
        
  
export default DishDetail