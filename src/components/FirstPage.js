import React from 'react'
import './FirstPage.css'

let minutesArr = [];
for(let i=0; i<10; i++){
    minutesArr[i] = {value: (i+1), 
                    valuestr: (i+1).toString(),
                    valuePlusHalf: (i+1.5), 
                    valuePlusHalfstr: (i+1.5).toString(),
                };

};

class FirstPage extends React.Component {
    constructor(props){
        super(props);
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

    highlightExample = () => {
        if(this.continue){
            document.getElementById('example').removeAttribute("style")
            document.getElementById('example').classList.add('highlight');
            setTimeout(this.removeHighlight, 2100);
        }
    }

    componentDidMount(){
        this.highlight = setTimeout(this.highlightExample, 1);
    }

    componentWillUnmount(){
        this.continue = false;
    }

    render() {

        
        return(
                <div className='first-page'>

                    <div className="left-half column">
                    <p className='intro-paragraph'>Hey there! Welcome to TimeYourPrez. Here you can figure out exactly
                    the pace you need to go to say your script within the desired time limit. Just read the words at the
                    rate they are highlighted and you are all set. Now, just follow the directions on the right and
                    let's get started!</p>

                    <p id='example' className='example'>Example</p>
                    </div>

                    {/* <div className='vertical-line'></div> */}

                    <div className="right-half column">
                        <h1 className='options'>No hassle, just copy paste your script,</h1>
                        <form>
                            <textarea id="script-text-area" rows="12" cols="70"></textarea>
                            <h2 className='options'>and choose your minutes.</h2>
                            <select className="minutes" name="minutes" onChange={this.props.storeMinutes}>
                                {minutesArr.map((minute) =>
                                    <React.Fragment key={minute.value.toString()}>
                                        <option value={minute.value}>{minute.valuestr}</option>
                                        <option value={minute.valuePlusHalf}>{minute.valuePlusHalfstr}</option>
                                    </React.Fragment>
                                )}
                            </select>
                            <div>
                                <input onClick={this.props.storeScript} type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                    
                </div>
        );
    }
}

export default FirstPage;
