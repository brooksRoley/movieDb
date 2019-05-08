import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import PopularList from './components/PopularList';
import Genres from './components/Genres';

class App extends Component {
  state = {
    post: '',
    list: [],
    typing: false,
    typingTimeout: 0,
  };

  componentDidMount() {
    this.callApi(1)
      .then(res => this.setState({ list: res.results, pageCount: res.total_pages }))
      .catch(err => console.log(err));
  };

  componentDidUpdate(prevProps) {
  }

  callApi = async (page) => {
    const response = await fetch(`/api/popular/${page}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSearch = async () => {
    const { post } = this.state;
    if (!!post) {
      const response = await fetch(`/api/search/movie/${post}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.text();
      const results = JSON.parse(body).results;
      this.setState({ list: results });
    }
  };

  handleSearchTyping = (e) => {
    // Init a timeout variable to be used below
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    let timeout = null;
    clearTimeout(timeout);
    let self = this;
    timeout = setTimeout(function () {
        self.handleSearch();
    }, 1000);
    this.setState({ post: e.target.value });
  }

  handlePageClick = (e) => {
    let {selected} = e;
    let page = selected || 1
    this.callApi(page)
      .then(res => this.setState({ list: res.results, pageCount: res.total_pages }))
      .catch(err => console.log(err));
  }

  render() {
    const { list, post, pageCount } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          Movie Database Application
        </header>

        <input
          type="text"
          value={post}
          placeholder="Search by movie title"
          className="search-box"
          onChange={this.handleSearchTyping}
        />

        <PopularList list={list} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />

        <Genres />
      </div>
    );
  }
}

export default App;
