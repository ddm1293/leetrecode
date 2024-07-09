import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordListComponent } from './components/records/record-list/record-list.component';
import { RecordDetailComponent } from './components/records/record-detail/record-detail.component';
import { SubmissionListComponent } from './components/submissions/submission-list/submission-list.component';
import { SubmissionDetailComponent } from './components/submissions/submission-detail/submission-detail.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RecordListComponent,
    RecordDetailComponent,
    SubmissionListComponent,
    SubmissionDetailComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
