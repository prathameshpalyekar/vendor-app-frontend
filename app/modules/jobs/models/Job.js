import Model from '../../../components/Model/Model'
import PositionTypes from '../constants/PositionTypes'

class Job extends Model {

    constructor(properties) {
        return super(properties);
    }

    defaultValues() {
        return {};
        return Job.getDefaultValues();
    }

    getPlainDescription() {
        if (!this.description) {
            return '';
        }

        // FIXME: Show only the first line of description over here
        let desc = this.description.replace(/(<([^>]+)>)/ig,'');
        desc = desc.replace(/&nbsp;/g, ' ');

        return desc;
    }

    isDraft() {
        return this.status === 'draft';
    }

    isPublished() {
        return this.status === 'published';
    }

    isCompleted() {
        return this.status === 'completed';
    }

    getPositionType() {
        return PositionTypes[this.positionType];
    }

    getUserVisibility(user) {
        if (!user) {
            return 'Invalid User';
        }

        if (typeof user.toObject === 'function') {
            user = user.toObject();
        } else if (typeof user === 'string') {
            user = { id: user };
        }

        if (user.id === this.userId) {
            return 'jobOwner';
        }

        if (this.visibility && this.visibility.length > 0) {
            const findUserRow = this.visibility.find((v) => {
                return v.userId === user.id;
            });
            return findUserRow.type;
        }

        return 'Invalid User';
    }

    canUserDelete(user) {
        if (!user) {
            return false;
        }

        if (typeof user.isObject === 'function') {
            user = user.isObject();
        } else if (typeof user === 'string') {
            user = { id: user };
        }

        return user.id === this.userId;
    }

    canUserEdit(user) {
        if (!user) {
            return false;
        }

        if (typeof user.toObject === 'function') {
            user = user.toObject();
        } else if (typeof user === 'string') {
            user = { id: user };
        }

        if (user.subscriptionType !== 'premium') {
            return false;
        }

        if (user.id === this.userId) {
            return true;
        }

        if (this.visibility && this.visibility.length > 0) {
            let findUserRow = this.visibility.find((v) => {
                return v.userId === user.id;
            });
           
            return findUserRow && findUserRow.type === 'premium';
        }
        return false;
    }

    canUserAddCandidate (user) {
        if (this.canUserEdit(user)) {
            return true;
        }

        if (typeof user.toObject === 'function') {
            user = user.toObject();
        } else if (typeof user === 'string') {
            user = { id: user };
        }

        if (this.visibility && this.visibility.length > 0) {
            let findUserRow = this.visibility.find((v) => {
                return v.userId === user.id;
            });
           
            return findUserRow && findUserRow.type === 'supplier';
        }

        return false;
    }
}

Job.prototype._dateFields = ['createdAt', 'updatedAt', 'lastDate'];

Job.PositionTypes = PositionTypes;

Job.getDefaultValues = function () {
    return {
        requiredCandidateInfo: {},
        status: 'draft'
    };
};

export default Job;
