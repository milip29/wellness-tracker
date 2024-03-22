import {Component, NgZone} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Activity} from "../../models/Activity";
import {DbService} from "../../services/db.service";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Mood} from "../../models/Mood";
import {ActivityService} from "../../services/activity.service";
import {Router} from "@angular/router";


declare var navigator: any;
declare var device: any;

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    JsonPipe,
    NgForOf
  ],
  templateUrl: './activity-log.component.html',
  styleUrl: './activity-log.component.css'
})
export class ActivityLogComponent {
  objActivity: Activity = new Activity();

  moods: Mood[] = [];

  constructor(private database: DbService, private activityService: ActivityService, private router: Router, private zone: NgZone) {
  }

  ngOnInit(): void {
    this.database.initDB();

    this.moods = this.activityService.moods;

  }

  btnAdd_click() {
    this.database.insertActivity(this.objActivity, () => {
      this.triggerVibration();
      window.location.href = '/';
    });
  }

  triggerVibration() {
    if (navigator.vibrate) {
      navigator.vibrate(1000);
      console.log('Vibration triggered.');
    } else {
      console.warn('Vibration API not available.');
    }
  }



}
