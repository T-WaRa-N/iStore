import React, { Component } from 'react';
import Media from "./Media"
import FavMedia from "./FavMedia"

class Istore extends Component {
  //app constructor
  constructor(props) {
    super(props);
    //App state
    this.state = {
    fromServer: [], 
    error: null,
    mediaType:'',
    searchTerm: ''
    }
    
    //binding function in the constructor for enabling callback  
    this.handleAdd = this.handleAdd.bind(this)
    this.remove = this.remove.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.searchSubmit = this.searchSubmit.bind(this)
    this.handleUserInput = this.handleUserInput.bind(this)
  }

  // event functions, events such as onClick or text input
  
  // Adding media to my favourite list
  handleAdd(index){
    const { fromServer } = this.state
    //const myFavourites = Object.assign([], favouriteMedia )
    
    //checking that the local storage has not run
    if(localStorage.getItem("hasRun") == null){
      const FavMedia = []
      FavMedia.push(fromServer[index])
      localStorage.setItem("hasRun", true)
      localStorage.setItem("myMedia", JSON.stringify(FavMedia))
    }else{
      const myMedia = JSON.parse(localStorage.getItem("myMedia"))
      myMedia.push(fromServer[index])
      localStorage.setItem("myMedia", JSON.stringify(myMedia))
    }
    
    // Added succesfully
    alert('Added sucessfully to your favourites and will show in the list in your next search or Refresh')
    
  }
   
  // function called to delete favourite media from the list
  remove(index){
    const itemToRemove =JSON.parse(localStorage.getItem("myMedia"))
    itemToRemove.splice(index, 1)
    localStorage.setItem("myMedia", JSON.stringify(itemToRemove))
     
    // Showing that it was removed succesfully
    alert('Removed successfully and will clear in the next search or refresh')
  }

  // Selecting value from dropdown
  handleChange(event){
    this.setState({
      mediaType: event.target.value
    })
  }
  
  // Handling the search button click
  searchSubmit(){
    const { mediaType, searchTerm} = this.state

    fetch("/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        term: searchTerm, 
        media: mediaType,  
      }),
    }).then(res => res.json())
    .then(response => {this.setState({fromServer: response})})
    .catch(error => alert('There is an error: '+ error))
    
  }
  
  //handle user input text
  handleUserInput(event){
    const { value } = event.target
    this.setState({searchTerm: value})
  }
    
  // rendering to the dom
  render() {
    const { error, searchResults, fromServer } = this.state

    if (error) {
      // when there is an error returned from the fetch function
      return (
        <div className="app-body"> 
          <div className="search-field-container">
            <h1>Search Media Content From The iStore API</h1>
            <h3>Select Media Type</h3>
            <div className="media-selector">
              <select onChange={this.handleChange}>
                <option>Select Media</option>
                <option>music</option>
                <option>movie</option>
                <option>podcast</option>
                <option>musicVideo</option>
                <option>audiobook</option>
                <option>shortFilm</option>
                <option>software</option>
                <option>ebook</option>
                <option>tvShow</option>
                <option>all</option>
              </select>
            </div>
            <input className="search-field" placeholder=" Type media name here..."  onChange={this.handleUserInput}/>
            <button onClick = {this.searchSubmit}>Search</button>
          </div>
          <p>Error: {error}</p>
        </div>
      );
    }else{
      //when there is no error returned from fetch function
      return (
        <div className="app-body">
          <div className="search-field-container">
            <h1>Search Media Content From The iStore API</h1>
            <h3>Select Media Type</h3>
            <div className="media-selector">
             <select onChange={this.handleChange}>
              <option>Select Media</option>
              <option>music</option>
              <option>movie</option>
              <option>podcast</option>
              <option>music video</option>
              <option>audio book</option>
              <option>short film</option>
              <option>software</option>
              <option>ebook</option>
              <option>tv show</option>
              <option>all</option>
             </select>
            </div>
            <input className="search-field" placeholder="Type media name here..."  onChange={this.handleUserInput} required/>
            <button onClick = {this.searchSubmit}>Search</button>
          </div>
          <div className="body-container">
            <div className="favourite-media">
              <h2>My Favourite Media List</h2>
              <ol>
                {<FavMedia  delete={this.remove}/>}
              </ol>
            </div>
            <div className="search-results">
              <h2> Search Results</h2>
              <ol>
                {<Media mediaList={fromServer} addClick = {this.handleAdd}/>}
              </ol>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Istore;