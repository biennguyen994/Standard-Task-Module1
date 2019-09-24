/* Skill section*/
import React from 'react';
import Cookies from 'js-cookie';
import { Icon } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            showUpdateSection: false,
            sid: null,
            newSkill: {
                id: null,
                name: null,
                level: null
            }
        }

        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveSkill = this.saveSkill.bind(this);

        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };


    //add skill
    openEdit() {
        let newId = this.state.newSkill.id;
        this.setState({
            newSkill: {
                id: newId + 1,
                name: "",
                level: ""
            },
            showEditSection: true
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveSkill() {
        const skill = this.state.newSkill;
        if (skill.name == '' || skill.level == '') {
            TalentUtil.notification.show("Please enter skill and level", "error", null, null)
            this.closeEdit();
        } else {
            const data = this.props.skillData;
            data.push(skill);
            this.props.updateProfileData(data);
            this.closeEdit();
        }
       
    }

    //update skill 
    openUpdate(skillDetails) {
        this.setState({
            sid: skillDetails.id,
            newSkill: skillDetails,
            showUpdateSection: true
        })
    }

    closeUpdate() {
        this.setState({
            showUpdateSection: false
        })
    }

    saveUpdate(newSkillDetails) {
        if (newSkillDetails.name == '' || newSkillDetails.level == '') {
            TalentUtil.notification.show("Please enter skill and level", "error", null, null)
            this.closeEdit();
        }
        else {
            const data = this.props.skillData;
            const index = data.findIndex(x => x.id === newSkillDetails.id);
            data[index] = newSkillDetails
            this.props.updateProfileData(data);
            this.closeUpdate();
        }
    }

    //handle change 
    handleChange(e) {
        let data = Object.assign({}, this.state.newSkill);
        data[e.target.name] = e.target.value;
        this.setState({
            newSkill: data
        })

    }

    //Delete
    handleDelete(id) {
        const data = this.props.skillData;
        let index = data.findIndex(x => x.id === id);
        data.splice(index, 1);
        this.props.updateProfileData(data);
    }

    renderDisplay() {
        let skillsList = this.props.skillData;
        let skillsTable = null;
        if (skillsList != null) {
            skillsTable = skillsList.map(x =>
                <SkillData key={x.id}
                    openUpdate={this.openUpdate}
                    showUpdateSection={this.state.showUpdateSection}
                    closeUpdate={this.closeUpdate}
                    skill={x}
                    id={this.state.sid}
                    handleChange={this.handleChange}
                    saveUpdate={this.saveUpdate}
                    handleDelete={this.handleDelete}
                />
            )
        }
        return (
            <div className='ui sixteen wide column'>
                <table className="ui stripped table">
                    <thead>
                        <tr>
                            <th className="ui six wide">Skill</th>
                            <th className="ui six wide">Level</th>
                            <th><button type="button" color='black' className="ui right floated teal button" onClick={this.openEdit} >
                                <Icon name="plus" />Add New</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {skillsTable}
                    </tbody>
                </table>
            </div>
        )
    }

    renderEdit() {
        let skillDetails = this.state.newSkill;
        return (
            <div className='ui grid'>
                <div className="ui five wide column">
                    <input
                        name="name"
                        onChange={this.handleChange}
                        maxLength={20}
                        placeholder="Add Skill"
                        value={skillDetails.name}
                    />
                </div>
                <div className="ui five wide column">
                    <select className="ui right labeled dropdown"
                        onChange={this.handleChange}
                        value={skillDetails.level}
                        name="level">
                        <option value="">Skill Level</option>
                        <option key="Beginner" value="Beginner">Beginner</option>
                        <option key="Intermediate" value="Intermediate">Intermediate</option>
                        <option key="Expert" value="Expert">Expert</option>
                    </select>
                </div>
                <div className="ui six wide column">
                    <button type="button" className="ui teal button" onClick={this.saveSkill}>Add</button>
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

class SkillData extends React.Component {
    constructor(props) {
        super(props);
        let newSkillDetails = Object.assign({}, this.props.skill);
        this.state = {
            newSkillDetails: newSkillDetails
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let data = this.state.newSkillDetails;
        data[e.target.name] = e.target.value;
        this.setState({
            newSkillDetails: data
        })
    }

    render() {
        let skillDetails = this.props.skill;
        let skillId = this.props.id;
        return (
            this.props.showUpdateSection && skillDetails.id == skillId ?
                <tr>
                    <td className="ui five wide column">
                        <input
                            value={this.state.newSkillDetails.name}
                            onChange={this.handleChange}
                            name="name"
                        />
                    </td>
                    <td className="ui five wide column">
                        <select className="ui right labeled dropdown"
                            onChange={this.handleChange}
                            value={this.state.newSkillDetails.level}
                            name="level">
                            <option value="">Skill Level</option>
                            <option key="Beginner" value="Beginner">Beginner</option>
                            <option key="Intermediate" value="Intermediate">Intermediate</option>
                            <option key="Expert" value="Expert">Expert</option>
                        </select>
                    </td>
                    <td className="ui six wide column">
                        <button className="ui basic blue button" onClick={() => this.props.saveUpdate(this.state.newSkillDetails)}>Update</button>
                        <button className="ui basic red button" onClick={this.props.closeUpdate}>Cancel</button>
                    </td>
                </tr>
                :
                <tr>
                    <td>{skillDetails.name}</td>
                    <td>{skillDetails.level}</td>
                    <td className="right aligned">
                        <i className="pencil alternate icon" onClick={() => this.props.openUpdate(skillDetails)} />
                        <i className="close icon" onClick={() => this.props.handleDelete(skillDetails.id)} />
                    </td>
                </tr>
        )
    }
}
