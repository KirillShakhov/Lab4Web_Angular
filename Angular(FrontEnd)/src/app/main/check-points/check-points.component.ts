import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {PointsService} from '../../services/points/points.service';
import {Point} from '../../model/point';
import {HistoryComponent} from '../history/history.component';
import {Graphic} from '../../model/graphic';

import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import {SelectItemGroup} from 'primeng/api';


@Component({
  providers: [HistoryComponent],
  selector: 'app-check-points',
  templateUrl: './check-points.component.html',
  styleUrls: ['./check-points.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointsComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef;

  point: Point = new Point(0, 0, 1, false);
  errorMessage: string;
  private rightX = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
  private rightR = ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
  private graphic: Graphic;
  filteredRadius: ['-2', '-1.5', '-1', '-0.5', '0', '0.5', '1', '1.5', '2'];
  selectedRadius: any [];

  selectedCountry: any;

  countries: any[];

  filteredCountries: any[];

  selectedCountries: any[];

  selectedCountryAdvanced: any[];

  filteredBrands: any[];
  private countryService: string[];


  constructor(private service: PointsService, private authService: AuthService) {}

  ngOnInit() {
    this.point.x = -1;
    this.graphic = new Graphic(this.canvas);
    this.drawGraphic(1);

    this.countryService = ['1', '2', '3', '4', '11', '11111'];
  }

  setR(value) {
    this.point.r = value;
  }

  setX(value) {
    this.point.x = value;
  }

  addPoint() {
    console.log('adding point');

    if (!isNumeric(this.point.y) || !(-3 < this.point.y && this.point.y < 3)) {
      this.error('Wrong y value');
      return false;
    } else if (!isNumeric(this.point.x) && !(this.rightX.includes(this.point.x))) {
      this.error('Wrong x value');
      return false;
    } else if (!isNumeric(this.point.r) && !(this.rightR.includes(this.point.r))) {
      this.error('Wrong r value');
      return false;
    }

    this.service.addPoint(this.point).then(data => {
      this.drawPoint(<Point>data);
      this.service.getPoints();
    }).catch((err: HttpErrorResponse) => {
      console.log('err');
      if (err.status === 401 || err.status === 403) {
        this.authService.logOut();
      }
    });
    return true;
  }

  getPointsRecalculated(r) {
    console.log('getting points');
    this.service.getPointsRecalculated(r).subscribe(data => (data as Point[]).forEach(p => this.drawPoint(p)), (err: HttpErrorResponse) => {
      console.log('err');
      if (err.status === 401 || err.status === 403 ) {
        this.authService.logOut();
      }
    });
  }

  addPointFromCanvas() {
    console.log('Click on canvas');

    const br = this.canvas.nativeElement.getBoundingClientRect();
    const left = br.left;
    const top = br.top;

    const event: MouseEvent = <MouseEvent> window.event;
    const x = event.clientX - left - 5;
    const y = event.clientY - top - 5;

    const xCalculated = (x - 150) / 130 * 5;
    const yCalculated = (-y + 150) / 130 * 5;

    this.point.x = xCalculated;
    this.point.y = yCalculated;

    this.addPoint();
  }

  drawPoint(point: Point) {
    this.graphic.drawPoint(point);
  }

  drawGraphic(r) {
    this.graphic.drawGraphic(r);
    this.getPointsRecalculated(r);
  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1000;
  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {this.errorMessage = null; }, 3000);
  }

  filterCountry(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      const country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
