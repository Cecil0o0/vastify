/**
 * 深度遍历赋值对象属性
 * @param {Object} o1
 * @param {Object} o2
 */
'use strict'

const { bailRE } = require('./regex')

const ObjectDeepSet = function ObjectDeepSet(o1 = {}, o2 = {}) {
  for (let key in o1) {
    if (o1.hasOwnProperty(key) && o2.hasOwnProperty(key)) {
      if (o1[key] instanceof Array && o2[key] instanceof Array) {
        let length = (o1[key].length < o2[key].length ? o1[key].length : o2[key].length) || 0
        for (let i = 0; i < length; i++) {
          if (typeof o1[key][i] !== 'object' && typeof o2[key][i] !== 'object') {
            o1[key][i] = o2[key][i]
          } else {
            ObjectDeepSet(o1[key][i], o2[key][i])
          }
        }
      } else if (o1[key] instanceof Date && o2[key] instanceof Date) {
        o1[key] = new Date(o2[key].getTime())
      } else if (typeof o1[key] === 'object' && typeof o2[key] === 'object') {
        ObjectDeepSet(o1[key], o2[key])
      } else {
        o1[key] = o2[key]
      }
    }
  }
  return o1
}

const curry = type => param => typeof param === type

const isString = curry('string')
const isNumber = input => input === +input

/**
* Parse simple path.
*/

const parsePath = function parsePath (path) {
 if (bailRE.test(path)) {
   return
 }
 const segments = path.split('.')
 return function (obj) {
   for (let i = 0; i < segments.length; i++) {
     if (!obj) return
     obj = obj[segments[i]]
   }
   return obj
 }
}

module.exports = {
  ObjectDeepSet,
  isString,
  isNumber,
  parsePath
}
