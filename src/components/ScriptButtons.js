import React from 'react';
import './ScriptButtons.css'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let scriptInfoIndex = state.scriptInfo.length -1;
    return {
        totalMinutes: state.scriptInfo[scriptInfoIndex].minutes,
    }
}

class ScriptButtons extends React.Component{
    constructor(props) {
        super(props);
        this.countTime = this.countTime.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.showPlayButton = false;
        this.state = {
            playOrPauseButton: <i className="far fa-play-circle fa-3x" onClick={this.handlePlayPause}></i>,
            minutes: 0, 
            seconds: 0,
            minutesSTR: 0,
            secondsSTR: '00',
        }
        let minutesString = this.props.totalMinutes.toString()
        this.goalTime = minutesString.slice(-1) === '5' ? <p className='time'>{(minutesString.substr(0, minutesString.indexOf('.')))+':30'}</p>: <p className='time'>{(minutesString)}:00</p>;
        this.count = '';
        }
    
    countTime = () => {
        if(this.state.seconds === 59){
            this.setState({minutes: this.state.minutes + 1, seconds: -1});
        }
        this.setState({seconds: this.state.seconds + 1})
        this.setState({minutesSTR: (this.state.minutes.toString()), secondsSTR: ('0' + this.state.seconds.toString()).slice(-2)})
        if(this.state.minutes*60 + this.state.seconds === this.props.goalTime*60){
            clearInterval(this.count);
        }
    }

    handlePlayPause = e => {
        if(this.showPlayButton){
            clearInterval(this.count)
            this.showPlayButton = false;
            this.props.pauseHighlight();
            this.setState(
                {playOrPauseButton: <i className="far fa-play-circle fa-3x" onClick={this.handlePlayPause}></i>,}
            )
        }else{
            this.showPlayButton = true;
            document.getElementById('nowTime').style.display='block';
            this.props.highlight();
            document.getElementById('timer').classList.remove('dont-display')
            this.count = setInterval(this.countTime, 1000);
            this.setState(
                {playOrPauseButton: <i className="far fa-pause-circle fa-3x" onClick={this.handlePlayPause}></i>}
            )
        }
    }

    render() {
        return(
            <div className='buttons-area'>
                {this.state.playOrPauseButton}
                <p id='nowTime' className='time-tag'>Now</p>
                <p id='timer' className='time dont-display'>{this.state.minutesSTR}:{this.state.secondsSTR}</p>
                <p id='goalTime' className='time-tag'>Goal</p>
                {this.goalTime}
            </div>
        );
    }
}

const ButtonOptions = connect(mapStateToProps)(ScriptButtons);

export default ButtonOptions;