import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendPasswordReset } from '../../actions/authActions';
import FormField from '../shared/helpers/formField';
import RenderErrors from '../shared/helpers/renderErrors';
import SuccessMessage from '../shared/helpers/renderSuccessMessage';

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
        }
    }

    changeStateFromField = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    resetPassword = (event) => {
        event.preventDefault();

        const username = {
            username: this.state.username
        }
        this.props.dispatch(sendPasswordReset(username));
    }

    render() {
        const { passwordResetEmailSent, errors } = this.props.auth;
        const { username } = this.state;
        return (
            <div style={{ marginTop: '20vh' }}>
                <div className="container">
                    <div className="text-center" style={{ paddingTop: '20px' }}>
                        <h3><i style={{ color: 'red' }} className="fa fa-lock fa-5x lock-icon-color" /></h3>
                        <h2 className="text-center">Forgot Password?</h2>
                        <p>Please provide your username:</p>
                        <div style={{ paddingTop: '20px' }} align="center">
                            <form onSubmit={this.resetPassword}>
                                <FormField className="form-field-label" htmlFor="username" labelValue="Enter Username" onChange={this.changeStateFromField}
                                    inputClass="form-field-input" placeholder="Enter Your Username" type="text" name="username" value={username} />
                                <button className="btn btn-danger" style={{ marginTop: '10px', backgroundColor: '#FF0000' }} type="submit">Send Email</button>
                            </form>
                            {errors.length > 0 && <RenderErrors errors={errors} />}
                            {passwordResetEmailSent &&
                                <SuccessMessage message="We have sent you an email. Follow the instructions to reset your password" />
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

export default connect(mapStateToProps)(ForgotPassword);