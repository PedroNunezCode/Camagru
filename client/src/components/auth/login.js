import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import FormField from '../shared/helpers/formField';
import RenderErrors from '../shared/helpers/renderErrors';


class Login extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.dispatch(login(this.state));
	}

	changeInputState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	checkAuthState = () => {
		const { isAuth } = this.props.auth;
		if (isAuth) {
			return <Redirect to='/' />
		}
	}

	checkRedirectState = () => {
		if (this.props.location.state && this.props.location.state.successfullRegister) {
			return (
				<div style={{ width: '39vw', marginTop: '25px' }} className='alert alert-success'>
					<p>You have successfully registered! Please verify your account. We sent you an email.</p>
				</div>
			)
		} else if (this.props.location.state && this.props.location.state.reason) {
			return (
				<div style={{ width: '30vw' }} className='alert alert-danger'>
					<p>{this.props.location.state.reason}</p>
				</div>
			)
		}
	}

	render() {
		const { username, password } = this.state;
		const { errors } = this.props.auth;
		return (
			<div align="center" className="container">
				{this.checkAuthState()}
				<div className="Register-form">
					<div className="form-title">
						<Link style={{ textDecoration: 'none', color: 'black' }} to="/login" className="form-title-link form-title-link-active">Sign In </Link>
						or <Link style={{ textDecoration: 'none', color: 'black' }} to='/register' className="form-title-link">Sign Up</Link>
					</div>
					<div className="form-center">
						<form className="form-field" onSubmit={this.handleSubmit}>
							<FormField className="form-field-label" htmlFor="username" labelValue="Enter Username" onChange={this.changeInputState}
								inputClass="form-field-input" placeholder="Enter Your Username" name="username" value={username} />
							<FormField className="form-field-label" htmlFor="password" labelValue="Enter Password" onChange={this.changeInputState}
								inputClass="form-field-input" type="password" placeholder="Enter Your Password" name="password" value={password} />
							<div className="form-field">
								<button type="submit" className="form-field-button" disabled={!username || !password}>Login</button>
								<Link to="/register" className="form-field-link">Create an account</Link>
							</div>
							<div align="center">
								<Link style={{ color: 'black' }} to='/forgotpassword'>Forgot Password?</Link>
							</div>
							<div style={{marginTop: '15px'}}>
								<RenderErrors errors={errors} />
							</div>
							{this.checkRedirectState()}
						</form>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Login);