class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        console.log("Test")
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;

        // State instances get access to the state machine via this.stateMachine.
        
    }

    step() {
        // On the first step, the state is null and we need to initialize the first state.
        //Spread operator, will grab the state in possible states, so punch.enter(args), where args's elements are expanded
        if (this.state === null) {
            for (const state of Object.values(this.possibleStates)) {
                state.stateMachine = this;
            }
            this.state = this.initialState;
            this.possibleStates[this.state].enter(...this.stateArgs);
        }
        
        // Run the current state's execute
        this.possibleStates[this.state].execute(...this.stateArgs);
    }

    //Rest parameter, used to gather any number of arguments into an array
    transition(newState, ...enterArgs) {
        this.state = newState;
        this.possibleStates[this.state].enter(...this.stateArgs, ...enterArgs);
    }
}

class State {
    enter() {

    }

    execute() {

    }
}

class IdleState extends State {
    enter(scene, player, controls) {
        player.setVelocityX(0);
        player.anims.stop();
    }

    execute(scene, player, controls) {
        // /console.log(controls)
        if(controls.keys.left.isDown || controls.keys.right.isDown)
            this.stateMachine.transition('move')
    }
}

class MoveState extends State {
    enter(scene, player, controls) {
        console.log('Move')
    }

    execute(scene, player, controls) {

    }
}

module.exports = {
    StateMachine: StateMachine,
    State: State,
    IdleState: IdleState,
    MoveState: MoveState
}