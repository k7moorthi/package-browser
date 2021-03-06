import { Component, Input } from '@angular/core';

import { Package } from '../../entities/package';

@Component({
  selector: 'pb-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() package: Package;
}
