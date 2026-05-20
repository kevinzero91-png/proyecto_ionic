import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false,
})
export class ToolbarComponent  implements OnInit {

  @Input('nombre') nombre: string | undefined;
  @Input('color') color: string="verde";
  constructor() { }

  ngOnInit() {}

}
