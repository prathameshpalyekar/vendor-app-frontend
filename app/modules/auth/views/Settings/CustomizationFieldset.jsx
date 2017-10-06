import React, { Component, PropTypes } from 'react';

import { AwFieldset, AwImageHolder, AwImageUpload } from 'components/ui';
import FC from 'components/Formsy';
import './CustomizationFieldset.less';

const DefaultProfilePic = '/assets/' + require('assets/images/candidate_default_profile_pic.png');

export default class CustomizationFieldset extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;

        return (
            <AwFieldset title="Customization" icon="icon-info" className="settings-customization">
                <p className="-meta-description">For best result use a company logo file with a transparent background</p>
                <div className="row">
                    <div className="col-md-offset-2 col-md-4 col-sm-6 text-center">
                        <FC.FileUpload name="profilePicture" label="Profile picture" fileName="ProfilePicture.jpg" roundImage={true} value={user.profilePicture} type="hidden"/>
                    </div>
                    <div className="col-md-4 col-sm-6 text-center">
                        <FC.FileUpload name="companyLogo" label="Company logo" fileName="CompanyLogo.jpg" roundImage={true} value={user.companyLogo} type="hidden"/>
                    </div>
                    {/* <div className="col-md-4 text-center"> */}
                    {/*     <FC.ColorPicker label="Menu Color" name="menuColor" value={user.menuColor} type="hidden"/> */}
                    {/* </div> */}
                </div>
            </AwFieldset>
        )
    }
}
