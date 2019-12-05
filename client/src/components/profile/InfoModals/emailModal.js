import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeAccountInformation } from '../../../actions/authActions';
import FormField from '../../shared/helpers/formField';
import RenderErrors from '../../shared/helpers/renderErrors';


function EmailModal(props) {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');

    const submitEmailChange = e => {
        e.preventDefault();
        const data = {
            emailChange: {
                email: email,
                userId: authState.userId
            }
        }
        dispatch(changeAccountInformation(data))
            .then((res) => {
                if (res === 200) {
                    setEmail('');
                    return props.onHide()
                }
            });
    };

    const changeEmail = e => {
        setEmail(e.target.value);
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
                <p style={{ color: 'black' }}>Email change will be permanent.</p>
                <form onSubmit={submitEmailChange}>
                    <FormField onChange={changeEmail} className="form-field-label" htmlFor="email"
                        labelValue="Enter New Email Address" inputClass="account-form-field-input" placeholder="Enter New Email Address"
                        name="email" value={email} type="email" />
                    <button className="btn btn-danger" type="submit">Change Email Address</button>
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

export default EmailModal;