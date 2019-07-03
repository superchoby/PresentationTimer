import React from 'react';
import './PracticeScript.css';
import Stopwatch from './Stopwatch';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    let scriptInfoIndex = state.scriptInfo.length - 1;
    return { script: state.scriptInfo[scriptInfoIndex].script,
            totalMinutes: state.scriptInfo[scriptInfoIndex].minutes, };
}

class PracticeScript extends React.Component {
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
        this.watch = <br />;
        this.totalTime = this.props.totalMinutes * 60;
        this.showTime = <br />
    }

    highlight = e => {
        document.getElementById('paragraph').style.transition = this.totalTime.toString() + 's linear';
        document.getElementById('paragraph').className += " highlight";
        this.watch = <Stopwatch totalMinutes={this.props.totalMinutes}/>
        let minutesPropString = this.props.totalMinutes.toString()
        this.showTime = minutesPropString.slice(-1) === '5' ? <p className='time'>{('0'+minutesPropString.substr(0, minutesPropString.indexOf('.'))).slice(-2)+':30'}</p>: <p className='time'>{('0'+minutesPropString).slice(-2)}:00</p>;
        this.forceUpdate();
        document.getElementById('button').style.display = 'none';
    }

    render() {
        
        return(
            <div id='script-container' className='second-page'>
                <div className='text-container'>
                    <p id='paragraph' className='script'>{this.props.script}</p>
                </div>
                <div className='timer-container'>
                    <button id='button' className='start-script-button' onClick={this.highlight} type='button'>Start</button>
                    {this.watch}
                    {this.showTime}
                </div>
            </div>
        );
    }
}

const Practice = connect(mapStateToProps)(PracticeScript);

export default Practice;