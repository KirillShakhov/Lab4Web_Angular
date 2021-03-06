import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    // Адрес для доступа к бэкэенду
    // Порт настраивался в Spring в server.port=19090
    static API_URL = 'http://localhost:19090/api';
    title = 'Lab4-Web';
}
