
export let activeEffect = null
export function effect(fn,options={}){
    const active = ()=>{
        fn()
    }
    active.options = options
    activeEffect = active
    active()
}