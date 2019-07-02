import React from 'react';
import './PracticeScript.css';
import Stopwatch from './Stopwatch';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { script: state.script,
            totalMinutes: state.totalMinutes, };
}

class PracticeScript extends React.Component {
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
        this.watch = <br />;
        this.totalTime = this.props.totalMinutes * 60;
        this.showTime = <br />
        console.log(this.props.script)
        console.log(this.props.script[0].script)

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

    componentDidMount() {
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    render() {
        
        return(
            <div id='script-container' className='second-page'>
                <div className='text-container'>
                    <p id='paragraph' className='script'>{this.props.script[0].script}</p>
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