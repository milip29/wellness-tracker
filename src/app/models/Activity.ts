
export class Activity {

  id: undefined | number;
  name: undefined | string;
  mood: undefined | string;
  date: undefined | Date;

  constructor(id?: number, name?: string, mood?: string, date?: Date) {
    this.id = id;
    this.name = name;
    this.mood = mood;
    this.date = date;
  }
}
