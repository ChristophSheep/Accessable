// IO.js

// Constants
//

// Scorm Run Time 1.2
//
// see https://scorm.com/scorm-explained/technical-scorm/run-time/run-time-reference/?utm_source=google&utm_medium=natural_search

const CMI_STATE = 'cmi.suspend_data' // session_state of course
const CMI_INT_RESULT = `cmi.interactions.{{n}}.result` // 'correct'
const CMI_INT_TYPE = `cmi.interactions.{{n}}.type` // 'choice'
const CMI_INT_ID = `cmi.interactions.{{n}}.id` // 'm-300'

const CMI_OBJS_ID = `cmi.objectives.{{n}}.id` // (CMIIdentifier, RW) //Unique label for the objective
//cmi.objectives.{{n}}.score._children (raw,min,max, RO) Listing of supported data model elements
const CMI_OBJS_SCORE_RAW = `cmi.objectives.{{n}}.score.raw` // (CMIDecimal, RW) // Number that reflects the performance of the learner, for the objective, relative to the range bounded by the values of min and max
const CMI_OBJS_SCORE_MAX = `cmi.objectives.{{n}}.score.max` // (CMIDecimal, Rw) // Maximum value, for the objective, in the range for the raw score
const CMI_OBJS_SCORE_MIN = `cmi.objectives.{{n}}.score.min` // (CMIDecimal, RW) // Minimum value, for the objective, in the range for the raw score
const CMI_OBJS_SCORE_STATUS = `cmi.objectives.{{n}}.status` // (“passed”, “completed”, “failed”, “incomplete”, “browsed”, “not attempted”, RW) Indicates w


// Example States of two components
//
const example_states = {
    'm-100': {
        //
        // Checked
        //
        answers_checked: {
            'answer_1': false,
            'answer_2': true,
            'answer_3': false,
        },
        //
        // Locked
        //
        locked: false
    },
    'm-200': {
        //
        // Checked
        //
        answers_checked: {
            'answer_1': true,
            'answer_2': false,
            'answer_3': false,
        },
        //
        // Locked
        //
        locked: true
    }
}

const deepCopy_ = (obj) => JSON.parse(JSON.stringify(obj))

// Functions
//
const loadStates = () => {
    let suspendDataBase64 = pipwerks.SCORM.get(CMI_STATE)
    if (suspendDataBase64 === undefined || suspendDataBase64 === '') {
        return {}
    }
    const jsonStr = atob(suspendDataBase64)
    return JSON.parse(jsonStr)
}

const saveStates = (states) => {
    const jsonStr = JSON.stringify(states)
    const suspendDataBase64 = btoa(jsonStr)
    pipwerks.SCORM.set(CMI_STATE, suspendDataBase64)
    return states
}

const storeState = (componentId, state) => {
    const states = loadStates()
    states[componentId] = state
    console.log("save - states:", states)
    saveStates(states)
}

const loadState = (componentId, defaultState) => {
    let states = loadStates()
    console.log("load - states:", states)
    if (componentId in states) {
        return states[componentId]
    }
    states[componentId] = deepCopy_(defaultState)
    console.log("load - states:", states)
    return states[componentId]
}

export default {
    storeState,
    loadState
}