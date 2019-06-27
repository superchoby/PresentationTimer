import React from 'react'
import FirstPage from './FirstPage';
import PracticeScript from './PracticeScript';
import './WholePage.css';

class WholePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {script: '',
                      showPracticeScript: false,
                      minutes: 1,
                    //   seconds: -1,
                    };
        this.storeScript = this.storeScript.bind(this);
        this.storeMinutes = this.storeMinutes.bind(this);
    }                                       

    storeMinutes = e => {
        this.setState({minutes: e.target.value});
    }

    storeScript = e => {    
        e.preventDefault();
        this.setState({script: document.getElementById('script-text-area').value, 
                    showPracticeScript: true,
                });
    }

    render() {
        if(this.state.showPracticeScript){
            return (
                <div className='second-div'>
                    <PracticeScript script={this.state.script} totalMinutes={this.state.minutes} />
                </div>
            )
        }

        return (
            <div className='original-div'>
                <FirstPage storeScript={this.storeScript} storeMinutes={this.storeMinutes} showFirstPage={this.state.showFirstPage} />
            </div>
        );
    }
}

export default WholePage;