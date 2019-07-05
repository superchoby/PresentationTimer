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
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.showPlayButton = false;
        this.state = {
            playOrPauseButton: <i className="far fa-play-circle fa-3x" onClick={this.handlePlayPause}></i>,
        }
        let minutesString = this.props.totalMinutes.toString()
        // this.goalTime = minutesString.slice(-1) === '5' ? <p className='time'>{('0'+minutesString.substr(0, minutesString.indexOf('.'))).slice(-2)+':30'}</p>: <p className='time'>{('0'+minutesString).slice(-2)}:00</p>;
        this.goalTime = minutesString.slice(-1) === '5' ? <p className='time'>{(minutesString.substr(0, minutesString.indexOf('.')))+':30'}</p>: <p className='time'>{(minutesString)}:00</p>;
    }

    handlePlayPause = e => {
        if(this.showPlayButton){
            this.showPlayButton = false;
            this.setState(
                {playOrPauseButton: <i className="far fa-play-circle fa-3x" onClick={this.handlePlayPause}></i>,}
            )
        }else{
            this.showPlayButton = true;
            this.setState(
                {playOrPauseButton: <i className="far fa-pause-circle fa-3x" onClick={this.handlePlayPause}></i>,}
            )
        }
        document.getElementById('nowTime').style.display='block';
        this.props.handleClick();
    }
    
    render() {
        return(
            <div className='buttons-area'>
                {this.state.playOrPauseButton}
                <p id='nowTime' className='time-tag'>Now</p>
                {this.props.watch}
                <p id='goalTime' className='time-tag'>Goal</p>
                {this.goalTime}
            </div>
        );
    }
}

const ButtonOptions = connect(mapStateToProps)(ScriptButtons);

export default ButtonOptions;