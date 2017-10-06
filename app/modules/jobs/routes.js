import JobsMain from './views/JobsMain';
import JobForm from './views/JobForm';

const Routes = {
    path: '/jobs',
    component: JobsMain,
    childRoutes: [{
        path: '/jobs/add',
        component: JobForm
    }, {
        path: '/jobs/:id/edit',
        component: JobForm
    }]
}

export default Routes
