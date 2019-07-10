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
            playOrPauseButton: <i className="far fa-play-circle fa-3x icon" title='Play' onClick={this.handlePlayPause}></i>,
            minutes: 0, 
            seconds: 0,
            minutesSTR: 0,
            secondsSTR: '00',
            transitionTime: this.props.totalMinutes*60,
        }
        let minutesString = this.props.totalMinutes.toString()
        this.goalTime = minutesString.slice(-1) === '5' ? <p className='time'>{(minutesString.substr(0, minutesString.indexOf('.')))+':30'}</p>: <p className='time'>{(minutesString)}:00</p>;
        this.count = '';
        this.handleRewind = this.handleRewind.bind(this);
        this.rewindInput = '';
        this.highlight = this.highlight.bind(this);
        this.pauseHighlight = this.pauseHighlight.bind(this);
        this.handleRewindEnter = this.handleRewindEnter.bind(this);
        this.handleRewindSeconds = this.handleRewindSeconds.bind(this);
        this.handleFastForwardEnter = this.handleFastForwardEnter.bind(this);
        this.handleFastForwardSeconds = this.handleFastForwardSeconds.bind(this);
        }
    
    highlight = e => {
        let script = document.getElementById('script');
        script.style.backgroundPosition = null;
        script.style.transition = (this.state.transitionTime).toString() + 's linear';
        script.classList.add('highlight');
        this.forceUpdate();
    }

    pauseHighlight = e => {
        let script = document.getElementById('script');
        script.style.transition = '';
        let computedStyle = window.getComputedStyle(script);
        let currentBackgroundPos = computedStyle.getPropertyValue('background-position');
        script.style.backgroundPosition = currentBackgroundPos;
        script.classList.remove('highlight');
        this.forceUpdate();
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
            document.getElementById('rewind').classList.remove('dont-display');
            document.getElementById('fastForward').classList.remove('dont-display');
            this.pauseHighlight();
            this.setState(
                {playOrPauseButton: <i className="far fa-play-circle fa-3x icon" title='Play' onClick={this.handlePlayPause}></i>,}
            )
        }else{
            this.showPlayButton = true;
            document.getElementById('nowTime').style.display='block';
            this.highlight();
            document.getElementById('timer').classList.remove('dont-display')
            document.getElementById('rewind').classList.add('dont-display');
            document.getElementById('rewindForm').classList.add('dont-display');
            document.getElementById('fastForward').classList.add('dont-display');
            document.getElementById('fastForwardForm').classList.add('dont-display');
            this.count = setInterval(this.countTime, 1000);
            this.setState(
                {playOrPauseButton: <i className="far fa-pause-circle fa-3x icon" title='Pause' onClick={this.handlePlayPause}></i>}
            )
        }
    }

    handleRewind = e => {
        document.getElementById('rewindForm').classList.remove('dont-display');
    }

    handleRewindEnter = e =>{
        if(e.keyCode === 13){
            e.preventDefault();
            let valueEntered = e.target.value;
            let totalSecondsPassed = (this.state.minutes*60) + this.state.seconds;
            if(!isNaN(e.target.value) && valueEntered <= totalSecondsPassed){
                // document.getElementById('1').setAttribute('q', '{1}')
                document.getElementById('rewindForm').classList.add('dont-display');
                // e.target.value = '';
                this.props.handleRewindHighlight(valueEntered, totalSecondsPassed);      
                setTimeout(() =>{
                    this.handleRewindSeconds(valueEntered, totalSecondsPassed);
                }, 1)
            }else{
                document.getElementById('rewindForm').classList.add('shake');
                setTimeout(function(){
                    document.getElementById('rewindForm').classList.remove('shake')
                }, 821);
            }
            e.target.value = '';
        }
    }

    handleRewindSeconds = (valueEntered, totalSecondsPassed) =>{
        let newTime = totalSecondsPassed - valueEntered;
        let newMinutes = Math.floor(newTime/60);
        let newSeconds = newTime % 60;
        let newTransitionTime = this.props.totalMinutes*60 - newTime;
        this.setState({
            minutes: newMinutes,
            seconds: newSeconds,
            minutesSTR: newMinutes.toString(),
            secondsSTR: ('0' + newSeconds.toString()).slice(-2),
            transitionTime: newTransitionTime,
        });
    }

    handleFastForward = e => {
        document.getElementById('fastForwardForm').classList.remove('dont-display');
    }

    handleFastForwardEnter = e =>{
        if(e.keyCode === 13){
            e.preventDefault();
            let valueEntered = e.target.value;
            let totalSecondsPassed = (this.state.minutes*60) + this.state.seconds;
            if(!isNaN(e.target.value) && ((parseInt(valueEntered) + parseInt(totalSecondsPassed)) <= (this.props.goalTime*60))){
                document.getElementById('fastForwardForm').classList.add('dont-display');
                this.props.handleFastForwardHighlight(valueEntered, totalSecondsPassed);   
                setTimeout(() =>{
                    this.handleFastForwardSeconds(valueEntered, totalSecondsPassed);
                }, 1)
            }else{
                document.getElementById('fastForwardForm').classList.add('shake');
                setTimeout(function(){
                    document.getElementById('fastForwardForm').classList.remove('shake')
                }, 821);
            }
            e.target.value = '';
        }
    }

    handleFastForwardSeconds = (valueEntered, totalSecondsPassed) =>{
        let newTime = totalSecondsPassed + valueEntered;
        let newMinutes = Math.floor(newTime/60);
        let newSeconds = newTime % 60;
        let newTransitionTime = this.props.totalMinutes*60 - newTime;
        this.setState({
            minutes: newMinutes,
            seconds: newSeconds,
            minutesSTR: newMinutes.toString(),
            secondsSTR: ('0' + newSeconds.toString()).slice(-2),
            transitionTime: newTransitionTime,
        });
    }

    render() {
        return(
            <div className='buttons-area'>
                {this.state.playOrPauseButton}
                <p id='nowTime' className='time-tag'>Now</p>
                <p id='timer' className='time dont-display'>{this.state.minutesSTR}:{this.state.secondsSTR}</p>
                <p id='goalTime' className='time-tag'>Goal</p>
                {this.goalTime}
                {/* <i id='rewind' className="fas fa-backward fa-3x icon dont-display" onClick={this.handleRewind} ></i> */}
                {/* <i id='rewind' className="fas fa-history fa-3x icon dont-display" onClick={this.handleRewind} ></i> */}
                <i id='rewind' className="fas fa-fast-backward fa-3x icon dont-display" onClick={this.handleRewind} ></i>
                <form id='rewindForm' className='dont-display'>
                    <input onKeyDown={this.handleRewindEnter} className='time-input' type='text' name='rewind time' autoComplete='off' />sec
                </form>
                <i id='fastForward' className="fas fa-fast-forward fa-3x icon dont-display" onClick={this.handleFastForward} ></i>
                <form id='fastForwardForm' className='dont-display'>
                    <input onKeyDown={this.handleFastForwardEnter} className='time-input' type='text' name='fast forward time' autoComplete='off' />sec
                </form>
            </div>
        );
    }
}

const ButtonOptions = connect(mapStateToProps)(ScriptButtons);

export default ButtonOptions;