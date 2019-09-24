import React from 'react';
import Cookies from 'js-cookie';
import { Icon } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            showUpdateSection: false,
            eid: null,
            newExperience: {
                id: null,
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            },
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveExperience = this.saveExperience.bind(this);

        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    };


    openEdit() {
        let newId = this.state.newExperience.id;
        this.setState({
            newExperience: {
                id: newId + 1,
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            },
            showEditSection: true
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveExperience() {
        const exp = this.state.newExperience;
        if (exp.company == '' || exp.position == '' || exp.responsibilities == '') {
            TalentUtil.notification.show("Please fill out all the required fields", "error", null, null)
            this.closeEdit();
        }
        else {
            const data = this.props.experienceData;
            data.push(exp);
            this.props.updateProfileData(data);
            this.closeEdit();
        }

    }


    openUpdate(expDetails) {
        expDetails.start = moment(expDetails.start)
        expDetails.end = moment(expDetails.end)
        this.setState({
            eid: expDetails.id,
            newExperience: expDetails,
            showUpdateSection: true
        })
    }

    closeUpdate() {
        this.setState({
            showUpdateSection: false
        })
    }

    saveUpdate(newExpDetails) {
        if (newExpDetails.company == '' || newExpDetails.position == '' || newExpDetails.responsibilities == '') {
            TalentUtil.notification.show("Please fill out all the required fields", "error", null, null)
            this.closeEdit();
        } else {
            const data = this.props.experienceData;
            const index = data.findIndex(x => x.id === newExpDetails.id);
            data[index] = newExpDetails
            this.props.updateProfileData(data);
            this.closeUpdate();
        }
    }

    //handle change 
    handleDateChange(date, name) {
        let data = Object.assign({}, this.state.newExperience);
        data[name] = date;
        this.setState({
            newExperience: data
        })
    }

    handleChange() {
        let data = Object.assign({}, this.state.newExperience);
        data[event.target.name] = event.target.value;
        this.setState({
            newExperience: data
        })
    }

    //Delete
    handleDelete(id) {
        const data = this.props.experienceData;
        let index = data.findIndex(x => x.id === id);
        data.splice(index, 1);
        this.props.updateProfileData(data);
    }

    renderDisplay() {
        let expList = this.props.experienceData;
        expList.start = moment(expList.start)
        expList.end = moment(expList.end)
        let expTable = null;
        if (expList != null) {
            expTable = expList.map(x =>
                <ExperienceData key={x.id}
                    openUpdate={this.openUpdate}
                    showUpdateSection={this.state.showUpdateSection}
                    closeUpdate={this.closeUpdate}
                    experience={x}
                    id={this.state.eid}
                    handleChange={this.handleChange}
                    saveUpdate={this.saveUpdate}
                    handleDelete={this.handleDelete}
                    handleDateChange={this.handleDateChange}
                />
            )
        }
        return (
            <div className='ui sixteen wide column'>
                <table className="ui stripped table">
                    <thead>
                        <tr>
                            <th className='ui two wide column'>Company</th>
                            <th className='ui two wide column'>Position</th>
                            <th className='ui two wide column'>Start Date</th>
                            <th className='ui two wide column'>End Date</th>
                            <th className='ui five wide column'>Responsibilities</th>
                            <th><button type="button" color='black' className="ui right floated teal button" onClick={this.openEdit} >
                                <Icon name="plus" />Add New</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {expTable}
                    </tbody>
                </table>
            </div>
        )
    }

    renderEdit() {
        let experience = this.state.newExperience;
        return (
            <div className='ui grid'>
                <div className='eight wide column'>
                    <div className="field">
                        <label>Company</label>
                        <input
                            type="text"
                            name="company"
                            value={experience.company}
                            onChange={this.handleChange}
                            maxLength={50}
                            placeholder="Company"
                        />
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className="field">
                        <label>Position</label>
                        <input
                            type="text"
                            name="position"
                            value={experience.position}
                            onChange={this.handleChange}
                            maxLength={50}
                            placeholder="Position"
                        />
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className='field'>
                        <label>Start Date:</label>
                        <DatePicker
                            selected={experience.start}
                            onChange={(date) => this.handleDateChange(date, "start")}
                            placeholder={moment()}
                        />
                    </div>
                </div>
                <div className='eight wide column'>
                    <div className='field'>
                        <label>End Date:</label>
                        <DatePicker
                            selected={experience.end}
                            onChange={(date) => this.handleDateChange(date, "end")}
                            placeholder={moment()}
                        />
                    </div>
                </div>
                <div className='sixteen wide column'>
                    <div className="field">
                        <label>Responsibilities</label>
                        <input
                            type="text"
                            name="responsibilities"
                            value={experience.responsibilities}
                            onChange={this.handleChange}
                            maxLength={200}
                            placeholder="Responsibilities"
                        />
                    </div>
                </div>
                <div className="ui six wide column">
                    <button type="button" className="ui teal button" onClick={this.saveExperience}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
                {this.renderDisplay()}
            </div>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}


class ExperienceData extends React.Component {
    constructor(props) {
        super(props);
        const experience = Object.assign({}, props.experience);
        this.state = {
            newExperience: experience
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date, name) {
        let data = this.state.newExperience;
        data[name] = date;
        this.setState({
            newExperience: data
        })
    }

    handleChange() {
        let data = this.state.newExperience;
        data[event.target.name] = event.target.value;
        this.setState({
            newExperience: data
        })
    }

    render() {
        let experience = this.props.experience;
        let startDate = moment(experience.start).format("Do MMM, YYYY");
        let endDate = moment(experience.end).format("Do MMM, YYYY");
        let expId = this.props.id;
        return (
            this.props.showUpdateSection && experience.id === expId ?
                <tr>
                    <th colspan="16">
                        <td>
                            <div className='ui grid'>
                                <div className='eight wide column'>
                                    <div className="field">
                                        <label>Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={this.state.newExperience.company}
                                            onChange={this.handleChange}
                                            maxLength={50}
                                            placeholder="Company"
                                        />
                                    </div>
                                </div>
                                <div className='eight wide column'>
                                    <div className="field">
                                        <label>Position</label>
                                        <input
                                            type="text"
                                            name="position"
                                            value={this.state.newExperience.position}
                                            onChange={this.handleChange}
                                            maxLength={50}
                                            placeholder="Position"
                                        />
                                    </div>
                                </div>
                                <div className='eight wide column'>
                                    <div className='field'>
                                        <label>Start Date:</label>
                                        <DatePicker
                                            selected={moment(this.state.newExperience.start)}
                                            onChange={(date) => this.handleDateChange(date, "start")}
                                            placeholder={moment()}
                                        />
                                    </div>
                                </div>
                                <div className='eight wide column'>
                                    <div className='field'>
                                        <label>End Date:</label>
                                        <DatePicker
                                            selected={moment(this.state.newExperience.end)}
                                            onChange={(date) => this.handleDateChange(date, "end")}
                                            placeholder={moment()}
                                        />
                                    </div>
                                </div>
                                <div className='sixteen wide column'>
                                    <div className="field">
                                        <label>Responsibilities</label>
                                        <input
                                            type="text"
                                            name="responsibilities"
                                            value={this.state.newExperience.responsibilities}
                                            onChange={this.handleChange}
                                            maxLength={200}
                                            placeholder="Responsibilities"
                                        />
                                    </div>
                                </div>
                                <div className="ui six wide column">
                                    <button className="ui teal button" onClick={() => this.props.saveUpdate(this.state.newExperience)}>Update</button>
                                    <button className="ui button" onClick={this.props.closeUpdate}>Cancel</button>
                                    <br />
                                </div>
                            </div>
                        </td>
                    </th>
                </tr>
                :
                <tr>
                    <td className='ui two wide column'>{experience.company}</td>
                    <td className='ui two wide column'>{experience.position}</td>
                    <td className='ui two wide column'>{startDate}</td>
                    <td className='ui two wide column'>{endDate}</td>
                    <td className='ui five wide column'>{experience.responsibilities}</td>
                    <td className="right aligned">
                        <i className="pencil alternate icon" onClick={() => this.props.openUpdate(experience)} />
                        <i className="close icon" onClick={() => this.props.handleDelete(experience.id)} />
                    </td>
                </tr>
        )
    }
}
