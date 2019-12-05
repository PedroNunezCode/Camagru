import React, { Component } from 'react';

class FormField extends Component {

    state = {
        newLabelValue: '',
        newClassName: '',
    }

    renderCorrectTitles = (labelValue, inputValue, className) => {
        if (inputValue === '' && this.state.newLabelValue === '')
            this.setState({ newLabelValue: `*${labelValue}`, newClassName: 'required-value' });
        else if (this.state.newLabelValue !== labelValue && inputValue !== '') {
            this.setState({ newLabelValue: labelValue, newClassName: className });
        }
    }

    componentDidMount() {
        const { labelValue, value, className } = this.props;
        this.renderCorrectTitles(labelValue, value, className)
    }
    componentDidUpdate() {
        const { labelValue, value, className } = this.props;
        this.renderCorrectTitles(labelValue, value, className)
    }

    render() {
        const { htmlFor, onChange, type, id,
            value, placeholder, name, inputClass
        } = this.props;

        const { newClassName, newLabelValue } = this.state;

        return (
            <div className="form-field">

                <label className={newClassName} htmlFor={htmlFor}>{newLabelValue}</label>
                <input onChange={onChange} type={type} id={id}
                    className={inputClass} name={name} placeholder={placeholder} value={value} required></input>
            </div>
        );
    }
}

export default FormField;