import React, { Component, PropTypes } from 'react';
import cx from 'classnames'
import { connect } from 'react-redux'
import axios from 'axios'

import Helpers from 'components/helpers/'
import { AwFieldset } from 'components/ui';
import FC from 'components/Formsy'

import Config from '../../../../config.js';

const TypeTextMap = {
    customer: 'Client',
    supplier: 'Supplier',
    basic: 'Colleague (viewer)',
    premium: 'Colleague (admin)',
};

const TypeDescMap = {
    customer : "Adding someone as Client gives them access to viewing all presented candidates (Longlist and forward) on the position. They will be able to manage and edit all candidates.",
    supplier : "Adding someone as Supplier gives them access to adding candidates to your position. They will be limited to see, edit and manage the candidates they have added. They will not see your candidates or candidates from other supplier",
    basic: "Adding someone as Colleague (Viewer) gives them access to see everything that you see but restricts them from making any changes. They can't add or edit candidates. They can't manage candidates in the process but they can comment on candidates.",
    premium: 'Adding someone as Colleague (Admin) gives them access to see everything you see and edit/manage everything you can. This includes sharing Application columns and Draft columns as well as being able to edit position details.'
};

const TypeOptionsSameDomain =  Helpers.mapObjectToOptions({
    basic: TypeTextMap.basic,
    premium: TypeTextMap.premium,
});

const TypeOptionsExt =  Helpers.mapObjectToOptions({
    customer: TypeTextMap.customer,
    supplier: TypeTextMap.supplier,
    // basic: TypeTextMap.basic,
    premium: TypeTextMap.premium,
});

const TypeBasicOption = {
    'label': TypeTextMap.basic,
    'value': 'basic'
}

