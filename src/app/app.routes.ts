import { Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {ActivityLogComponent} from "./pages/activity-log/activity-log.component";
import {MoodTrackerComponent} from "./pages/mood-tracker/mood-tracker.component";
import {AboutComponent} from "./pages/about/about.component";
import {EditActivityComponent} from "./pages/edit-activity/edit-activity.component";


export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activity-log', component: ActivityLogComponent },
  {path: 'edit/:id', component: EditActivityComponent},
  { path: 'mood-tracker', component: MoodTrackerComponent },
  { path: 'about', component: AboutComponent }
];
