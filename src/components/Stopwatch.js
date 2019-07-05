import React from 'react';

class Stopwatch extends React.Component {
    constructor(props){
        super(props);
        this.countTime = this.countTime.bind(this);
        this.state = {minutes: 0, 
            seconds: 0,
        };
        this.count = '';
        this.secondsSTR = '00';
        this.minutesSTR = '0';
    }
    
    countTime = () => {
        if(this.state.seconds === 59){
            this.setState({minutes: this.state.minutes + 1, seconds: -1});
        }
        this.setState({seconds: this.state.seconds + 1})
        // this.minutesSTR = ('0' + this.state.minutes.toString()).slice(-2);
        this.minutesSTR = (this.state.minutes.toString());
        this.secondsSTR = ('0' + this.state.seconds.toString()).slice(-2);
        if(this.state.minutes*60 + this.state.seconds === this.props.totalMinutes*60){
            clearInterval(this.count);
            console.log(this.minutesSTR + ' min');
            console.log(this.secondsSTR + ' sec');
        }
        this.forceUpdate();
    }

    componentDidMount = () => {
        this.count = setInterval(this.countTime, 1000);
    }

    render() {
        return(
            <p className='time'>{this.minutesSTR}:{this.secondsSTR}</p>
        );
    }
}

export default Stopwatch;