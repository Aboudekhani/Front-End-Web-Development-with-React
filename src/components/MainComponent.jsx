import { Component } from 'react';
import Menu from './MenuComponent';
import {actions} from 'react-redux-form'

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect ,withRouter} from 'react-router-dom'
import {connect} from'react-redux'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import {postComment,fetchDishes, fetchPromos, fetchComments,fetchLeaders, postFeedback} from '../redux/ActionCreators'
import { TransitionGroup, CSSTransition } from 'react-transition-group';





const mapStatetoProps =state=>{
  return{
    dishes:state.dishes,
    leaders: state.leaders,
    promotions:state.promotions,
    comments:state.comments
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  fetchComments:()=>{dispatch(fetchComments())},
  fetchPromos:()=>{dispatch(fetchPromos())},
  resetFeedbackForm :()=>{dispatch(actions.reset('feedback'))},
  fetchLeaders:()=>{dispatch(fetchLeaders())},
  postFeedback :(firstname, lastname, telnum, email,agree,contactype,message)=>dispatch(postFeedback(firstname, lastname, telnum, email,agree,contactype,message))
});
class Main extends Component  {

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }
 
   onDishSelect(dishId){
      
    this.setState({selectedDish:dishId})
  } 
   render(){
     const HomePage=()=>{
       return(<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
               dishesLoading={this.props.dishes.isLoading}
               dishesErrmess={this.props.dishes.errmes}
               promotion ={this.props.promotions.promotions.filter((promotion)=>promotion.featured)[0]}
               promosLoading={this.props.promotions.isLoading}
               promosErrmess={this.props.promotions.errmes}
               leader = {this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}
               leadersLoading={this.props.leaders.isLoading}
               leadersErrmess={this.props.leaders.errmes}
       />);
     }

  const DishWithId=({match})=>{
    return(
      <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errmess={this.props.dishes.errmes}
                  comments = {this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
                  commenterrmess={this.props.comments.errmes}
                  postComment={this.props.postComment}
     />

    )
  }


  return (
    <div>
      <Header/>
     
     
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage}></Route>
            <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}></Menu>}></Route>
            <Route path="/menu/:dishId" component={DishWithId}/> 
            <Route exact path="/contactus" component ={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/> }/>
            <Route path="/aboutus" component={()=><About leaders={this.props.leaders}></About>}></Route>
            <Redirect to="/home"/>
          </Switch>

          </CSSTransition>  
        </TransitionGroup>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Main));
