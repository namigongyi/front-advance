import { compile } from "../compiler"
import { createVnode, createTextNode } from "./vnode"
export const Text = Symbol('Text')
export function createRenderer(options) {
    const {
        createText,
        createElement,
        insert,
        patchProp,
        setElementText
    } = options

    const patch = (vnode, container) => {
        const { tag } = vnode
        if (typeof tag === 'string') {
            mountElement(vnode, container)
        } else if (tag === Text) {
            // 挂载文本节点
            mountTextNode(vnode, container)
        }else if(typeof tag === 'object'){
            mountComponent(vnode,container)
        }
    }
    const mountElement = (vnode, container) => {
        const el = (vnode.el = createElement(vnode.tag))
        if (typeof vnode.props === 'object') {
            Object.keys(vnode.props).forEach(prop => {
                const value = vnode.props[prop]
                patchProp(el, prop, null, value)
            })
        }

        if (typeof vnode.children === 'string') {
            setElementText(el, vnode.children)
        } else if (Array.isArray(vnode.children)) {
            vnode.children.forEach(child => {
                patch(child, el) //找了10分钟  错误的地方
            })
        }
        // console.log(container)
        insert(container, el)
    }
    //vnode.el存储这次渲染出来的节点
    const mountTextNode = (vnode, container) => {
        const textNode = (vnode.el = createText(vnode.children))
        insert(container, textNode)

    }
    const unmountComponent =(container)=>{
        container.innerHTML = ''

    }
    //渲染元素
    const render = (vnode, container) => {
        if (vnode) {
            //挂载元素
            patch(vnode, container)
        } else {
            unmountComponent(container)
        }
        //储存vnode为下一次比较
        container._vnode = vnode
    }
    //不懂？？？
    // const mountComponent = (vnode, container) => {
    //     const { tag } = vnode
    //     if (!tag.render) {
    //         const { template } = tag
    //         tag.render = compile(template).render
    //     }
    //     const childVnode = tag.render.call({ _c: createVnode, _v: createTextNode })
    //     patch(childVnode, container)
    //     //render()  return this._c('div',null,this._v('xxx')
    // }
    const mountComponent = (vnode, container) => {
        // tag是组件配置选项
        const options = vnode.tag;
    
        // 如果render不存在，则需要通过编译template选项获取
        if (!options.render) {
          options.render = compile(options.template).render;
        }
    
        // 设置渲染函数需要的工具方法
        const ctx = { _c, _v };
        if (options.data) {
          Object.assign(ctx, options.data());
        }
    
        // 执行render获取组件vnode子树
        const subtree = options.render.call(ctx);
        // 向下递归
        patch(subtree, container);
      };
    //renderer
    return {
        render
    }
}

