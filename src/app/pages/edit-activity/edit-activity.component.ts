import {Component} from '@angular/core';
import {DbService} from "../../services/db.service";
import {Router, RouterLink} from "@angular/router";
import {ActivityService} from "../../services/activity.service";
import {Activity} from "../../models/Activity";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Mood} from "../../models/Mood";

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.css'
})
export class EditActivityComponent {

  activity: Activity | undefined;

  moods: Mood[] = [];

  constructor(private router: Router, private activityService: ActivityService, private database: DbService) {
  }

  ngOnInit(): void {
    this.activity = this.activityService.getActivityById(Number(this.router.url.split('/')[2]));

    this.moods = this.activityService.moods;
  }

  btnEdit_click() {

    if (this.activity === undefined) {
      return;
    }

    if (this.activity.id === undefined) {
      return;
    }

    this.database.updateActivity(this.activity, () => {

      window.location.href = '/';
    });

  }

  btnDelete_click() {
    if (this.activity === undefined) {
      return;
    }

    if (this.activity.id === undefined) {
      return;
    }

    this.database.deleteActivity(this.activity.id, () => {

      window.location.href = '/';
    });
  }
}
