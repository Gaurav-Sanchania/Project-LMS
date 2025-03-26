import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, Output, Signal, signal, WritableSignal } from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';

@Component({
  selector: 'app-calendar',
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  @Output() dateSelected = new EventEmitter<Date>();
  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week')
    )
      .splitBy({ day: 1 })
      .map((d) => {
        if (d.start === null) {
          throw new Error('Wrong dates');
        }
        return d.start;
      });
  });

  constructor() {
    this.activeDay.set(this.today());
  }
  ngOnInit() {
  }

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 }),
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 }),
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
    this.activeDay.set(this.today());
    if (this.activeDay() !== null) {
      this.dateSelected.emit(this.activeDay()!.toJSDate());
    }
    this.ngOnInit();
  }

  handleCalendarEvent(day: any) {
    this.activeDay.set(day);
    // console.log(this.activeDay);
    if (this.activeDay() !== null) {
      this.dateSelected.emit(this.activeDay()!.toJSDate());
    }
    this.ngOnInit();
  }
}
