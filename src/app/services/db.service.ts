import {Injectable} from '@angular/core';
import {Activity} from "../models/Activity";
import {Mood} from "../models/Mood";

declare function openDatabase(shortName: string, version: string, displayName: string,
                              dbSize: number, dbCreateSuccess: () => void): any;

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: any = null;

  constructor() {
  }

  private static errorHandler(error:string): any {
    console.error("Error: " + error);
  }

  private createDatabase(): void {
    let shortName = "ActivityTracker";
    let version = "1.0";
    let displayName = "DB for Activity Tracker app";
    let dbSize = 2 * 1024 * 1024;

    this.db = openDatabase(shortName, version, displayName, dbSize, () => {
      console.log("Success: Database created successfully");
    });
  }


  private createTables(): void {
    function txFunction(tx: any): void {

      const sqlMood: string = "CREATE TABLE IF NOT EXISTS moods(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "name VARCHAR(20) NOT NULL," +
        "color VARCHAR(20) NOT NULL," +
        "icon VARCHAR(20) NOT NULL);";

      const sqlActivity: string = "CREATE TABLE IF NOT EXISTS activities(" +
        "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "name VARCHAR(20) NOT NULL," +
        "mood VARCHAR(20) NOT NULL," +
        "date DATE NOT NULL);";

      const options: string[] = [];

      tx.executeSql(sqlMood, options, () => {
        console.log("Success: create moods table successful");
      }, DbService.errorHandler);

      tx.executeSql(sqlActivity, options, () => {
        console.log("Success: create activities table successful");
      }, DbService.errorHandler);

      // insert default moods if table is empty
      tx.executeSql("SELECT * FROM moods", [], (tx: any, result: any) => {
          if (result.rows.length == 0) {
            const sqlInsertMood: string = "INSERT INTO moods(name, color, icon) VALUES(?,?,?);";
            tx.executeSql(sqlInsertMood, ["Happy", "indigo", "bi bi-emoji-smile"], () => {
              console.log("Success: insert mood Happy successful");
            }, DbService.errorHandler);

            tx.executeSql(sqlInsertMood, ["Sad", "brown", "bi bi-emoji-frown"], () => {
              console.log("Success: insert mood Sad successful");
            }, DbService.errorHandler);

            tx.executeSql(sqlInsertMood, ["Angry", "orange", "bi bi-emoji-angry"], () => {
              console.log("Success: insert mood Angry successful");
            }, DbService.errorHandler);

            tx.executeSql(sqlInsertMood, ["Excited", "red", "bi bi-emoji-laughing"], () => {
              console.log("Success: insert mood Excited successful");
            }, DbService.errorHandler);

            tx.executeSql(sqlInsertMood, ["Calm", "green", "bi bi-emoji-neutral"], () => {
              console.log("Success: insert mood Calm successful");
            }, DbService.errorHandler);

            tx.executeSql(sqlInsertMood, ["Tired", "purple", "bi bi-emoji-dizzy"], () => {
              console.log("Success: insert mood Tired successful");
            }, DbService.errorHandler);
          }
        }
        , DbService.errorHandler);

    }

    this.db.transaction(txFunction, DbService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  public initDB(): void {
    if (this.db == null) {
      try {
        //create database
        this.createDatabase();
        //create tables
        this.createTables();
      } catch (e) {
        console.error("Error in initDB(): " + e);
      }
    }
  }

  public insertActivity(activity: Activity, callback: any) {

    console.log({activity});
    function txFunction(tx: any) {
      const sql: string = 'INSERT INTO activities(name, mood, date) VALUES(?,?,?);';
      const options = [activity.name, activity.mood, activity.date];

      tx.executeSql(sql, options, () => {
        console.info("Success: insert record successful");
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler,callback);
  }

  public updateActivity(activity: Activity, callback: any) {

    console.log({activity});
    function txFunction(tx: any) {
      const sql: string = 'UPDATE activities SET name=?, mood=?, date=? WHERE id=?;';
      const options = [activity.name, activity.mood, activity.date, activity.id];

      tx.executeSql(sql, options, () => {
        console.info("Success: update record successful");
      }, (error: any, res:any) => {
        console.log(error, res);
      });
    }

    this.db.transaction(txFunction, DbService.errorHandler,callback);
  }

  public deleteActivity(id: number, callback: any) {
    function txFunction(tx: any) {
      const sql: string = 'DELETE FROM activities WHERE id=?;';
      const options = [id];

      tx.executeSql(sql, options, () => {
        console.info("Success: delete record successful");
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler, callback);
  }

  public selectAllActivities(callback: any) {

    console.log("select all activities");
    function txFunction(tx: any) {
      const sql: string = 'SELECT * FROM activities;';
      const options: any[] = [];

      tx.executeSql(sql, options, (tx: any, results: any) => {
        console.info("Success: select records successful");
        callback(results);
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler, () => {
      console.log('Success: select all transaction successful');
    });
  }

  public selectAllMoods(callback: any) {
    function txFunction(tx: any) {
      const sql: string = 'SELECT * FROM moods;';
      const options: any[] = [];

      tx.executeSql(sql, options, (tx: any, results: any) => {
        console.info("Success: select records successful");
        callback(results);
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler, () => {
      console.log('Success: select all transaction successful');
    });
  }

  public selectActivityById(id: number, callback: any) {
    function txFunction(tx: any) {
      const sql: string = 'SELECT * FROM activities WHERE id=?;';
      const options = [id];

      tx.executeSql(sql, options, (tx: any, results: any) => {
        console.info("Success: select record successful");
        callback(results);
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler, () => {
      console.log('Success: select by id transaction successful');
    });
  }

  public selectActivityByDate(date: Date, callback: any) {
    function txFunction(tx: any) {
      const sql: string = 'SELECT * FROM activities WHERE date=?;';
      const options = [date];

      tx.executeSql(sql, options, (tx: any, results: any) => {
        console.info("Success: select record successful");
        callback(results);
      }, DbService.errorHandler);
    }

    this.db.transaction(txFunction, DbService.errorHandler, () => {
      console.log('Success: select by id transaction successful');
    });
  }


}








