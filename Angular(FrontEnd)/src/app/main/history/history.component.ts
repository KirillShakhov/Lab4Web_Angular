import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Point} from '../../model/point';
import {PointsService} from '../../services/points/points.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  public points: Point[];

  constructor(private service: PointsService) { }

  ngOnInit() {
    this.service.points.subscribe(value => this.points = value.sort((p1, p2) => p1.id - p2.id));
    this.service.getPoints();
  }

}
