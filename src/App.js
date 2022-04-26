import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  // pageSize=8;
  country='in';
  api= process.env.REACT_APP_NEWS_API;

  state = {
    progress:10
  }

  setProgress = (progress)=>{
    this.setState({
      progress:progress
    })
  }
  render() {
    return (
      <>
      <Router>
        <Navbar/>
        <LoadingBar height={3} color='red' progress={this.state.progress} />
        <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} key={'general'} country={this.country} category="general" api={this.api}/>}/>
          <Route exact path='business' element={<News setProgress={this.setProgress} key={'business'} country={this.country} category="business" api={this.api}/>}/>
          <Route exact path='entertainment' element={<News setProgress={this.setProgress} key={'entertainment'} country={this.country} category="entertainment" api={this.api}/>}/>
          <Route exact path='general' element={<News setProgress={this.setProgress} key={'general'} country={this.country} category="general" api={this.api}/>}/>
          <Route exact path='health' element={<News setProgress={this.setProgress} key={'health'} country={this.country} category="health" api={this.api}/>}/>
          <Route exact path='science' element={<News setProgress={this.setProgress} key={'science'} country={this.country} category="science" api={this.api}/>}/>
          <Route exact path='sports' element={<News setProgress={this.setProgress} key={'sports'} country={this.country} category="sports" api={this.api}/>}/>
          <Route exact path='technology' element={<News setProgress={this.setProgress} key={'technology'} country={this.country} category="technology" api={this.api}/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}
