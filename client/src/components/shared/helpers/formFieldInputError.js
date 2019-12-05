import React, { Component } from 'react';

class FormFieldInputError extends Component {
    render() {
        const { message } = this.props;
        return (
            <div style={{ width: '30vw', marginTop: '20px' }} className='alert alert-danger'>
                <p>{message}</p>
            </div>
        );
    }
}

export default FormFieldInputError;