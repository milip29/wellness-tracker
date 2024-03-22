import { Injectable } from '@angular/core';
import {DbService} from "./db.service";
import {Mood} from "../models/Mood";
import {Activity} from "../models/Activity";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  moods: Mood[] = [];
  private activities: Activity[] = [];

  constructor(private dbService:DbService) {
    this.dbService.initDB();
    console.log("ActivityService constructor");
    this.onGetMoods = this.onGetMoods.bind(this);
    this.onGetActivities = this.onGetActivities.bind(this);

    this.dbService.selectAllMoods(this.onGetMoods)
    this.dbService.selectAllActivities(this.onGetActivities)
  }

  onGetMoods = (result:any) => {
    for (let i = 0; i < result.rows.length; i++) {
      let mood = new Mood(result.rows.item(i).id, result.rows.item(i).name, result.rows.item(i).color, result.rows.item(i).icon);
      this.moods.push(mood);
    }
  }

  onGetActivities = (result:any) => {
    this.activities = [];
    for (let i = 0; i < result.rows.length; i++) {
      let activity = new Activity(result.rows.item(i).id, result.rows.item(i).name, result.rows.item(i).mood, result.rows.item(i).date);
      this.activities.push(activity);

    }
  }


  getActivitiesAsync(): Promise<Activity[]> {
    return new Promise((resolve) => {
      this.dbService.selectAllActivities((result: any) => {
        resolve(this.activities);
      });
    });
  }


  getActivityById(id: number): Activity | undefined {
    return this.activities.find(activity => activity.id === id);
  }

}
