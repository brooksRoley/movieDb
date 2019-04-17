import React, { Component } from 'react';
import './App.css';

import { BASE_URL, API_KEY} from './constants';
import PopularList from './components/PopularList';

class App extends Component {
  state = {
    post: '',
    list: [],
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ list: res.results }))
      .catch(err => console.log(err));
  };

  callApi = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSearch = async e => {
    e.preventDefault();
    const { post } = this.state;
    const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${post}`;
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.text();
    const results = JSON.parse(body).results
    this.setState({ list: results });
  };

  render() {
    const { list, post } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          Movie Database Application
        </header>

        <form onSubmit={this.handleSearch}>
          <input
            type="text"
            value={post}
            placeholder="Search by movie title"
            className="search-box"
            onChange={e => this.setState({ post: e.target.value })}
          />
          <br />
          <button type="submit">Search</button>
        </form>

        <PopularList list={list} />
      </div>
    );
  }
}

export default App;
