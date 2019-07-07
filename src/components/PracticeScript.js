import React from 'react';
import './PracticeScript.css';
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
        this.totalTime = this.props.totalMinutes * 60;
        this.pauseHighlight = this.pauseHighlight.bind(this);
    }

    highlight = e => {
        let script = document.getElementById('paragraph');
        script.style.backgroundPosition = null;
        script.style.transition = this.totalTime.toString() + 's linear';
        script.classList.add('highlight');
        this.forceUpdate();
    }

    pauseHighlight = e => {
        let script = document.getElementById('paragraph');
        script.style.transition = '';
        let computedStyle = window.getComputedStyle(script);
        let currentBackgroundPos = computedStyle.getPropertyValue('background-position');
        script.style.backgroundPosition = currentBackgroundPos;
        script.classList.remove('highlight');
        this.forceUpdate();
    }

    componentDidMount(){
        if(this.props.script.length > 769){
            if(document.getElementById('script-container').clientHeight > this.props.height){
                document.getElementById('original-div').style.height = 'auto';
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
                {/* <div id='buttons-div'> */}
                <ButtonOptions pauseHighlight={this.pauseHighlight} highlight={this.highlight} goalTime={this.props.totalMinutes} />
                {/* </div> */}
            </React.Fragment>
        );
    }
}

const Practice = connect(mapStateToProps)(PracticeScript);

export default Practice;