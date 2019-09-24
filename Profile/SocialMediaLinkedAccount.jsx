/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';
export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);
        const linkedAccounts = props.linkedAccounts;

        this.state = {
            showEditSection: false,
            newLinks: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLinks = this.saveLinks.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
       
    }
    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }
    openEdit() {
        const linkedAccounts = this.props.linkedAccounts
        this.setState({
            showEditSection: true,
            newLinks: linkedAccounts
        })
    }
    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }
    handleChange(event) {
        const data = this.state.newLinks
        data[event.target.name] = event.target.value
        this.setState({
            newLinks: data
        })
    }
    saveLinks() {
        const data = this.state.newLinks
        this.props.saveProfileData({ "linkedAccounts":data })
        this.closeEdit()
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newLinks.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={100}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid LinkedIn Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newLinks.github}
                    controlFunc={this.handleChange}
                    maxLength={100}
                    placeholder="Enter your GitHub Url"
                    errorMessage="Please enter a GitHub valid Url"
                />
                <button type="button" className="ui black button" onClick={this.saveLinks} >Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit} > Cancel</button>
            </div>
        )
    }
    renderDisplay() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui sixteen wide column">
                        <Button color='linkedin' className="ui blue button" href={this.props.linkedAccounts.linkedIn} target="_blank">
                            <Icon name='linkedin' /> LinkedIn
                    </Button>
                        <Button color='black' className="ui black button" href={this.props.linkedAccounts.github} target="_blank">
                            <Icon name='github' /> GitHub
                    </Button>
                        <Button color='black' className="ui right floated black button" onClick={this.openEdit}>
                            Edit
                    </Button>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
}