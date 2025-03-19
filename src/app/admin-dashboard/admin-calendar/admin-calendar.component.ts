import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { DateTime, Info, Interval } from 'luxon';
import { CommomnService } from '../../services/commonService.service';

@Component({
  selector: 'app-admin-calendar',
  imports: [CommonModule],
  providers: [CommomnService],
  templateUrl: './admin-calendar.component.html',
  styleUrl: './admin-calendar.component.css',
})
export class AdminCalendarComponent {
  constructor(private commonService: CommomnService) {
    this.activeDay.set(this.today());
  }

  today: Signal<DateTime> = signal(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month')
  );
  activeDay: WritableSignal<DateTime | null> = signal(null);
  weekDays: Signal<string[]> = signal(Info.weekdays('short'));
  dateNumbers: Record<string, number> = {};
  daysOfMonth: Signal<DateTime[]> = computed(() => {
    const days = Interval.fromDateTimes(
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
      days.forEach((day) => {
        const isoDate = day.toISODate();
        if (isoDate && !(isoDate in this.dateNumbers)) {
          const randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber !== 0) {
          this.dateNumbers[isoDate] = randomNumber;
        }
        }
      });
  
      return days;
  });

  goToPreviousMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().minus({ month: 1 })
    );
  }

  goToNextMonth(): void {
    this.firstDayOfActiveMonth.set(
      this.firstDayOfActiveMonth().plus({ month: 1 })
    );
  }

  goToToday(): void {
    this.firstDayOfActiveMonth.set(this.today().startOf('month'));
    this.activeDay.set(this.today());
  }

  handleClick(day: DateTime) {
    this.activeDay.set(day);
    // console.log(this.activeDay);

    // Open a component with all features.
    this.commonService.getCountOnLeave();
    this.commonService.getCountOnPresent();
    this.commonService.getEmployeeOnLeave();
  }
}