class VisibilityRow extends Component {
    constructor(props) {
        super(props);

        this.defaultTypeOptions = [].concat(TypeOptionsExt);

        this.state = {
            isEditing: false,
            isSameDomain: false,
            form: false,
            visibilities: [],
            editedIndex: -1,
            editedValue: {
                email : '',
                type : 'customer'
            },
            completedVisibility: {
                email: '',
                type: 'customer'
            },
            showAlert: false,
            typeOptions: this.defaultTypeOptions,
            row: Object.assign({}, props.row)
        };

        this.emailChangeTimeout = false;
        this.subscriptionTypeXhr = false;

        this.startEditing = this.startEditing.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this._onEmailChange = this._onEmailChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentWillMount() {
        const { visibilities } = this.props; 
        if (visibilities) {
            this.setState({visibilities: visibilities});
        }
    }

    startEditing() {
        this.setState({
            isEditing: true
        });
    }

    _onEmailChange(value) {
        const domain = Helpers.getEmailDomain(value);

        if (domain === false || domain === '') {
            return this.setState({
                typeOptions: this.defaultTypeOptions,
                showAlert: false,
                editedValue : Object.assign(this.state.editedValue, {
                    email: '',
                })
            });
        }

        const userDomain = Helpers.getEmailDomain(this.props.user.get('email'));

        this.setState({
            typeOptions: TypeOptionsExt,
            isSameDomain: userDomain === domain,
            completedVisibility : Object.assign(this.state.completedVisibility, {
                email: value,
            }),
            editedValue : Object.assign(this.state.editedValue, {
                email: value,
            }),
            showAlert: userDomain !== domain && this.state.completedVisibility.type === 'premium'
        });
    }

    // No longer needed as we show alert based on the 
    // users email domain and user permission selection
    // onEmailBlur(event) {
    //     let value = event.currentTarget.value;
    //
    //     if (!value || !Helpers.validateEmail(value)) {
    //         return false;
    //     }
    //
    //     FIXME: Find a way to abort previous request if possible
    //     https://github.com/mzabriskie/axios/issues/50
    //     FIXME: Add caching if possible
    //     axios({
    //         url: Config.BASE_URL + 'user/get-subscription-type',
    //         method: 'POST',
    //         responseType: 'json',
    //         data: { email: value }
    //     }).then((xhrResponse) => {
    //         let response = xhrResponse.data;
    //         this.setState({
    //             showMembershipAlert: response.success && response.data.subscriptionType === 'basic'
    //         });
    //     }).catch((response) => {
    //         this.setState({
    //             showMembershipAlert: false
    //         });
    //     });
    // }

    onEmailChange(name, value) {
        if (this.emailChangeTimeout) {
            clearTimeout(this.emailChangeTimeout);
        }

        this.emailChangeTimeout = setTimeout(() => {
            this._onEmailChange(value);
        }, 100);
    }

    showMembershipAlert() {
        const { showAlert, row } = this.state;

        if (!row || !row.type) {
            return null;
        }

        let text = '';
        if (showAlert) {
            if (row.type === 'basic') {
                text = 'This user does not have the same domain as you. Are you sure you want to invite them as a colleague with viewer rights? This means that they can\'t edit any jobs or candidates.';
            } else if (row.type === 'premium') {
                text = 'This user does not have the same domain as you. Are you sure you want to invite them as a colleague with admin rights? This means that they have access and can edit any jobs or candidates.';
            } else {
                text = '';
            }
        } else {
            return null;
        }

        if (!text) {
            return null;
        }

        return (
            <p className="-type-desc text-danger">
                <em>{text}</em>
            </p>
        );
    }

    onTypeChange(name, value) {
        let showAlert = false;
        const domain = Helpers.getEmailDomain(this.state.editedValue.email);
        const userDomain = Helpers.getEmailDomain(this.props.user.get('email'));

        if (domain !== false && domain !== '') {
            showAlert = domain !== userDomain && value === 'premium'
        }

        this.setState({
            row: Object.assign(this.state.row, {
                type: value
            }),
            completedVisibility: Object.assign(this.state.completedVisibility, {
                type: value
            }),
            editedValue: Object.assign(this.state.editedValue, {
                type: value
            }),
            showAlert
        })
    }

    renderEmailField() {

        return (
            <FC.Input type='email' label="Email" name="email-input" value={this.state.edit? this.state.editedValue.email:""} layout="vertical" onChange={this.onEmailChange } required />
        );
    }

    renderTypeField() {
        const { index, isNew } = this.props;
        const { isEditing, row, editedValue } = this.state;
        
        let { typeOptions } = this.state;

        if(editedValue.type === "basic") {
            typeOptions = typeOptions.slice();
            typeOptions.push(TypeBasicOption);
        }

        return (
            <FC.ButtonGroup layout="vertical" label="Visibility" name='type-input' onChange={this.onTypeChange}  options={typeOptions} value={editedValue.type} />
        );
         
    }

    onRemove() {
        if (this.props.onRemove) {
            this.props.onRemove(this.props.index);
        }
    }

    onAdd() {
        const { email, type } = this.state.row;

        if (this.props.onAdd && email && type) {
            this.props.onAdd(this.state.row, this.props.index);
        }
    }

    canAddMore() {
        const { email, type } = this.state.row;

        return email && type;
    }

    showForm() {
        this.setState({
            form: true,
            edit: false 
        });
    }

    handleCancelButton () {
        this.setState({
            form: false,
            edit: false,
            completedVisibility: {
                email: '',
                type: ''
            },
            editedValue: {
                email: '',
                type: ''
            },
            showAlert: false
        });
    }

    saveVisibility(event) {
      this.setState({
        visibilities: this.state.visibilities.concat([this.state.completedVisibility]),
        completedVisibility: {
            email: '',
            type: ''
        },
        edit: false,
        form: false
      });
    }

    updateVisibility(event) {
        let tempVisibility = this.state.visibilities;
        tempVisibility[this.state.editedIndex] = this.state.completedVisibility;
        this.setState({
            completedVisibility: {
                email: '',
                type: ''
            },
            visibilities: tempVisibility,
            edit: false,
            form: false
      });
    }

    renderVisibilityForm() {
        let disabled = true;
        if (this.state.completedVisibility.email && this.state.completedVisibility.type){
            disabled = false;
        }

        return (
            <div>
                {
                    this.state.form ?
                    <AwFieldset title="" className="job-visibility-form"  noToggleButton={true}>
                        {this.renderEmailField()}
                        {this.renderTypeField()}
                        <div className="row -button-container">
                            <div className="col-sm-7 -type-container">
                                { this.state.showAlert ?
                                    this.showMembershipAlert() :
                                    <p className="-type-desc">
                                        <i>{TypeDescMap[this.state.completedVisibility.type]}</i>
                                    </p>
                                }
                            </div>
                            <div className="col-sm-5 -buttons">
                                <button type="button" className="btn btn-danger cancel-button" onClick={this.handleCancelButton.bind(this)} >Cancel</button>
                                <button type="button" className="btn btn-primary save-button" onClick={this.state.edit ? this.updateVisibility.bind(this) : this.saveVisibility.bind(this)} disabled={disabled} >Save</button>
                            </div>
                        </div>
                    </AwFieldset> :
                    <div className="row">
                        <button type="button" className="btn btn-primary job-visbility-add-account" onClick={this.showForm.bind(this)} >Add collaborator</button>
                    </div>
                }
            </div>
        );
    }
    editEntry(index) {
        this.setState({edit: true, form: true, editedValue: this.state.visibilities[index], completedVisibility: this.state.visibilities[index], editedIndex: index});
    }

    deleteEntry(index) {
        this.setState({
            visibilities: this.state.visibilities.filter((_, i) => i !== index)
        });
    }
    renderOwnerVisibility (){
        const { owner, user} = this.props;
        return (
            <div className="row">
                <div className="col-sm-7 job-visibility-row-name">{owner.email} {owner.userId === user.get('id')? '(Me)' : ''}</div>
                <div className="col-sm-5 job-visibility-row-type">{TypeTextMap[owner.type]}</div>
            </div>
        );
    }
    renderVisibilities() {
        return (
            <div>
            {this.renderOwnerVisibility()}
            {this.state.visibilities.map((visibility,index) => {
            let name = visibility.email;
            let type = TypeTextMap[visibility.type];
                return (
                    <div className="row" key={index}>
                        <div className="col-sm-7 job-visibility-row-name">{name}</div>
                        <div className="col-sm-3 job-visibility-row-type">{type}</div>
                        <div className="col-sm-2 edit-container">
                            <span className="edit icon-edit" onClick={this.editEntry.bind(this, index)}></span> 
                            <span className="delete icon-cross" onClick={this.deleteEntry.bind(this, index)}></span>
                        </div>
                    </div>
                )    
            })}</div>
        );
    }
    render() {
        const {
            user, isNew, isOwner, index
        } = this.props;

        const { isEditing, row } = this.state;
        const { email, type } = row;

        let typeElement = <i className="text-capitalize">{TypeTextMap[type]}</i>;

        return (
            <div>
                <div className="job-visibility-row">
                    {this.renderVisibilities()}
                    {this.renderVisibilityForm()}
                    <div className="hidden-input-wrapper">
                        <FC.Input name="visibility" className="hidden-input hidden" type="text" value={this.state.visibilities} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const auth = state.get('auth');

    return {
        user: auth.get('user')
    };
};

export default connect(mapStateToProps)(VisibilityRow);
