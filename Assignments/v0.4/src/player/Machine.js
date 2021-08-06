class StateMachine {
    constructor(initialState, possibleStates, stateArgs=[]) {
        this.initialState = initialState;
        this.possibleStates = possibleStates;
        this.stateArgs = stateArgs;
        this.state = null;
      
    }

    step() {
        // On the first step, the state is null and we need to initialize the first state.
        //Spread operator, will grab the state in possible states, so punch.enter(args), where args's elements are expanded
        if (this.state === null) {
            // State instances get access to the state machine via this.stateMachine
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

    getState() {
        return this.state;
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
        console.log("Idle")
        player.play('idle')
    }

    execute(scene, player, controls) {
        // /console.log(controls)
        if(controls.keys.left.isDown || controls.keys.right.isDown)
            this.stateMachine.transition('move')
        else if(controls.keys.shift.isDown)
            this.stateMachine.transition('punch')
        else if(controls.keys.space.isDown)
            this.stateMachine.transition('kick')
        else if(controls.keys.down.isDown)
            this.stateMachine.transition('guard')
    }
}

class MoveState extends State {
    enter(scene, player, controls) {
        console.log('Move')
    }

    execute(scene, player, controls) {
        if(controls.keys.left.isDown) {
            player.setFlip(true, false);
            player.x -= 2;
            player.play('move', true)
        }
        else if(controls.keys.right.isDown) {
            player.setFlip(false, false);
            player.x += 2;
            player.play('move', true)
        }
        else if(controls.keys.shift.isDown)
            this.stateMachine.transition('punch')
        else if(controls.keys.space.isDown)
            this.stateMachine.transition('kick')
        else if(controls.keys.down.isDown)
            this.stateMachine.transition('guard')
        else {
            this.stateMachine.transition('idle')
        }

    }
}

class GuardState extends State {
    enter(scene, player, controls) {
        console.log('Guard')
    }

    execute(scene, player, controls) {
        if(controls.keys.down.isDown)
            player.play('guard', true);
        else if(controls.keys.left.isDown || controls.keys.right.isDown)
            this.stateMachine.transition('move')
        else if(controls.keys.shift.isDown)
            this.stateMachine.transition('punch')
        else if(controls.keys.space.isDown)
            this.stateMachine.transition('kick')
        else
            this.stateMachine.transition('idle')
    }
}

class DashState extends State {
    enter(scene, player, controls) {
        console.log('Dash')
        player.play('dash', true);
        var distance = player.flipX == true ? -150 : 150;
        scene.tweens.add({
            targets: player,
            x: player.x + distance,
            duration: 250,
            ease: 'Power1', 
            onComplete: function() {
                player.StateMachine.transition('idle')
            },
        });   
        //if(player.flipX == true)
        //    player.setVelocityX(-15)
        //else
        //    player.setVelocityX(15)

        //player.once('animationcomplete', () => {
        //    this.stateMachine.transition('idle')
        //})
    }

    execute(scene, player, controls) {

    }
}

class PunchState extends State {
    enter(scene, player, controls) {
        console.log('Punch')
        player.play('punch', true);
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player, controls) {

    }
}

class KickState extends State {
    enter(scene, player, controls) {
        console.log('Kick')
        player.play('kick', true);
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player, controls) {
        var a = 10
        console.log(a++)
    }
}

module.exports = {
    StateMachine: StateMachine,
    State: State,
    IdleState: IdleState,
    MoveState: MoveState,
    GuardState: GuardState,
    DashState: DashState,
    PunchState: PunchState,
    KickState: KickState
}