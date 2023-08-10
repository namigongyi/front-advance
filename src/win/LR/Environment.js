class Environment{
    constructor(parent){
        this.parent = parent
        this.vars = new Map()
    }
    set(property,value){
        if(this.vars.has(property) || !this.parent){
            this.vars.set(property,value)
        }else {
            this.parent.set(property,value)
        }
        return value
    }
    get(property){//作用域链
        if(this.vars.has(property) || !this.parent){
            return  this.vars.get(property)
        }else {
            return this.parent.get(property)
        }
    }
}

module.exports = Environment