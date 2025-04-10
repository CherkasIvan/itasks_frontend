import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import * as moment from "moment";
import * as _ from "lodash";

export interface CalendarDate {
  mDate: moment.Moment;
  today?: boolean;
}

@Component({
  selector: "ux-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.less"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnChanges {
  currentDate = moment();
  dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  weeks: CalendarDate[][] = [];

  @Input() selectedDate;
  @Output() changeDate = new EventEmitter<CalendarDate>();
  @Output() clearDate = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.selectedDates &&
    //   changes.selectedDates.currentValue &&
    //   changes.selectedDates.currentValue.length > 1) {
    //   // sort on date changes for better performance when range checking
    //   this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
    //   this.generateCalendar();
    // }
  }

  onClearDay() {
    this.clearDate.emit();
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), "day");
  }

  isSelected(date: moment.Moment): boolean {
    return moment(date).isSame(this.selectedDate, "day");
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, "month");
  }

  selectDate(date: CalendarDate): void {
    this.changeDate.emit(date);
    this.selectedDate = date.mDate;
  }

  // actions from calendar
  prevMonth(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "months");
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate = moment(this.currentDate).add(1, "months");
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf("year");
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf("year");
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, "year");
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, "year");
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf("month").day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf("month")
      .subtract(firstOfMonth, "days");
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42).map((date: number): CalendarDate => {
      const d = moment(firstDayOfGrid).date(date);
      return {
        today: this.isToday(d),
        mDate: d,
      };
    });
  }
}
