import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { connect, useSelector, useDispatch } from 'react-redux';
import UsernameModal from './InfoModals/usernameModal';
import EmailModal from './InfoModals/emailModal';
import PasswordModal from './InfoModals/passwordModal';
import RenderSucessMessage from '../shared/helpers/renderSuccessMessage';
import Switch from "react-switch";
import { changeEmailNotifications } from '../../actions/authActions';
import RenderErrors from '../shared/helpers/renderErrors';



function AccountSettings() {
    let authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [showUsernameModal, setUsernameModal] = useState(false);
    const [showEmailModal, setEmailModal] = useState(false);
    const [showPasswordModal, setPasswordModal] = useState(false);
    const [emailValue, setEmailValue] = useState(authState.emailNotifications);

    const handleEmailNotifications = (checked) => {
        setEmailValue(checked);
        const data = {
            notificationValue: checked,
            userId: authState.userId
        }
        dispatch(changeEmailNotifications(data));
    }

    return (
        <div className="container" align="center">
            {authState.passwordChange && <RenderSucessMessage message="Your information was successfully changed." />}

            <div className="account-setting-container" align="center">
                <h2>Edit Account Information</h2>
                <br></br>
                <h5>All Edits will be permanent.</h5>
                <div className="modal-buttons">
                    <Button variant="primary" onClick={() => { setUsernameModal(true) }}>
                        Change Username
                    </Button>
                    <Button variant="primary" onClick={() => { setEmailModal(true) }}>
                        Change Email
                    </Button>
                    <Button variant="primary" onClick={() => { setPasswordModal(true) }}>
                        Change Password
                    </Button>
                </div>
                <div className="email-notification-toggle">
                    <p>Email notifications when your images get new comments?</p>
                    <Switch onChange={handleEmailNotifications} checked={emailValue} onColor="#0000FF" />
                    {authState.notificationFailure && <RenderErrors errors={authState.errors}/>}
                </div>
            </div>
            <UsernameModal
                show={showUsernameModal}
                onHide={() => setUsernameModal(false)}
                title="Change Username"
            />
            <EmailModal
                show={showEmailModal}
                onHide={() => setEmailModal(false)}
                title="Change Email Address"
            />
            <PasswordModal
                show={showPasswordModal}
                onHide={() => setPasswordModal(false)}
                title="Change Password"
            />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(AccountSettings);