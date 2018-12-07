import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, addHours } from 'date-fns';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  viewDate: Date = new Date();
  view = 'week';
  locale = 'tr';
  isDragging = false;
  
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {

    start: addHours(startOfDay(new Date()),7),
    end: addHours(startOfDay(new Date()),9),
    title: 'First Event',
    cssClass: 'custom-event',
    actions: [
      {
        label: '<font style="float:left;" size="3" color="red">Delete</font>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          console.log('Event deleted', event);
        }
      }
    ],
    color: {
      primary: '#488aff',
      secondary: '#bbd0f5'
    },
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  },
  {

    start: addHours(  startOfDay(new Date()),10),
    end: addHours(startOfDay(new Date()),12),
    title: 'Second Event',
    cssClass: 'custom-event',
    color: {
      primary: '#488aff',
      secondary: '#bbd0f5'
    },

    actions: [
      {
        label: '<font style="float:left;" size="3" color="red">Delete</font>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          console.log('Event deleted', event);
        }
      }
    ],
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    draggable: true
  }
  ];
  
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }
 
  handleEvent(event: CalendarEvent)
  {     

    let alert = this.alertCtrl.create({
      title: event.title,
      message: event.start + ' to ' + event.end,
      buttons: ['OK']
    });
    alert.present();
  }

  
  hourSegmentClicked(event)
  {
    let newEvent: CalendarEvent = {
    start: event.date,  
    end: addHours(event.date, 1),
    title: "Example ",
    cssClass: 'custom-event',
    color: {
      primary: '#488aff',
      secondary: '#bbd0f5'
    },
    resizable: {
      beforeStart: true,
      afterEnd: true
    },
    actions: [
      {
        label: '<font style="float:left;" size="3" color="red">Delete</font>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.events = this.events.filter(iEvent => iEvent !== event);
          console.log('Event deleted', event);
        }
      }
    ],
    draggable: true
    }
    this.events.push(newEvent);
    this.refresh.next();
  }
  eventTimesChanged({ event, newStart, newEnd}: CalendarEventTimesChangedEvent)
  {
    if(this.isDragging)
    {
      return;
    }
    this.isDragging = true;

    event.start = newStart; 
    event.end = newEnd;
    this.refresh.next();

    setTimeout(() => {
      this.isDragging = false;
    },1000);

  }
 
}
