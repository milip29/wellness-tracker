import { Component } from '@angular/core';
import {ActivityService} from "../../services/activity.service";
import {Mood} from "../../models/Mood";
import {NgForOf, NgIf} from "@angular/common";
import {Activity} from "../../models/Activity";

@Component({
  selector: 'app-mood-tracker',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './mood-tracker.component.html',
  styleUrl: './mood-tracker.component.css'
})
export class MoodTrackerComponent {

  activities: Activity[] = [];
  activityByMood: ActivityByMood[] = [];
  moods: Mood[] = [];

  constructor(private activityService: ActivityService) {
    this.moods = this.activityService.moods;
  }

  ngOnInit(): void {
    this.activityService.getActivitiesAsync().then(activities => {
      this.activities = activities;


      this.moods.forEach(mood => {
        let activitiesByMood = this.activities.filter(activity => activity.mood === mood.name);
        this.activityByMood.push(new ActivityByMood(mood, activitiesByMood));
      });

    });
  }

  getProgressPercentage(moodData: ActivityByMood): string {
    const totalActivities = this.activities.length;
    const moodActivityCount = moodData.getCount();
    const percentage = (moodActivityCount / totalActivities) * 100;
    return `${percentage}%`;
  }

}

class ActivityByMood {
  mood: Mood;
  activities: Activity[];

  constructor(mood: Mood, activities: Activity[]) {
    this.mood = mood;
    this.activities = activities;
  }

  getCount(): number {
    return this.activities.length;
  }

}
