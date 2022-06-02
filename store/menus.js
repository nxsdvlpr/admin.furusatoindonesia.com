export const state = () => ({
  defaultMenus: [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'home',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [],
    },
    {
      label: 'Program',
      to: '/program/expertise',
      icon: 'category',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [
        {
          label: 'Expertise',
          to: '/program/expertise',
          roleGuard: ['admin'],
        },
        {
          label: 'Project',
          to: '/program/project',
          roleGuard: ['admin'],
        },
        {
          label: 'Impact',
          to: '/program/impact',
          roleGuard: ['admin'],
        },
        {
          label: 'Work With Us',
          to: '/program/work-with-us',
          roleGuard: ['admin'],
        },
      ],
    },
    {
      label: 'Publication',
      to: '/publication/blog',
      icon: 'document',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [
        {
          label: 'Blog',
          to: '/publication/blog',
          roleGuard: ['admin'],
        },
        {
          label: 'Timeline',
          to: '/publication/timeline',
          roleGuard: ['admin'],
        },
      ],
    },
    {
      label: 'Resource',
      to: '/resource',
      icon: 'folder',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [],
    },
    {
      label: 'About Us',
      to: '/about-us',
      icon: 'info-circle',
      place: 'main',
      roleGuard: ['admin'],
      submenus: [
        {
          label: 'Mission and Vision',
          to: '/about-us/mission-vision',
          roleGuard: ['admin'],
        },
        {
          label: 'Organization',
          to: '/about-us/organization/structure',
          roleGuard: ['admin'],
        },
        {
          label: 'Our History',
          to: '/about-us/our-history',
          roleGuard: ['admin'],
        },
      ],
    },
    {
      label: 'Setting',
      to: '/setting/general#site',
      icon: 'setting',
      place: 'bottom',
      roleGuard: ['admin'],
      submenus: [
        {
          label: 'General',
          to: '/setting/general#site',
          roleGuard: ['admin'],
        },
        {
          label: 'Users Management',
          to: '/setting/user',
          roleGuard: ['admin'],
        },
      ],
    },
  ],
  list: [],
})

export const getters = {
  main: (state) => state.list.filter((menu) => menu.place === 'main'),
  bottom: (state) => state.list.filter((menu) => menu.place === 'bottom'),
  all: (state) => state.list,
}

export const actions = {
  setMenus: ({ commit }, role) => {
    commit('SET_MENUS', role)
  },
  unsetMenus: ({ commit }) => {
    commit('UNSET_MENUS')
  },
}

export const mutations = {
  SET_MENUS: (state, role) => {
    const defaultMenus = JSON.parse(JSON.stringify(state.defaultMenus))
    const filteredMenu = defaultMenus
      .filter((menu) => menu.roleGuard.includes(role))
      .map((menu) => {
        menu.submenus = menu.submenus.filter((submenu) =>
          submenu.roleGuard.includes(role)
        )
        return menu
      })

    state.list = filteredMenu
  },
  UNSET_MENUS: (state) => {
    state.list = []
  },
}
