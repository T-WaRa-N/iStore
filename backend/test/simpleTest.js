const fetchModule = require('../fecthModule')
const chai = require('chai')
const expect = chai.expect
const assert = require('chai').assert

// describe(​'Status and content'​, ​function​() {  
//     it(​'status'​, ​function​(){ 
//        assert.equal(fetchModule(), 'Hello')
//     });   
// });

const foo = ​'bar' 
const beverages = { tea: [ ​'chai'​, ​'matcha'​, ​'oolong'​ ] }; 
 
expect(foo).to.be.a(​'string'​); 
expect(foo).to.equal(​'bar'​); 
expect(foo).to.have.lengthOf(​3​); 
expect(beverages).to.have.property(​'tea'​).with.lengthOf(​3​);