import { Component } from 'react';
import Menu from './MenuComponent';


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect ,withRouter} from 'react-router-dom'
import {connect} from'react-redux'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import {addComment,fetchDishes} from '../redux/ActionCreators'




const mapStatetoProps =state=>{
  return{
    dishes:state.dishes,
    leaders: state.leaders,
    promotions:state.promotions,
    comments:state.comments
  }
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes:()=>{dispatch(fetchDishes())}
});
class Main extends Component  {

  componentDidMount(){
    this.props.fetchDishes();
  }
 
   onDishSelect(dishId){
      
    this.setState({selectedDish:dishId})
  } 
   render(){
     const HomePage=()=>{
       return(<Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrmess={this.props.dishes.errmes}
               promotion ={this.props.promotions.filter((promotion)=>promotion.featured)[0]}
               leader = {this.props.leaders.filter((leader)=>leader.featured)[0]}
       />);
     }

  const DishWithId=({match})=>{
    return(
      <DishDetail dish={this.props.dishes.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errmess={this.props.dishes.errmes}
                  comments = {this.props.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
                  addComment = {this.props.addComment}
     />

    )
  }


  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}></Menu>}></Route>
        <Route path="/menu/:dishId" component={DishWithId}/> 
        <Route exact path="/contactus" component ={Contact}/>
        <Route path="/aboutus" component={()=><About leaders={this.props.leaders}></About>}></Route>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Main));
