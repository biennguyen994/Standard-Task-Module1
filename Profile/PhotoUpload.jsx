/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePhotoFile: null,
            profilePhotoUrl: null,
        }
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this)
    }

    handleSelectionChange(event) {
        const selectedFile = event.target.files[0];
        const imgreader = new FileReader();
        const imgTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (selectedFile) {
            if (imgTypes.includes(selectedFile.type)) {
                imgreader.onloadend = () => {
                    this.setState({
                        profilePhotoFile: selectedFile,
                        profilePhotoUrl: imgreader.result
                    })
                }
                imgreader.readAsDataURL(selectedFile)
            } else {
                TalentUtil.notification.show("Invalid image format", "error")
            }
        }
    }

    handleUploadPhoto() {
        var cookies = Cookies.get('talentAuthToken');
        let imgData = new FormData()
        imgData.append('image', this.state.profilePhotoFile)
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            contentType: false,
            processData: false,
            type: "POST",
            data: imgData,
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Photo uploaded sucessfully", "success", null, null)
                    this.setState({ profilePhotoFile: null })
                } else {
                    this.setState({ profilePhotoFile: null })
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        let imageUrl = null;
        if (!this.props.imageId) {
            if (!this.state.profilePhotoUrl) {
                imageUrl = <i className="ui huge camera retro icon circular" ></i>
            }
            else {
                imageUrl = <img src={this.state.profilePhotoUrl} /> 
            }
        } else {
            if (this.state.profilePhotoUrl) {
                imageUrl = this.state.profilePhotoUrl
            } else {
                imageUrl = this.props.imageId
            }
        }

        return (
            <React.Fragment>
                <div className="row">
                    <label htmlFor="upload">
                        <div className="ui circular small bordered image">
                            {this.props.imageId
                                ? <img src={imageUrl}/>
                                : imageUrl}
                        </div>
                    </label>
                    <input id="upload" type="file" onChange={this.handleSelectionChange} style={{ display: 'none' }} />
                </div>
                <br />
                <div className="row">
                    {this.state.profilePhotoFile
                        ? <button type="button" className="ui teal button" onClick={this.handleUploadPhoto}><i className="upload icon" /> Upload</button>
                        : null}
                </div>
            </React.Fragment>
        )
    }
}


/*
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePhotoFile: null,
            profilePhotoUrl: null,
        }
        this.handleSelectionChange = this.handleSelectionChange.bind(this)
        this.handleUploadPhoto = this.handleUploadPhoto.bind(this)
    }

    handleSelectionChange(event) {
        const selectedFile = event.target.files[0];
        const imgreader = new FileReader();
        const imgTypes = ['image/gif', 'image/jpeg', 'image/png'];

        if (selectedFile) {
            if (imgTypes.includes(selectedFile.type)) {
                imgreader.onloadend = () => {
                    this.setState({
                        profilePhotoFile: selectedFile,
                        profilePhotoUrl: imgreader.result
                    })
                }
                imgreader.readAsDataURL(selectedFile)
            } else {
                TalentUtil.notification.show("Invalid image format", "error")
            }
        }
    }

    handleUploadPhoto() {
        var cookies = Cookies.get('talentAuthToken');
        let imgData = new FormData()
        imgData.append('image', this.state.profilePhotoFile)
        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies,
            },
            contentType: false,
            processData: false,
            type: "POST",
            data: imgData,
            success: function (res) {
                if (res.success == true) {
                    TalentUtil.notification.show("Photo uploaded sucessfully", "success", null, null)
                    this.setState({ profilePhotoFile: null })
                } else {
                    TalentUtil.notification.show("Failed to upload photo", "error", null, null)
                }
            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        let imageUrl = null;
        if (!this.props.imageId) {
            if (!this.state.profilePhotoUrl) {
                imageUrl = <i className="ui huge camera retro icon circular" ></i>
            }
            else {
                imageUrl = <img src={this.state.profilePhotoUrl} />
            }
        } else {
            if (this.state.profilePhotoUrl) {
                imageUrl = this.state.profilePhotoUrl
            } else {
                imageUrl = this.props.imageId
            }
        }

        return (
            <React.Fragment>
                <div className="row">
                    <label htmlFor="upload">
                        <div className="ui circular small bordered image">
                            {this.props.imageId
                                ? <img src={imageUrl} />
                                : imageUrl}
                        </div>
                    </label>
                    <input id="upload" type="file" onChange={this.handleSelectionChange} style={{ display: 'none' }} />
                </div>
                <br />
                <div className="row">
                    {this.state.profilePhotoFile
                        ? <button type="button" className="ui teal button" onClick={this.handleUploadPhoto}><i className="upload icon" /> Upload</button>
                        : null}
                </div>
            </React.Fragment>
        )
    }
}*/