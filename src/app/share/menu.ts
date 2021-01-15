import {Injectable} from '@angular/core';

export interface MenuItem {
  id: string;
  name: string;
  icon: string;
}

const MODULE1 = 'module1';
const MODULE2 = 'module2';
const MENUS: {[key: string]: MenuItem[]} = {
  [MODULE1]: [
    {
      id: 'menu1',
      name: '菜单1',
      icon: 'menu',
    },
    {
      id: 'menu2',
      name: '菜单2',
      icon: 'menu',
    }
  ],
  [MODULE2]: [
    {
      id: 'menu21',
      name: '菜单21',
      icon: 'menu',
    },
    {
      id: 'menu22',
      name: '菜单22',
      icon: 'menu',
    }
  ],
};
const ALL_MODULE1 = MENUS[MODULE1];
const ALL_MODULE2 = MENUS[MODULE2];
const ALL_SECTIONS: MenuItem[] = [
  {
    id: MODULE1,
    name: '模块1',
    icon: '',
  },
  {
    id: MODULE2,
    name: '模块2',
    icon: '',
  }
];

@Injectable({
  providedIn: 'root'
})
export class MenuItems {
  getAllSections(): MenuItem[] {
    return ALL_SECTIONS;
  }

  getItems(section: string): MenuItem[]{
    if (section === MODULE1) {
      return ALL_MODULE1;
    }
    if (section === MODULE2) {
      return ALL_MODULE2;
    }
    return [];
  }
}
