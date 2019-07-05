import React from 'react'
import './FirstPage.css'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { inputScript, inputDivHeight } from '../actions/index';

let minutesArr = [];
for(let i=0; i<10; i++){
    minutesArr[i] = {value: (i+1), 
                    valuestr: (i+1).toString(),
                    valuePlusHalf: (i+1.5), 
                    valuePlusHalfstr: (i+1.5).toString(),
                };
};

function mapDispatchToProps(dispatch){
    return{
        inputScript: (script, minutes) => dispatch(inputScript(script, minutes)),
        inputDivHeight: (height) => dispatch(inputDivHeight(height)),
    };
}

class FirstPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {script: '',
                        minutes: 1,
                    };
        this.storeScript = this.storeScript.bind(this);
        this.storeMinutes = this.storeMinutes.bind(this);
        this.highlightExample = this.highlightExample.bind(this);
        this.removeHighlight = this.removeHighlight.bind(this);
        this.highlight = '';
        this.continue = true;
    }

    removeHighlight = () => {
        if(this.continue){
            document.getElementById('example').classList.remove('example');
            document.getElementById('example').classList.add('restart');
            document.getElementById('example').classList.remove('highlight');
            document.getElementById('example').classList.remove('restart');
            document.getElementById('example').style.transition = '0s linear';
            document.getElementById('example').classList.add('example');
            setTimeout(this.highlightExample, 1);
        }
    }

    storeMinutes = e => {
        this.setState({minutes: e.target.value});
    }

    storeScript = e => {    
        this.props.inputScript(document.getElementById('script-text-area').value,
                                document.getElementById('minutes').value);
    }

    highlightExample = () => {
        if(this.continue){
            document.getElementById('example').removeAttribute("style")
            document.getElementById('example').classList.add('highlight');
            setTimeout(this.removeHighlight, 2100);
        }
    }

    componentDidMount(){
        this.highlight = setTimeout(this.highlightExample, 1);
        document.getElementById('original-div').style.height = '100%';
        this.props.inputDivHeight(document.getElementById('first-page').clientHeight);
    }

    componentWillUnmount(){
        this.continue = false;
    }

    render() {
        return(
            <div id='original-div' className='original-div'>
                <div id='first-page' className='first-page'>
                    <div className="left-half column">
                    <p className='intro-paragraph'>Hey there! Welcome to TimeYourPrez. Here you can figure out exactly
                    the pace you need to go to say your script within the desired time limit. Just read the words at the
                    rate they are highlighted and you are all set. Now, just follow the directions on the right and
                    let's get started!</p>
                    <p id='example' className='example'>Example</p>
                    </div>
                    <div className="right-half column">
                        <h1 className='options'>No hassle, just copy paste your script,</h1>
                        <form>
                            <textarea id="script-text-area" rows="12"></textarea>
                            <h2 className='options'>and choose your minutes.</h2>
                            <select id="minutes" className="minutes" name="minutes" onChange={this.storeMinutes}>
                                {minutesArr.map((minute) =>
                                    <React.Fragment key={minute.value.toString()}>
                                        <option value={minute.value}>{minute.valuestr}</option>
                                        <option value={minute.valuePlusHalf}>{minute.valuePlusHalfstr}</option>
                                    </React.Fragment>
                                )}
                            </select>
                            <div>
                                <NavLink to='/practice-script'>
                                    <input className='test' onClick={this.storeScript} type="submit" value="Submit" />
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const Form = connect(null, mapDispatchToProps)(FirstPage);

export default Form;
