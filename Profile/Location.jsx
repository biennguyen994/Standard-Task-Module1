import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const addressData = this.props.addressData ?
            Object.assign({}, this.props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                city: "",
                country: "",
                postCode: ""
            }
        this.state = ({
            showEditSection: false,
            newAddress: addressData
        })

        this.openEdit = this.openEdit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveAddress = this.saveAddress.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddress: addressData
        })

    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddress)
        data[event.target.name] = event.target.value;
        this.setState({
            newAddress: data
        })
        this.props.updateProfileData(data);
    }

    saveAddress() {
        if (this.state.newAddress.number == '' || this.state.newAddress.street == '' ||
            this.state.newAddress.suburb == '' || this.state.newAddress.city == '' ||
            this.state.newAddress.country == '') {
            TalentUtil.notification.show("Please fill out all the required fields", "error", null, null)
            this.closeEdit();
        } else {
            const data = {}
            data.address = Object.assign({}, this.state.newAddress)
            this.props.saveProfileData(data);
            this.closeEdit();
        }
       
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    renderDisplay() {
        let fullAddress = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""

        return (
            <div className='row'>
                <div className='ui sixteen wide column'>
                    <p> Address: {fullAddress}</p>
                    <p>City: {city}</p>
                    <p>Country: {country}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>

        )
    }

    renderEdit() {
        let newCountry = this.state.newAddress.country;
        let newCity = this.state.newAddress.city;
        let countryOptions = [];
        let cityOptions = [];

        countryOptions = Object.keys(Countries).map((c) => <option key={c} value={c}>{c}</option>);

        if (newCountry != null && newCountry != "") {
            let Cities = Countries[newCountry]

            cityOptions = (Cities).map((c) => <option key={c} value={c}>{c}</option>);
        }
        return (
            <div className='ui sixteen wide column'>
                <div className="fields">
                    <div className="three wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newAddress.number}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your flat/house number"
                            errorMessage="Please enter a flat/house number"
                        />
                    </div>
                    <div className="eight wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newAddress.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your street name"
                            errorMessage="Please enter a valid street name"
                        />
                    </div>
                    <div className="five wide field">
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your suburb name"
                            errorMessage="Please enter a valid suburb name"
                        />
                    </div>
                </div>
                <div className="fields">
                    <div className="six wide field">
                        <b>Country</b>
                        <select
                            className="ui right labeled dropdown"
                            placeholder="Country"
                            value={newCountry}
                            onChange={this.handleChange}
                            name="country">
                            <option value="">Select a country</option>
                            {countryOptions}
                        </select>
                    </div>

                    <div className="six wide field">
                        <b>City</b>
                        <select
                            className="ui right labeled dropdown"
                            placeholder="City"
                            value={newCity}
                            onChange={this.handleChange}
                            name="city">
                            <option value="">Select a city</option>
                            {cityOptions}
                        </select>
                    </div>


                    <div className="three wide field">
                        <ChildSingleInput
                            inputType="number"
                            label="Post Code"
                            name="postCode"
                            value={this.state.newAddress.postCode}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your post code number"
                            errorMessage="Please enter a valid post code number"
                        />
                    </div>
                </div>
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>

        )
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )

    }

}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let countriesData = {}
        countriesData.nationality = event.target.value;
        this.props.saveProfileData(countriesData);
    }

    render() {
        let newNationality = this.props.nationalityData
        let countriesOptions = Object.keys(Countries).map(c => <option key={c} value={c}>{c}</option>);

        return (
            <div className="ui eight wide column">
                <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value={newNationality}
                    onChange={this.handleChange}
                    name="nationality">

                    <option>Select your nationality</option>
                {countriesOptions}
                </select>
            </div>
        )


    }
}