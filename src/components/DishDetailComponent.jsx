import React,{Component} from 'react'
import {Card,CardImg,CardBody,CardTitle,CardText} from 'reactstrap';

function RenderDish({dish}  ){
    return (
    <div className="col-12 col-md-5 m-1">
                
    <Card>
    <CardImg width="100%"  src={dish.image} alt={dish.name}/>
    <CardBody>
      <CardTitle >{dish.name}</CardTitle>
      <CardText>{dish.description}</CardText>
   </CardBody>
</Card>
    </div>
    );
}

function RenderComment({comments}){
    
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
                </div>
            );
        }
    }

class DishDetail extends Component{
    constructor(props){
        super(props)

    }
   

   
    render(){
        if(this.props.dish != null){
        return(
            
            <div className="container">
                <div className="row">
                   <RenderDish dish ={this.props.dish}/>
                   <RenderComment comments={this.props.dish.comments}/>
                </div>
            </div>
        );
    
        }
        else return(<div></div>)
    }

}

export default DishDetail