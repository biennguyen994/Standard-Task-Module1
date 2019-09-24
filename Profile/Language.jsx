import React from 'react';
import Cookies from 'js-cookie';
import { Icon } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            showUpdateSection: false,
            lid: null,
            newLanguage: {
                id: null,
                name: null,
                level: null
            }
        }
       
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.saveLanguage = this.saveLanguage.bind(this);
        
        this.openUpdate = this.openUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };


    //add language
    openEdit() {
        let newId = this.state.newLanguage.id;
        this.setState({
            newLanguage: {
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

    saveLanguage() {     
        const language = this.state.newLanguage;
        if (language.name == '' || language.level == '') {
            TalentUtil.notification.show("Please enter language and level", "error", null, null)
            this.closeEdit();
        }
        else {
            const data = this.props.languageData;
            data.push(language);
            this.props.updateProfileData(data);
            this.closeEdit();          
        }
    }

    //update language 
    openUpdate(languageDetails) {
        this.setState({
            lid: languageDetails.id,
            newLanguage: languageDetails,
            showUpdateSection: true
        })
    }

    closeUpdate() {
        this.setState({
            showUpdateSection: false
        })
    }

    saveUpdate(newLanguageDetails) {
        if (newLanguageDetails.name == '' || newLanguageDetails.level == '') {
            TalentUtil.notification.show("Please enter language and level", "error", null, null)
            this.closeEdit();
        } else {
            const data = this.props.languageData;
            const index = data.findIndex(x => x.id === newLanguageDetails.id);
            data[index] = newLanguageDetails
            this.props.updateProfileData(data);
            this.closeUpdate();
        }
             
    }

    //handle change 
    handleChange(e) {
        let data = Object.assign({}, this.state.newLanguage);
        data[e.target.name] = e.target.value;
        this.setState({
            newLanguage: data
        })

    }

    //Delete
    handleDelete(id) {
        const data = this.props.languageData;
        let index = data.findIndex(x => x.id === id);
        data.splice(index, 1);
        this.props.updateProfileData(data);
    }

    renderDisplay() {
        let languagesList = this.props.languageData;
        let languagesTable = null;
        if (languagesList != null) {
            languagesTable = languagesList.map(x =>
                <LanguageData key={x.id}
                    openUpdate={this.openUpdate}
                    showUpdateSection={this.state.showUpdateSection}
                    closeUpdate={this.closeUpdate}
                    language={x}
                    id={this.state.lid}
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
                            <th className="ui six wide">Language</th>
                            <th className="ui six wide">Level</th>
                            <th><button type="button" color='black' className="ui right floated teal button" onClick={this.openEdit} >
                                <Icon name="plus" />Add New</button>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {languagesTable}
                    </tbody>
                </table>
            </div>
        )
    }

    renderEdit() {
        let languageDetails = this.state.newLanguage;
        return (
            <div className='ui grid'>
                <div className="ui five wide column">
                    <input
                        name="name"
                        onChange={this.handleChange}
                        maxLength={20}
                        placeholder="Add Language"
                        value={languageDetails.name}
                    />
                </div>
                <div className="ui five wide column">
                    <select className="ui right labeled dropdown"
                        onChange={this.handleChange}
                        value={languageDetails.level}
                        name="level">
                        <option value="">Language Level</option>
                        <option key="Basic" value="Basic">Basic</option>
                        <option key="Conversational" value="Conversational">Conversational</option>
                        <option key="Fluent" value="Fluent">Fluent</option>
                        <option key="Native/Bilingual" value="Native/Bilingual">Native/Bilingual</option>
                    </select>
                </div>
                <div className="ui six wide column">
                    <button type="button" className="ui teal button" onClick={this.saveLanguage}>Add</button>
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


class LanguageData extends React.Component {
    constructor(props) {
        super(props);
        let newLanguageDetails = Object.assign({}, this.props.language);
        this.state = {
            newLanguageDetails: newLanguageDetails
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let data = this.state.newLanguageDetails;
        data[e.target.name] = e.target.value;
        this.setState({
            newLanguageDetails: data
        })
    }

    render() {
        let languageDetails = this.props.language;
        let languageId = this.props.id;
        return (
            this.props.showUpdateSection && languageDetails.id === languageId ?
                <tr>
                    <td className="ui five wide column">
                        <input value={this.state.newLanguageDetails.name}
                            onChange={this.handleChange}
                            name="name"
                        />
                    </td>
                    <td className="ui five wide column">
                        <select className="ui right labeled dropdown"
                            onChange={this.handleChange}
                            value={this.state.newLanguageDetails.level}
                            name="level">
                            <option value="">Language Level</option>
                            <option key="Basic" value="Basic">Basic</option>
                            <option key="Conversational" value="Conversational">Conversational</option>
                            <option key="Fluent" value="Fluent">Fluent</option>
                            <option key="Native/Bilingual" value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </td>
                    <td className="ui six wide column">
                        <button className="ui basic blue button" onClick={() => this.props.saveUpdate(this.state.newLanguageDetails)}>Update</button>
                        <button className="ui basic red button" onClick={this.props.closeUpdate}>Cancel</button>
                    </td>
                </tr>
                :
                <tr>
                    <td>{languageDetails.name}</td>
                    <td>{languageDetails.level}</td>
                    <td className="right aligned">
                        <i className="pencil alternate icon" onClick={() => this.props.openUpdate(languageDetails)}/>
                        <i className="close icon" onClick={() => this.props.handleDelete(languageDetails.id)}/>
                    </td>
                </tr>
        )
    }
}
