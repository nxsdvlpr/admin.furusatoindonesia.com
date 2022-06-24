export const state = () => ({
  defaultMenus: [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'home',
      place: 'main',
      accessName: 'home',
      submenus: [],
    },
    {
      label: 'Program',
      to: '/program/expertise',
      icon: 'category',
      place: 'main',
      accessName: 'home',
      submenus: [
        {
          label: 'Expertise',
          to: '/program/expertise',
          accessName: 'home',
        },
        {
          label: 'Project',
          to: '/program/project',
          accessName: 'home',
        },
        {
          label: 'Impact',
          to: '/program/impact',
          accessName: 'home',
        },
        {
          label: 'Work With Us',
          to: '/program/work-with-us/reach-us',
          accessName: 'home',
        },
      ],
    },
    {
      label: 'Publication',
      to: '/publication/blog',
      icon: 'document',
      place: 'main',
      accessName: 'publication',
      submenus: [
        {
          label: 'Blog',
          to: '/publication/blog',
          accessName: 'publication_blog',
        },
        {
          label: 'Timeline',
          to: '/publication/timeline',
          accessName: 'publication_timeline',
        },
      ],
    },
    {
      label: 'Resource',
      to: '/resource',
      icon: 'folder',
      place: 'main',
      accessName: 'resource',
      submenus: [],
    },
    {
      label: 'About Us',
      to: '/about-us/at-a-glance#page-header',
      icon: 'info-circle',
      place: 'main',
      accessName: 'home',
      submenus: [
        {
          label: 'At A Glance ',
          to: '/about-us/at-a-glance#page-header',
          accessName: 'home',
        },
        {
          label: 'Mission and Vision',
          to: '/about-us/mission-vision',
          accessName: 'home',
        },
        {
          label: 'Organization',
          to: '/about-us/organization/structure',
          accessName: 'home',
        },
        {
          label: 'Our History',
          to: '/about-us/our-history',
          accessName: 'home',
        },
      ],
    },
    {
      label: 'Contact Us',
      to: '/contact-us/message',
      icon: 'message',
      place: 'main',
      accessName: 'home',
      submenus: [
        {
          label: 'Message',
          to: '/contact-us/message',
          accessName: 'home',
        },
      ],
    },
    {
      label: 'Setting',
      to: '/setting/general#site',
      icon: 'setting',
      place: 'bottom',
      accessName: 'setting',
      submenus: [
        {
          label: 'General',
          to: '/setting/general#site',
          accessName: 'setting_general',
        },
        {
          label: 'Pages',
          to: '/setting/pages/home',
          accessName: 'home',
        },
        {
          label: 'Testimony',
          to: '/setting/testimony',
          accessName: 'home',
        },
        {
          label: 'Partner',
          to: '/setting/partner',
          accessName: 'home',
        },
        {
          label: 'Office',
          to: '/setting/office',
          accessName: 'home',
        },
        {
          label: 'Users Management',
          to: '/setting/user',
          accessName: 'setting_user_management',
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

    const accesses = Object.entries(role.access)

    const filteredMenu = defaultMenus
      .filter((menu) =>
        accesses.find((i) => i[0].startsWith(menu.accessName) && i[1])
      )
      .map((menu) => {
        menu.submenus = menu.submenus.filter((submenu) =>
          accesses.find((i) => i[0].startsWith(submenu.accessName) && i[1])
        )

        return menu
      })

    state.list = filteredMenu
  },
  UNSET_MENUS: (state) => {
    state.list = []
  },
}
