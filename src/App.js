import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import News from './components/News'

export default class App extends Component {
  // pageSize=8;
  country='in';
  api='b635ea336a764552a46978b87e2a69d6';
  render() {
    return (
      <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<News key={'general'} country={this.country} category="general" api={this.api}/>}/>
          <Route exact path='business' element={<News key={'business'} country={this.country} category="business" api={this.api}/>}/>
          <Route exact path='entertainment' element={<News key={'entertainment'} country={this.country} category="entertainment" api={this.api}/>}/>
          <Route exact path='general' element={<News key={'general'} country={this.country} category="general" api={this.api}/>}/>
          <Route exact path='health' element={<News key={'health'} country={this.country} category="health" api={this.api}/>}/>
          <Route exact path='science' element={<News key={'science'} country={this.country} category="science" api={this.api}/>}/>
          <Route exact path='sports' element={<News key={'sports'} country={this.country} category="sports" api={this.api}/>}/>
          <Route exact path='technology' element={<News key={'technology'} country={this.country} category="technology" api={this.api}/>}/>
        </Routes>
      </Router>
      </>
    )
  }
}
