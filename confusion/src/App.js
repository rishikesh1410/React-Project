import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import Main from './components/MainComponent';
import './App.css';
import { ConfigureStore } from './redux/ConfigureStore';

// Redux Store
const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
	      <BrowserRouter>
	        <div className="App">
	          <Main />
	        </div>
	      </BrowserRouter>
	   </Provider>
    );
  }
}

export default App;
