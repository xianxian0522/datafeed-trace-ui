import { Component, OnInit } from '@angular/core';
import {MenuItem, MenuItems} from '../menu';
import {Location} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    private menuItems: MenuItems,
    private location: Location,
    private title: Title
  ) { }

  isCollapsed = false;
  section: string;
  sections: MenuItem[];
  sectionItem: MenuItem[];

  ngOnInit(): void {
    this.sections = this.menuItems.getAllSections();
    const url = this.location.path();
    console.log(url, location.pathname);
    this.section = url.split('/')[1];
    this.sectionItem = this.menuItems.getItems(this.section);
    const titleName = this.sectionItem.filter(v => v.id === url.split('/')[2]).map(n => n.name)[0];
    this.title.setTitle(this.section.toUpperCase() + '-' + titleName);
    this.location.onUrlChange(r => {
      const t = this.sectionItem.filter(v => v.id === r.split('/')[2]).map(n => n.name)[0];
      this.title.setTitle(this.section.toUpperCase() + '-' + t);
    });
  }

}
