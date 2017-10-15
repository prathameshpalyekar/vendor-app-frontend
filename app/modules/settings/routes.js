import Settings from './views/Settings';
import UserForm from './views/UserForm/UserForm';

const Routes = [{
    path: '/settings',
    component: Settings,
}, {
    path: '/settings/add-user',
    component: UserForm
}, {
    path: '/settings/edit-user/:id',
    component: UserForm
}]

export default Routes;
