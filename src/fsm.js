class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.activeState = config.initial;
        this.history = [config.initial];
        this.clearedHistory = [];
   
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
       if (this.config.states[state] !== undefined) {
            this.activeState = state;
            this.history.push(this.activeState);
            this.clearedHistory.length = 0;
        } else {
            throw new Error;
        }

    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.activeState].transitions[event] !== undefined) {
            this.activeState = this.config.states[this.activeState].transitions[event];
            this.history.push(this.activeState);
            this.clearedHistory.length = 0;
        } else {
            throw new Error;
        }
    }
    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.activeState = this.config.initial;
        this.history.push(this.activeState);
        this.clearedHistory.length = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var statesArray = [];
        for (var state in this.config.states) {
	        if (this.config.states[state].transitions[event] !== undefined) {
		        statesArray.push(state);
            }
            else if (event === undefined) {
                statesArray.push(state);
            }
        }
        return statesArray;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 1) {
           this.clearedHistory.push(this.history.pop());
           this.activeState = this.history[this.history.length - 1];
           return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.clearedHistory.length !== 0) {
            this.history.push(this.clearedHistory.pop());
            this.activeState = this.history[this.history.length - 1];
            return true;
        } else {
            return false;
        }

    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history.length = 1;
        this.clearedHistory.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
