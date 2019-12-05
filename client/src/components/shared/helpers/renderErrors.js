import React, { Component } from 'react';

class renderErrors extends Component {

    renderErrors = (errors) => {
        if (errors.length > 0) {
            return errors.map((err, index) => {
                return (
                    <div key={index} style={{ width: '30vw', marginTop: '20px' }} className='alert alert-danger'>
                        <p>{err}</p>
                    </div>
                )

            });
        }
        return (<div></div>)
    }
    render() {
        const { errors } = this.props;
        return (
            this.renderErrors(errors)
        );
    }
}

export default renderErrors;