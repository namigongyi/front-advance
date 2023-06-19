class Scope{
    constructor({parent}={}){
        this.name = []
        this.parents = parent 
    }
    add(name){
        this.name.push(name)

    }
    contains(name){
        return !!this.findDefiningScope(name)
    }
    findDefiningScope(name){
        if(this.name?.includes(name)){
            return this
        }
        if(this.parents){
            return this.parents.findDefiningScope(name)
        }
        return
    }
}

module.exports =Scope