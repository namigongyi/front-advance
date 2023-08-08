class Environment{
    constructor(){
        this.vars = new Map()
    }
    set(property,value){
          this.vars.set(property,value)
    }
    get(property){
       return this.vars.get(property)
    }
}

module.exports = Environment