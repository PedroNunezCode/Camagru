import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/authActions';
import FormField from '../shared/helpers/formField';
import RenderErrors from '../shared/helpers/renderErrors';
// import DisplayResponse from './shared/displayResponse';

class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            password: '',
            passwordV: '',
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(register(this.state));
    }

    changeInputState = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        const { username, email, password, passwordV } = this.state;
        const { errors, successfullRegister } = this.props.auth;

        return (
            <div style={{ paddingBottom: '70px' }} align="center" className="container">
                <div>
                    {successfullRegister &&
                        <Redirect to={{
                            pathname: '/login',
                            state: { successfullRegister: true }
                        }} />
                    }
                </div>
                <div className="Register-form">
                    <div className="page-switcher">
                    </div>
                    <div className="form-title">
                        <Link style={{ textDecoration: 'none', color: 'black' }} to="/login" className="form-title-link">Sign In </Link> or <Link style={{ textDecoration: 'none', color: 'black' }} to="/register" className="form-title-link form-title-link-active">Sign Up</Link>
                    </div>
                    <div className="form-center">
                        <form className="form-field" onSubmit={this.handleSubmit}>
                            <FormField className="form-field-label" htmlFor="username" labelValue="Enter Username" onChange={this.changeInputState}
                                inputClass="form-field-input" placeholder="Pick Your Username" name="username" value={username} />
                            <FormField className="form-field-label" htmlFor="email" labelValue="Enter Valid Email" onChange={this.changeInputState}
                                inputClass="form-field-input" placeholder="Enter Valid Email Address" name="email" value={email} type="email" />
                            <FormField className="form-field-label" htmlFor="password" labelValue="Enter Password" onChange={this.changeInputState}
                                inputClass="form-field-input" placeholder="Enter Password" name="password" type="password" value={password} />
                            <FormField className="form-field-label" htmlFor="passwordV" labelValue="Confirm Password" onChange={this.changeInputState}
                                inputClass="form-field-input" placeholder="Enter Password" name="passwordV" type="password" value={passwordV} />
                            <RenderErrors errors={errors} />
                            <div className="form-field">
                                <button type="submit" className="form-field-button" disabled={!username || !email || !password || !passwordV}>Sign Up</button>
                                <Link style={{ textDecoration: 'none' }} to="/login" className="form-field-link">I'm already a member</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps)(Register);