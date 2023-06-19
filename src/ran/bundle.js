const Module=  require('../../teachers/lib/module')
const fs =require("fs")
const path = require('path')
const MagicString = require("magic-string")
class Bundle{
    constructor({entery}){
        this.entery = entery
    }
    /**
     * 
     * @param {*} importee 
     * @param {*} importor 
     * @returns 
     */
    fetchModule(importee,importor){
        let route
        if(!importor){
            //主模块
            route= importee
        }else{
            //计算相对于importee的路径
            //绝对路径 '/abc/abc'
            //相对路劲  '../abc'
            if(path.isAbsolute(importee)){
                route= importee
            }else{
                //相对路径
                route=path.resolve(
                    path.dirname(importor),
                    importee.replace(/\.js$/,'')+'.js'
                    )
            }
        }
        
        if(route){
            //读取代码
            const code = fs.readFileSync(route,'utf-8').toString()
            const module = new Module({
                code,
                path: route,
                bundle: this // 上下文
            })
            return module
        }

    }
    build(outputFileName){
        const enteryModule =this.fetchModule(this.entery)
        this.statement = enteryModule.expandAllStatement()
        const {code} = this.generate()
        fs.writeFileSync(outputFileName,code,'utf-8')
    }
    generate(){
        const magicString = new MagicString.Bundle()
        this.statement.forEach(statement => {
            const source = statement._source.clone()

            // export const a = 1 =>  const a = 1
            if (statement.type === 'ExportNamedDeclaration') {
                source.remove(statement.start, statement.declaration.start)
            }
            magicString.addSource({
                content: source,
                separator: '\n'
            })
        })
        return { code: magicString.toString() }
    }
}
module.exports = Bundle
