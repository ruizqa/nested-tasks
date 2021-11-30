import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested-component.component.html',
  styleUrls: ['./nested-component.component.css']
})
export class NestedComponentComponent implements OnInit {
  @Input() taskToShow: any;
  constructor() { }

  ngOnInit(): void {
  }

}
