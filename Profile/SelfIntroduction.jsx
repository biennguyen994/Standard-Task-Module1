/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.saveDescription = this.saveDescription.bind(this);

    };

    handleChange(event) {
        let data = {}
        data[event.target.name] = event.target.value;
        this.props.updateWithoutSave(data)
    }

    saveDescription() {
        let data = {}
        data.summary = this.props.summary;
        data.description = this.props.description;
        this.props.updateProfileData(data);
    }

    render() {
        return (          
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    name="summary"
                    value={this.props.summary}
                    controlFunc={this.handleChange}
                    maxLength={150}
                    placeholder="Please provide a short summary about yourself"
                    errorMessage="Please  provide valid text."
                />
                <p>Summary must be no more than 150 characters</p>
                <textarea
                    name="description"
                    value={this.props.description}
                    onChange={this.handleChange}
                    minLength={150}
                    maxLength={600}
                    placeholder="Please tell us about any hobbies, additional expertise, or anything else you'd like to add."
                />
                <p>Description must be between 150-600 characters</p>
                <button type="button" className="ui right floated teal button" onClick={this.saveDescription}>Save</button>
            </div>
        )
    }
}