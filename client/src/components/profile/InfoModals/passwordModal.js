import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeAccountInformation } from '../../../actions/authActions';
import FormField from '../../shared/helpers/formField';
import RenderErrors from '../../shared/helpers/renderErrors';


function PasswordModal(props) {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState('');
    const [passwordV, setPasswordV] = React.useState('');

    const submitPasswordChange = e => {
        e.preventDefault();
        const data = {
            passwordChange: {
                password: password,
                userId: authState.userId
            }
        }
        dispatch(changeAccountInformation(data))
            .then((res) => {
                if (res === 200) {
                    setPassword('');
                    setPasswordV('');
                    return props.onHide()
                }
            });
    };

    const changePassword = e => {
        setPassword(e.target.value);
    }

    const changePasswordV = e => {
        setPasswordV(e.target.value);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p style={{ color: 'black' }}>Password change will be permanent.</p>
                <form onSubmit={submitPasswordChange}>
                    <FormField onChange={changePassword} className="form-field-label" htmlFor="password"
                        labelValue="Enter New Password" inputClass="account-form-field-input" placeholder="Enter New Password"
                        name="password" value={password} type="password" />
                    <FormField onChange={changePasswordV} className="form-field-label" htmlFor="passwordV"
                        labelValue="Confirm New Password" inputClass="account-form-field-input" placeholder="Confirm New Password"
                        name="passwordV" value={passwordV} type="password" />
                    {password !== passwordV &&
                        <p style={{ color: 'red' }}>Passwords don't match.</p>
                    }
                    <button className="btn btn-danger" type="submit" disabled={password !== passwordV || password === '' || passwordV === ''}>Change Password</button>
                    {authState.errors.length > 0 &&
                        <RenderErrors errors={authState.errors} />
                    }
                </form>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PasswordModal;