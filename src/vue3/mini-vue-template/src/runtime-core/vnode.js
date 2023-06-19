import { Text } from "."
export const createVnode = (tag,props,children) =>{
 return {tag,props,children}
}
export const createTextNode =(tag)=>{
    return createVnode(Text,null,tag)
}