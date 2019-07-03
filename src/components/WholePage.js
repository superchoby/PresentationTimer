import React from 'react'
import Form from './FirstPage';
import Practice from './PracticeScript';
import './WholePage.css';
import MediaQuery from 'react-responsive';
import {BrowserRouter, Route} from 'react-router-dom';

class WholePage extends React.Component {
                                 
    render() {
        return(
            <div className='original-div'>
                <MediaQuery minDeviceWidth={768}>
                    <BrowserRouter>
                        <React.Fragment>
                            <Route path='/' render={(props) => <Form />} exact />
                            <Route path='/practice-script' render={(props) => <Practice />} />
                        </React.Fragment>
                    </BrowserRouter>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={768}>
                    <p>Sorry you cannot view this on mobile</p>
                </MediaQuery>
            </div>
        );
    }
}

export default WholePage;