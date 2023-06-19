
import { activeEffect } from "./effect"
export function reactive(params) {
  const proxy = {
    get: (obj, prop, receiver) => {
      // console.log(`${obj[prop]},${prop}`)
      const res=Reflect.get(obj, prop)
      track(obj, prop)
      return res
    },
    set: (obj, prop, receiver) => {
      const res = Reflect.set(obj, prop, receiver) //已经赋值，但是过程还没结束
      trigger(obj, prop)
      return res

    },
    deleteProperty: (obj, prop, value) => {
      // console.log(`${obj},${prop}`)
      return Reflect.defineProperty(obj, prop)
    }

  }
  return new Proxy(params, proxy)

}
let targetMap = new WeakMap()
function track(params, key) {
  let _depsMap = targetMap.get(params)
  if (!_depsMap) {
    _depsMap = new Map()
    targetMap.set(params, _depsMap)
  }
  let _deps = _depsMap.get(key)
  if (!_deps) {
    _deps = new Set()
    _depsMap.set(key, _deps)
  }
  _deps.add(activeEffect)
}
function trigger(target, key) {
  const _depsMap = targetMap.get(target)
  if (_depsMap) {
    const _deps = _depsMap.get(key)
    if (_deps) {
      _deps.forEach(dep => {
        if (dep?.options?.scheduler) {
          dep.options.scheduler(dep)
        } else {
          dep && dep()
        }
      })
    }
  }
}