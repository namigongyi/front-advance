class Reference{
constructor(object,property){
    this.object = object
    this.property = property
}
    set(val){
        // this.object[this.property] = val
        this.object.set(this.property,val)
    }
    get(){
        // return  this.object[this.property]
        return this.object.get(this.property)
    }
}

module.exports = Reference