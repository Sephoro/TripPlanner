'use strict'

let firstId = null

let setPlanId = function(plans){
    firstId = plans[0]
}

let getPlanId = function(){
    return firstId
}

module.exports = {
    setPlanId: setPlanId,
    getPlanId: getPlanId
}