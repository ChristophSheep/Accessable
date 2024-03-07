// MCQ.js
//
// Multi_Choice_Quiz

// Imports
//
import io from '../js/io.js'

// Template
//
const template = `
    <h2>{{ data.question }}</h2>

    <ul>
        <li v-for="answer in data.answers">
            <input :id="id + '_' + answer.id" v-model="state.answers_checked[answer.id]" type="checkbox" :disabled="state.locked"/>
            {{ answer.text }}
        </li>
    </ul>

    <div v-if="state.correct === true"  class="alert alert-success" role="alert">Congratulation! Correct</div>
    <div v-if="state.correct === false" class="alert alert-info"    role="alert">Sorry! Wrong answer</div>

    <button @click='submit' :disabled="state.locked">Submit</button>
    <button @click='load'   :disabled="state.locked">Load</button>
    <button @click='save'   :disabled="state.locked">Save</button>

`
// Actions
//

const defaultState = {
    //
    // Checked
    //
    answers_checked: {
        'answer_1': false,
        'answer_2': false,
        'answer_3': false,
    },
    //
    // Locked
    //
    locked: false,
    //
    // Correct
    //
    correct: undefined
}

const check_correct = (that) => {
    let correct = true
    that.data.answers.forEach(answer => {
        correct = correct && (that.state.answers_checked[answer.id] === answer.correct)
    })
    return correct
}

// Component
//
export default {
    props: ['id', 'data'],
    data() {
        return {
            state: {}
        }
    },
    template,
    methods: {
        submit() {
            // TODO: Check answers
            //
            this.state.correct = check_correct(this)
            this.state.locked = true

            this.save()
        },
        load() {
            this.state = io.loadState(this.id, defaultState)
            console.log("load", this.state)
        },
        save() {
            io.storeState(this.id, this.state)
        }
    },
    created() {
        console.log("create", this.id, this.data)
        this.load()
    },
    mounted() {
    }
}




