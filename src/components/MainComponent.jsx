import { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS}from '../shared/comments'
import {PROMOTIONS} from '../shared/promotion'
import {LEADERS} from '../shared/leaders'

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';

class Main extends Component  {
   constructor(props){
     super(props)
     this.state={
       dishes :DISHES,
       promotions : PROMOTIONS,
       leaders : LEADERS,
       comments:COMMENTS,
       selectedDish : null
     }
   }

   onDishSelect(dishId){
      
    this.setState({selectedDish:dishId})
  } 
   render(){
     const HomePage=()=>{
       return(<Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
               promotion ={this.state.promotions.filter((promotion)=>promotion.featured)[0]}
               leader = {this.state.leaders.filter((leader)=>leader.featured)[0]}
       />);
     }

  const DishWithId=({match})=>{
    return(
      <DishDetail dish={this.state.dishes.filter((dish)=>dish.id === parseInt(match.params.dishId,10))[0]}
                  comment = {this.state.comments.filter((comment)=>comment.id === parseInt(match.params.dishId,10))}

      >


      </DishDetail>
    )
  }


  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}></Menu>}></Route>
        <Route path="/menu/:dishId" component={DishWithId}> </Route>
        <Route exact path="/contactus" component ={Contact}/>
        <Route path="/aboutus" component={()=><About leaders={this.state.leaders}></About>}></Route>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default Main;
