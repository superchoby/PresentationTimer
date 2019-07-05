import React from 'react';
import './PracticeScript.css';
import Stopwatch from './Stopwatch';
import { connect } from 'react-redux';
import ButtonOptions from './ScriptButtons';

const mapStateToProps = state => {
    let scriptInfoIndex = state.scriptInfo.length - 1;
    let heightIndex = state.divHeight.length - 1;
    return { script: state.scriptInfo[scriptInfoIndex].script,
            totalMinutes: state.scriptInfo[scriptInfoIndex].minutes,
            height: state.divHeight[heightIndex],
         };
}

class PracticeScript extends React.Component {
    constructor(props){
        super(props);
        this.highlight = this.highlight.bind(this);
        this.watch = <br className='dont-display' />;
        this.totalTime = this.props.totalMinutes * 60;
    }

    highlight = e => {
        document.getElementById('paragraph').style.transition = this.totalTime.toString() + 's linear';
        document.getElementById('paragraph').className += " highlight";
        this.watch = <Stopwatch totalMinutes={this.props.totalMinutes}/>
        this.forceUpdate();
    }

    componentDidMount(){
        console.log(document.getElementById('script-container').clientHeight)
        console.log(this.props.height)
        if(this.props.script.length > 769){
            if(document.getElementById('script-container').clientHeight > this.props.height){
                document.getElementById('original-div').style.height = 'auto';
                console.log('activated')
            }
        }
    }

    render() {
        return(
            <React.Fragment>
                <div id='original-div' className='original-div'>
                    <div id='script-container' className='second-page'>
                        <div className='text-container'>
                            <p id='paragraph' className='script'>{this.props.script}</p>
                        </div>
                    </div>
                </div>
                {/* <ButtonOptions watch = {this.watch} handleClick = {this.highlight} goalTime={this.goalTime} /> */}
            </React.Fragment>
        );
    }
}

const Practice = connect(mapStateToProps)(PracticeScript);

export default Practice;