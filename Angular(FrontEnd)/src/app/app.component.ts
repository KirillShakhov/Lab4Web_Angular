import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    // Адрес для доступа к бэкэенду
    // Порт настраивался в Spring в server.port=6060
    static API_URL = 'http://localhost:6060/api';
    title = 'Lab4-Web';
}
