export class Todo {
  id: number;
  title: string;
  date?: any;
  complete: boolean = false;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }

  // ^^^ does same as VVVV????

  // constructor( id, title, date, complete ) {
  //   this.id = id;
  //   this.title = title;
  //   this.date = date;
  //   this.complete = complete;
  // }

}
