export default function ({ store, route, redirect }) {
  store.commit('nboard/resetDebugCode')

  const currentMenu = store.getters['menus/all'].find((menu) => {
    return route.path.startsWith(menu.to.split('/')[1], 1)
  })

  if (typeof currentMenu !== 'undefined') {
    store.commit('nboard/setSubmenus', currentMenu.submenus)
  } else if (route.name === 'profile') {
    store.commit('nboard/setSubmenus', [])
  }

  store.commit('nboard/closeSidebar')

  if (route.name === 'index') {
    redirect('/dashboard')
  }
}
