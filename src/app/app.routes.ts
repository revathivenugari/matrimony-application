import { Route } from '@angular/router';
import { ProfileSwipeComponent } from './components/profile-swipe/profile-swipe.component';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';


export const appRoutes: Route[] = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' }, // Redirect to swipe
  { path: 'profile', component: ProfileSwipeComponent },
  { path: 'profile/:id', component: ProfileViewComponent },

];