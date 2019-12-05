import React, { Component } from 'react';

class SuccessMessage extends Component {
    render() {
        const { message } = this.props;
        return (
            <div style={{ width: '30vw', marginTop: '20px' }} className='alert alert-success'>
                <p>{message}</p>
            </div>
        );
    }
}

export default SuccessMessage;