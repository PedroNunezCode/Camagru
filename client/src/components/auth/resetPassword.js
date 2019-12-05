import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { resetPassword } from '../../actions/authActions';
import FormField from '../shared/helpers/formField';
import RenderErrors from '../shared/helpers/renderErrors';
import FormFieldInputError from '../shared/helpers/formFieldInputError';

class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            password: '',
            passwordV: '',
        }
    }

    changeStateFromField = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    resetPassword = (event) => {
        event.preventDefault();

        const { token, username } = this.props.match.params;
        const { password } = this.state;

        const data = {
            username,
            token,
            password
        }

        this.props.dispatch(resetPassword(data));
    }

    checkAuthState = () => {
        const { isAuth } = this.props.auth;
        if (isAuth)
            return <Redirect to={{
                pathname: '/',
                state: { passwordChange: true }
            }} />
    }

    render() {
        const { errors } = this.props.auth;
        const { password, passwordV } = this.state;
        return (
            <div style={{ marginTop: '20vh' }}>
                <div className="container">
                    {this.checkAuthState()}
                    <div className="text-center" style={{ paddingTop: '20px' }}>
                        <h3><i style={{ color: 'red' }} className="fa fa-lock fa-5x lock-icon-color" /></h3>
                        <h2 className="text-center">Reset Password</h2>
                        <p>Enter New Password Below</p>
                        <div style={{ paddingTop: '20px' }} align="center">
                            <form onSubmit={this.resetPassword}>
                                <FormField className="form-field-label" htmlFor="password" labelValue="Enter New Password" onChange={this.changeStateFromField}
                                    inputClass="form-field-input" placeholder="Enter New Password" type="password" name="password" value={password} />
                                <FormField className="form-field-label" htmlFor="passwordV" labelValue="Confirm New Password" onChange={this.changeStateFromField}
                                    inputClass="form-field-input" placeholder="Confirm New Password" type="password" name="passwordV" value={passwordV} />
                                <button disabled={password !== passwordV || password === '' || passwordV === ''} className="btn btn-danger" style={{ marginTop: '10px', backgroundColor: '#FF0000' }} type="submit">Reset Password</button>
                            </form>
                            {errors.length > 0 && <RenderErrors errors={errors} />}
                            {password !== passwordV &&
                                <FormFieldInputError message="Passwords don't match!" />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(ResetPassword);