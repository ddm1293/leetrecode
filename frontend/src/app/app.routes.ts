import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordListComponent } from './components/records/record-list/record-list.component';
import { RecordDetailComponent } from './components/records/record-detail/record-detail.component';
import { SubmissionListComponent } from './components/submissions/submission-list/submission-list.component';
import { SubmissionDetailComponent } from './components/submissions/submission-detail/submission-detail.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'records', component: RecordListComponent },
  { path: 'record/:id', component: RecordDetailComponent },
  { path: 'submissions', component: SubmissionListComponent },
  { path: 'submission/:id', component: SubmissionDetailComponent },
  { path: 'user-profile', component: UserProfileComponent }
];
