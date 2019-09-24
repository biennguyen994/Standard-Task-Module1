import React from 'react';
import moment from 'moment';
import { SingleInput } from '../Form/SingleInput.jsx';
import DatePicker from 'react-datepicker';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.saveVisa = this.saveVisa.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        const data = {}
        data[name] = value
        this.props.saveProfileData(data)

    }

    handleDateChange(date) {
        this.props.updateProfileData({ "visaExpiryDate": date })
    }

    saveVisa() {
        let date = this.props.visaExpiryDate;
        this.props.saveProfileData({ "visaExpiryDate": date })
    }

    render() {
        const { visaStatus } = this.props;
        const visaExpiryDate = moment(this.props.visaExpiryDate);
        let visaDisplay = null;
        if (visaStatus === 'Work Visa' || visaStatus === 'Student Visa') {
            visaDisplay = <div className='ui nine wide column'>
                <div className='ui grid'>
                <div className="ui seven wide column">
                    <b> Visa expiry date:</b>
                    <br />
                    <DatePicker
                        selected={visaExpiryDate}
                        onChange={this.handleDateChange}
                        name="visaExpiryDate"
                    />
                </div>
                <div className="ui two wide column">
                    <br />
                    <button type="button" className="ui teal button" onClick={this.saveVisa}>Save</button>
                </div>
                </div>
            </div>
        }
        return (
            <div className="ui sixteen wide column">
                    <div className='ui grid'>
                        <div className='ui seven wide column'>
                            <label><b>Visa Type</b></label>
                            <select className="ui right labeled dropdown"
                                placeholder="Visa Status"
                                value={visaStatus}
                                onChange={this.handleChange}
                                name="visaStatus">
                                <option value="">Visa Status</option>
                                <option key="Citizen" value="Citizen">Citizen</option>
                                <option key="Permanent Resident" value="Permanent Resident">Permanent Resident</option>
                                <option key="Work Visa" value="Work Visa">Work Visa</option>
                                <option key="Student Visa" value="Student Visa">Student Visa</option>
                            </select>
                    </div>
                    {visaDisplay}
                </div>
            </div>
        )
    }
}