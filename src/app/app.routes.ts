import { Routes } from '@angular/router';
import { UserList } from './components/user-list/user-list';
import { UserProfile } from './components/user-profile/user-profile';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserList },
    { path: 'user-profile/:id', component: UserProfile},

];
