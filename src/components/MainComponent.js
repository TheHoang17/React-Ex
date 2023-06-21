import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import About from './AboutComponent';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS

    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    const DishWithId = () => {
      const {dishId} = useParams();
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(dishId, 10)
          )}
        />
      );
    };

    const HomePage = () => {
      return(
          <Home      dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}

          />
      );
    }

    return (
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />} />
          <Route exact path='/contactus' Component={Contact} />
          <Route exact path="/aboutus" Component={() => <About dishes={this.state.leaders} />}
          />
          <Route path="/menu/:dishId" Component={DishWithId} />
          <Route path="/" element={<Navigate to="/menu" />} />

        </Routes>
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
        <Footer />
      </div>
    );
  }
}

export default Main;