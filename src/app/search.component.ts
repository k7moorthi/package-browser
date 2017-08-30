import { Component, OnInit }      from '@angular/core';
import { ElementRef, ViewChild }  from '@angular/core';
import { Router }                 from '@angular/router';

import { Observable }             from 'rxjs/Observable';
import { Subject }                from 'rxjs/Subject';

import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import { Package }        from './package';
import { PackageService } from './package.service';

@Component({
  selector: 'search-page',
  templateUrl: './search.component.html',
  styleUrls: [ './search.component.css' ]
})

export class SearchComponent implements OnInit {
  @ViewChild('searchBox') searchBox:ElementRef;

  packages: Observable<Package[]>;
  private keywords = new Subject<string>();

  constructor(
    private packageService: PackageService,
    private router: Router) {}

  search(keyword: string): void {
    this.keywords.next(keyword);
  }

  ngOnInit(): void {
    this.packages = this.keywords
      .distinctUntilChanged()
      .switchMap(keyword => keyword
        ? this.packageService.searchByKeyword(keyword)
        : Observable.of<Package[]>([]))
      .catch(error => {
        console.log(error);

        return Observable.of<Package[]>([]);
      });
  }

  ngAfterViewInit(): void {
    this.searchBox.nativeElement.focus();
  }
}