import { format, parseISO } from 'date-fns'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import { format as formatWithTz, utcToZonedTime } from 'date-fns-tz'
import { colors } from './colors-es6'

TimeAgo.addDefaultLocale(en)

const __ = (() => {
  'use strict'

  const methods = {}

  /* Format [num] to Indonesian currency */
  methods.currency = function (num) {
    if (num === null || num === undefined) {
      return 0
    }

    return num.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  }

  /* Format ISO [date] to given format. */
  methods.formatDate = function (
    datetime,
    f = 'dd/MM/yyyy',
    tz = 'Asia/Jakarta'
  ) {
    if (isNaN(Date.parse(datetime))) {
      return false
    }

    const date = utcToZonedTime(parseISO(datetime), tz)

    return formatWithTz(date, f)
  }

  methods.timeAgo = function (datetime, tz = 'Asia/Jakarta') {
    const date = methods.formatDate(
      datetime,
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
      tz
    )

    const timeAgo = new TimeAgo('en-US')

    return timeAgo.format(new Date(date))
  }

  /* Format ISO [date] to Indonesian date format. Vue-good-table use ISO Date. */
  methods.shortDate = function (datetime) {
    return typeof datetime === 'object'
      ? format(datetime, 'dd/MM/yyyy')
      : format(parseISO(datetime), 'dd/MM/yyyy')
  }

  /*
  Return random integer  for specific [length]
  or from [min] to [max]. [min] and [max] are inclusive
  */
  methods.randomInt = function (...args) {
    if (typeof args[1] === 'undefined') {
      const numbers = '0123456789'

      let result = ''
      const numbersLength = numbers.length
      for (let i = 0; i < args[0]; i++) {
        result += numbers.charAt(Math.floor(Math.random() * numbersLength))
      }
      return result
    }

    const min = Math.ceil(args[0])
    const max = Math.floor(args[1])
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /* Return random characters for specific [length] */
  methods.randomChar = function (length = 6) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    let result = ' '
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  /* Return random characters/numbers for specific [length] */
  methods.uniqueId = function (length = 6) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    let result = ' '
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }

  /* Return random element from an arrays */
  methods.sample = (arr) => arr[Math.floor(Math.random() * arr.length)]

  /* Return random Boolean */
  methods.trueFalse = function () {
    return this.sample([true, false])
  }

  /* Return URL friendly "slug" from the given string */
  methods.strSlug = function (str = '') {
    return str
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }

  /* Check number is positive or negative */
  methods.isPositiveNumber = function (number = 0) {
    if (Math.sign(number) > 0) {
      return true
    }
    return false
  }

  /* Convert number to sort string format */
  methods.prettyNumber = function (number, digits) {
    const units = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']
    let decimal

    for (let i = units.length - 1; i >= 0; i--) {
      decimal = Math.pow(1000, i + 1)

      if (number <= -decimal || number >= decimal) {
        return +(number / decimal).toFixed(digits) + units[i]
      }
    }

    return number
  }

  /* Return color set */
  methods.color = function (index = 0, color = null) {
    if (color) {
      return colors[index][color]
    }
    return colors[index]
  }

  /* Return color set */
  methods.colors = function () {
    return colors
  }

  methods.days = function (format = 'sort') {
    if (format === 'sort') {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }

    return [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]
  }

  methods.resizeElementFullHeight = function (elementId) {
    const el = document.getElementById(elementId)
    if (el) {
      el.style.height = el.parentElement.clientHeight + 'px'
    }
    // el.style.height = el.parentElement.clientHeight
    // console.log(el.style.height)
    // let height = 0
    // const body = window.document.body
    // if (window.innerHeight) {
    //   height = window.innerHeight
    // } else if (body.parentElement.clientHeight) {
    //   height = body.parentElement.clientHeight
    // } else if (body && body.clientHeight) {
    //   height = body.clientHeight
    // }
    // el.style.height = height - el.offsetTop + 'px'
  }

  methods.resizeElementFullWidth = function (elementId) {
    const el = document.getElementById(elementId)
    if (el) {
      el.style.width = el.parentElement.clientWidth + 'px'
    }
  }

  methods.moveRoomToBottom = function (parentId) {
    if (!parentId) {
      return false
    }

    const osViewportEl = parentId.getElementsByClassName('os-viewport')[0]
    const osContentEl = parentId.getElementsByClassName('os-content')[0]

    if (!osViewportEl || !osContentEl) {
      return false
    }

    const osViewportElHeight = osViewportEl.scrollHeight
    const osContentElHeight = osContentEl.scrollHeight

    if (osViewportElHeight < 1 || osContentElHeight < 1) {
      return false
    }

    if (osViewportElHeight - osContentElHeight > 50) {
      osContentEl.classList.add('force-move-bottom')
      const noMoreEl = osContentEl.getElementsByClassName('no-more-message')[0]
      noMoreEl.style.display = 'none'
    } else {
      osContentEl.classList.remove('force-move-bottom')
    }
  }

  methods.b64DecodeUnicode = function (str) {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(str),
          (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join('')
    )
  }

  methods.parseJwt = function (token) {
    return JSON.parse(
      methods.b64DecodeUnicode(
        token.split('.')[1].replace('-', '+').replace('_', '/')
      )
    )
  }

  methods.parseIdsToInt = (obj, fields = []) => {
    try {
      if (obj instanceof Array) {
        obj.map((el) => __.parseIdsToInt(el, fields))
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key of Object.keys(obj)) {
          __.parseIdsToInt(obj[key], fields)
          if (obj[key] instanceof Array) {
            __.parseIdsToInt(obj[key], fields)
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            __.parseIdsToInt(obj[key], fields)
          } else if (fields.includes(key)) {
            obj[key] = +obj[key]
          }
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  methods.mergeArrayByKey = (arr1 = [], arr2 = [], key = 'id') => {
    let res = []
    res = arr1.map((obj) => {
      const index = arr2.findIndex((el) => el[key] === obj[key])
      return {
        ...obj,
        ...arr2[index],
      }
    })
    return res
  }

  methods.getInitials = (fullname) => {
    const name = fullname.trim().split(' ')
    const initials = name.reduce((acc, curr, index) => {
      if (index === 0 || index === name.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`
      }
      return acc
    }, '')

    return initials
  }

  methods.prettyPhoneNumber = (phone) => {
    if (!phone) {
      return phone
    }

    return phone
      .trim()
      .replace(/^\+?62/, '0')
      .replace(/\d{4}(?=.)/g, '$&-')
      .replace(/-(\d{1,3})$/, '$1')
  }

  methods.zeroLeadPhoneNumber = (phone) => {
    if (!phone) {
      return phone
    }
    return phone.trim().replace(/^\+?62/, '0')
  }

  return methods
})()

export default __
