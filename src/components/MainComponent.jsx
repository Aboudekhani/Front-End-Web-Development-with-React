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
  return (
    <div>
      <Header/>
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={()=><Menu dishes={this.state.dishes}></Menu>}></Route>
        <Route exact path="/contactus" component ={Contact}/>
        <Redirect to="/home"/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default Main;
