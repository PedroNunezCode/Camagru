import React, { Component } from 'react';
import { connect } from 'react-redux';
import CameraComponent from './cameraComponent';
import OtherPictures from './otherPictures';


class CurrentProfile extends Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col col-lg-9">
                        <CameraComponent />
                    </div>
                    <div className="col col-lg-3">
                        <OtherPictures />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CurrentProfile);