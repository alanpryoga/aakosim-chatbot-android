import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
    transform(d: any): string {
        return moment(d, 'YYYY-MM-DD HH:mm:ss').fromNow();
    }
}
