import React,{ Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DishDetail from './DishDetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postFeedback, postComment, fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

// Map redux store's state to props of main Component
const mapStatetoProps = (state) => {
	return {
		dishes : state.dishes,
		comments : state.comments,
		leaders : state.leaders,
		promotions : state.promotions,
		feedbacks: state.feedbacks
	}
}

// Map Change in redux store's state due to dispatch to props of main Component
const mapDispatchToProps = (dispatch) => ({
	postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
	postFeedback : (values) => dispatch(postFeedback(values)),
	fetchDishes: () => { dispatch(fetchDishes())},
	fetchComments: () => { dispatch(fetchComments())},
	fetchLeaders: () => { dispatch(fetchLeaders())},
	fetchPromos: () => { dispatch(fetchPromos())},
	resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});

class Main extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
	   this.props.fetchDishes();
	   this.props.fetchComments();
	   this.props.fetchPromos();
	   this.props.fetchLeaders();
	}

	render() {
		const HomePage = () => {
			return(
				<Home 
	              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
	              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
	              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
	              dishLoading={this.props.dishes.isLoading}
              	  dishErrMess={this.props.dishes.errMess}
              	  promoLoading={this.props.promotions.isLoading}
              	  promoErrMess={this.props.promotions.errMess}
              	  leaderLoading={this.props.leaders.isLoading}
              	  leaderErrMess={this.props.leaders.errMess}
	          	/>
			);
		}
		const MenuPage = () => {
			return(
				<Menu dishes={this.props.dishes} />
			);
		}
		const DishWithId = ({match}) => {
			return(
				<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId))[0]} 
				            isLoading={this.props.dishes.isLoading}
           				    errMess={this.props.dishes.errMess}
           				    commentsErrMess={this.props.comments.errMess}
				            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId))} 
				            postComment={this.props.postComment}
				            />
			);
		}
		const AboutUs = () => {
			return(
				<About leaders={this.props.leaders}
				       leadersLoading={this.props.leaders.isLoading}
				       leadersErrMess={this.props.leaders.errMess}/>
			);
		}
		const ContactUs = () => {
			return(
				<Contact resetFeedbackForm={this.props.resetFeedbackForm}
				         postFeedback={this.props.postFeedback}/>
			);
		}

		return(
				<React.Fragment>
				    <Header />
				    <TransitionGroup>
					    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
						    <Switch>
						    	<Route path="/home" component={HomePage} />
						    	<Route exact path="/menu" component={MenuPage} />
						    	<Route exact path="/menu/:dishId" component={DishWithId} />
						    	<Route exact path="/contactus" component={ContactUs} />
						    	<Route exact path="/aboutus" component={AboutUs} />
						    	<Redirect to="/home" />
						    </Switch>
					    </CSSTransition>
				    </TransitionGroup>
					<Footer />
				</React.Fragment>
		);
	}
}

export default withRouter(connect(mapStatetoProps,mapDispatchToProps)(Main));