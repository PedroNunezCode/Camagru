import React, { Component } from 'react';
import { Provider, } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/shared/header';
import Footer from './components/shared/footer';
import LandingPage from './components/landingPage';
import AboutSection from './components/shared/about/aboutSection';
import Login from './components/auth/login';
import ResetPassword from './components/auth/resetPassword';
import Register from './components/auth/register';
import ForgotPassword from './components/auth/forgotPassword';
import VerifyAccount from './components/auth/verifyAccount';
import CurrentProfile from './components/profile/currentProfile';
import AccountSettings from './components/profile/accountSettings';

import { checkAuthState } from './actions/authActions';
import { ProtectedRoute } from './components/auth/protectedRoute';

// Styles
import './styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserImages, getAllImages } from './actions/imageActions';

const store = require('./reducers').init();

class App extends Component {

	constructor(props){
		super();

		this.checkAuthState();
		this.getUserImages();
		this.getAllUserImages();
	}
	

	getAllUserImages(){
		store.dispatch(getAllImages());
	}

	checkAuthState() {
		store.dispatch(checkAuthState());

		if(store.getState().auth.isAuth){
			store.dispatch(getUserImages(store.getState().auth.imageStructId));
		}
	}

	getUserImages(){
		if(store.getState().auth.isAuth){
			store.dispatch(getUserImages(store.getState().auth.imageStructId));
		}
	}
	render() {
		return (
			<Provider store={store}>
				<div>
					<Router>
						<Header />
						<Route path='/' exact component={LandingPage} />
						<Route path='/about' exact component={AboutSection} />
						<Route path='/login' exact component={Login} />
						<Route path='/reset-password/:token/:username' exact component={ResetPassword}/>
						<Route path='/register' exact component={Register} />
						<Route path='/forgotpassword' exact component={ForgotPassword} />
						<Route path='/confirm-account/:token/:username' exact component={VerifyAccount} />
						<ProtectedRoute path='/upload' exact component={CurrentProfile} />
						<ProtectedRoute path='/account-settings' exact component={AccountSettings} />
						<Footer/>
					</Router>
				</div>
			</Provider>
		);
	}
}

export default App;
