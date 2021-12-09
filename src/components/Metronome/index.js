import React from 'react';
import './metronome.css';

class Metronome extends React.Component {
    constructor() {
        super();

        this.state = { 
            audioContext: null,
            notesInQueue: [],         // notes that have been put into the web audio and may or may not have been played yet {note, time}
            currentQuarterNote: 0,
            tempo: 160,
            lookahead: 25,          // How frequently to call scheduling function (in milliseconds)
            scheduleAheadTime: 0.1,   // How far ahead to schedule audio (sec)
            nextNoteTime: 0.0,     // when the next note is due
            isRunning: false,
            intervalID: null,
        };
    }

    componentDidMount() {
        document.getElementById("slider").value = 160;
    }

    nextNote()
    {
        // Advance current note and time by a quarter note (crotchet if you're posh)
        var secondsPerBeat = 60.0 / this.state.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
        this.state.nextNoteTime += secondsPerBeat; // Add beat length to last beat time
    
        this.state.currentQuarterNote++;    // Advance the beat number, wrap to zero
        if (this.state.currentQuarterNote == 4) {
            this.state.currentQuarterNote = 0;
        }
    }

    scheduleNote(beatNumber, time)
    {
        this.state.notesInQueue.push({ note: beatNumber, time: time });
        const osc = this.state.audioContext.createOscillator();
        const envelope = this.state.audioContext.createGain();
        
        osc.frequency.value = (beatNumber % 4 == 0) ? 1000 : 800;
        envelope.gain.value = 1;
        envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

        osc.connect(envelope);
        envelope.connect(this.state.audioContext.destination);
    
        osc.start(time);
        osc.stop(time + 0.03);
    }

    scheduler()
    {
        while (this.state.nextNoteTime < this.state.audioContext.currentTime + this.state.scheduleAheadTime ) {
            this.scheduleNote(this.state.currentQuarterNote, this.state.nextNoteTime);
            this.nextNote();
            console.log(this.state.currentQuarterNote)
            this.animate();
        }
    }

    startStop = () =>
    {
        if (this.state.isRunning) {
            this.setState({isRunning: false});
            clearInterval(this.state.intervalID);
            var circlesToRemove = document.querySelectorAll('p');
            for(var i = 0; i < circlesToRemove.length; i++) {
                circlesToRemove[i].classList.remove("active");
        }
        }
        else {
            this.setState({isRunning: true})
            if (this.state.audioContext == null){
                this.state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            this.state.currentQuarterNote = 0;
            this.state.nextNoteTime = this.state.audioContext.currentTime + 0.05;
            this.state.intervalID = setInterval(() => this.scheduler(), this.state.lookahead);
        }
    }

    animate = () => {
        var circlesToRemove = document.querySelectorAll(`p:not([num="${this.state.currentQuarterNote}"])`);
        for(var i = 0; i < circlesToRemove.length; i++) {
            circlesToRemove[i].classList.remove("active");
        }
        document.querySelector(`[num="${this.state.currentQuarterNote}"]`).classList.add("active");
    }

    render() {
        return (
            <div id="metronome">
                <div class="metronome-animate">
                    <p class="metronome-circle" num="1"></p>
                    <p class="metronome-circle" num="2"></p>
                    <p class="metronome-circle" num="3"></p>
                    <p class="metronome-circle" num="0"></p>
                </div>
                <h3 id="tempo">{this.state.tempo} BPM</h3>
                <input id="slider" class="slider" type="range" min="20" max="300" onChange={(e) => this.setState({tempo: e.target.value})}/>
                <button onClick={this.startStop}>{this.state.isRunning ? "Stop" : "Start"}</button>
            </div>
        );
    }
}

export default Metronome;