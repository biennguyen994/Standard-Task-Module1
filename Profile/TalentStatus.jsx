import React from 'react'
import moment from 'moment';
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';


export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobSeekingStatus: {
                status: "",
                availableDate: null
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.jobSeekingStatus)
        data.status = event.target.value
        this.props.saveProfileData({ 'jobSeekingStatus': data })
    }

    render() {
        let status = "";
        if (this.props.status) {
            status = this.props.status.status;
        };
        return (
            <div className="ui grid">
                <div className="ui sixteen wide column">
                    <div className="field">
                        <h4><b>Current Status</b></h4>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Actively looking for a job"
                                checked={status == "Actively looking for a job"}
                            />
                            <label>Actively looking for a job</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Not looking for a job at the moment"
                                checked={status == "Not looking for a job at the moment"}
                            />
                            <label>Not looking for a job at the moment</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Currently employed but open for the offers"
                                checked={status == "Currently employed but open for the offers"}
                            />
                            <label>Currently employed but open for the offers</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Will be available on later date"
                                checked={status == "Will be available on later date"}
                            />
                            <label>Will be available on later date</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 
/*import React from 'react'
import moment from 'moment';
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jobSeekingStatus: {
                status: "",
                availableDate: null
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this)
        this.saveDate = this.saveDate.bind(this)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.jobSeekingStatus)
        data.status = event.target.value
        if (data.status === 'Will be available on later date') {
            this.props.updateProfileData({ 'jobSeekingStatus': data })
        }
        else {
            this.props.saveProfileData({ 'jobSeekingStatus': data })
        }

    }

    handleDateChange(date, name) {
        let data = Object.assign({}, this.state.jobSeekingStatus);
        data[name] = date;
        this.setState({
            jobSeekingStatus: data
        })
        data.status = this.props.status.status 
        this.props.updateProfileData({ 'jobSeekingStatus': data })

    }

    saveDate() {
        let data = this.state.jobSeekingStatus
        data.status = this.props.status.status
        this.props.saveProfileData({ "jobSeekingStatus": data })
    }

    render() {
        const newDate = this.props.status.availableDate ? moment(this.props.status.availableDate) : moment();
        let dateDisplay = null;
        if (this.props.status.status === 'Will be available on later date') {
            dateDisplay = <div className='ui sixteen wide column'>
                <div className='ui grid'>
                    <div className="ui middle aligned six wide column">
                        <br />
                        <label>Select your available date: </label>
                    </div>
                    <div className="ui seven wide column">
                        <br />
                        <DatePicker
                            selected={newDate}
                            onChange={(date) => this.handleDateChange(date, "availableDate")}
                            minDate={moment()}
                        />
                    </div>
                    <div className="ui two wide column">
                        <br />
                        <button type="button" className="ui teal button" onClick={this.saveDate}>Save</button>
                    </div>
                </div>
            </div>
        }
        return (
            <div className="ui grid">
                <div className="ui sixteen wide column">
                    <div className="field">
                        <h4><b>Current Status</b></h4>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Actively looking for a job"
                                checked={this.props.status.status == "Actively looking for a job"}
                            />
                            <label>Actively looking for a job</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Not looking for a job at the moment"
                                checked={this.props.status.status == "Not looking for a job at the moment"}
                            />
                            <label>Not looking for a job at the moment</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Currently employed but open for the offers"
                                checked={this.props.status.status == "Currently employed but open for the offers"}
                            />
                            <label>Currently employed but open for the offers</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input
                                type="radio"
                                name="status"
                                onChange={this.handleChange}
                                value="Will be available on later date"
                                checked={this.props.status.status == "Will be available on later date"}
                            />
                            <label>Will be available on later date</label>
                        </div>
                        {dateDisplay}
                    </div>
                </div>
            </div>
        )
    }
}*/