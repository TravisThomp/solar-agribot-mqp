const transmitter = require("../devices/transmitter");

let routines = new Map()

/**
 * To-Do Save routines to file
 * To-Do save
 */

const beginRobotScheduler = () => {
    
}

const onRoutineCompletion = (routine) => {
    if(routine.isRecurring()) {
        routine.schedule()
        return
    } else {
        routines.delete(routine.name)
    }
}

module.exports = {
    addRoutine: (routine) => {
        routines.set("id", routine)
        routine.schedule(onRoutineCompletion)
    },

}