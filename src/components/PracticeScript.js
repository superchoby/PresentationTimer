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
        // this.highlight = this.highlight.bind(this);
        this.totalTime = this.props.totalMinutes * 60;
        // this.pauseHighlight = this.pauseHighlight.bind(this);
        this.state = {
            backgroundPosition: '100%',
        }
        this.updateNotRepeat = true;
        this.handleRewindHighlight = this.handleRewindHighlight.bind(this);
        this.handleFastForwardHighlight = this.handleFastForwardHighlight.bind(this);
    }

    handleRewindHighlight = (valueEntered, totalSecondsPassed) => {
        let newPosition = 100-((totalSecondsPassed-valueEntered)/this.totalTime)*100;
        this.setState({
            backgroundPosition: newPosition.toString()+'%',
        });
        document.getElementById('script').style.transition = '0s linear';
    }

    handleFastForwardHighlight = (valueEntered, totalSecondsPassed) => {
        let newPosition = 100-((totalSecondsPassed+valueEntered)/this.totalTime)*100;
        this.setState({
            backgroundPosition: newPosition.toString()+'%',
        });
        document.getElementById('script').style.transition = '0s linear';
    }

    componentDidUpdate = () =>{
        if(this.updateNotRepeat){
            document.getElementById('script').style.backgroundPosition = this.state.backgroundPosition;
            this.forceUpdate();
            this.updateNotRepeat=false;
        }else{
            this.updateNotRepeat=true;
        }
    }

    componentDidMount(){
        if(this.props.script.length > 769){
            if(document.getElementById('script-container').clientHeight > this.props.height){
                document.getElementById('original-div').style.height = 'auto';
            }
        }
        document.getElementById('script').style.backgroundPosition = this.state.backgroundPosition;
    }

    render() {
        return(
            <React.Fragment>
                <div id='original-div' className='original-div'>
                    <div id='script-container' className='second-page'>
                        <div className='text-container'>
                            <p id='script' className='script'>{this.props.script}</p>
                        </div>
                    </div>
                </div>
                {/* <div id='buttons-div'> */}
                <ButtonOptions handleFastForwardHighlight={this.handleFastForwardHighlight} handleRewindHighlight={this.handleRewindHighlight} pauseHighlight={this.pauseHighlight} highlight={this.highlight} goalTime={this.props.totalMinutes} />
                {/* </div> */}
            </React.Fragment>
        );
    }
}

const Practice = connect(mapStateToProps)(PracticeScript);

export default Practice;