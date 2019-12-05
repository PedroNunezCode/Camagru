import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyAccount } from '../../actions/authActions';
import RenderErrors from '../shared/helpers/renderErrors';

class VerifyAccount extends Component {

    verifyAccountInformation = () => {
        const { username, token } = this.props.match.params;
        const data = { username: username, token: token };

        this.props.dispatch(verifyAccount(data));
    }

    componentDidMount() {
        this.verifyAccountInformation();
    }

    verifiedAccount = () => {
        return <Redirect to={{ pathname: '/profile', state: { reason: 'Successfully verified account' } }} />
    }

    render() {
        const { verifiedAccount, errors } = this.props.auth;
        return (
            <div>
                {verifiedAccount && this.verifiedAccount()}
                {errors.length > 0 &&
                    <div align="center" style={{marginTop: '15vh'}}>
                        <RenderErrors errors={errors}/>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(VerifyAccount);