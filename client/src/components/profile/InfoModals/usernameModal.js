import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { changeAccountInformation } from '../../../actions/authActions';
import FormField from '../../shared/helpers/formField';
import RenderErrors from '../../shared/helpers/renderErrors';


function UsernameModal(props) {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [username, setUsername] = React.useState('');

    const submitEmailChange = e => {
        e.preventDefault();
        const data = {
            usernameChange: {
                username: username,
                userId: authState.userId
            }
        }
        dispatch(changeAccountInformation(data))
            .then((res) => {
                if (res === 200) {
                    setUsername('');
                    return props.onHide()
                }
            });
    };

    const changeUsername = e => {
        setUsername(e.target.value);
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
                <p style={{ color: 'black' }}>Username change will be permanent.</p>
                <p style={{ color: 'black' }}>Keep in mind this will be the new username you use to log in.</p>
                <form onSubmit={submitEmailChange}>
                    <FormField onChange={changeUsername} className="form-field-label" htmlFor="username"
                        labelValue="Enter New Username" inputClass="account-form-field-input" placeholder="Enter New Username"
                        name="username" value={username} type="text" />
                        {authState.username === username.toLowerCase() && 
                        <p style={{ color: 'red' }}>Usernames are the same. Please change it.</p>
                        }
                    <button className="btn btn-danger" type="submit" disabled={username === authState.username}>Change Username</button>
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

export default UsernameModal;