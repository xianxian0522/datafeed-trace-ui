创建带路由的模块
`ng g module module --routing`

创建组件
`ng g c component`

导航栏的模块在menu.ts中的ALL_SECTIONS增加
```ts
{
    id: MODULE1,
    name: '模块1',
    icon: '',
},
```

菜单栏的子组件在menu.ts中的MENUS增加
```ts
[MODULE1]: [
    {
      id: 'menu1',
      name: '菜单1',
      icon: 'menu',
    }
],
```

模块的路由在layout.routing.module.ts中增加

菜单里的子路由在对应的模块路由里增加。
增加的Zorro里的组件都需要在对于的模块中引入Zorro组件模块

