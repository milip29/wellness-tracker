import {Component, NgZone} from '@angular/core';
import {Activity} from "../../models/Activity";
import {DbService} from "../../services/db.service";
import {ActivityService} from "../../services/activity.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf,
    DatePipe,
    NgForOf,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  deviceInfo: string = '';

  activities: Activity[] = [];

  constructor(private activityService: ActivityService) {

  }

  // In DashboardComponent
  ngOnInit(): void {
    this.activityService.getActivitiesAsync().then(activities => {
      this.activities = activities;
      console.log(this.activities);
    });


  }


}
