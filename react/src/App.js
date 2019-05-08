import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './App.css';
import PopularList from './components/PopularList';
import Genres from './components/Genres';

class App extends Component {
  state = {
    post: '',
    list: [],
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

  handleSearch = async e => {
    e.preventDefault();
    const { post } = this.state;
    const response = await fetch(`/api/search/movie/${post}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.text();
    const results = JSON.parse(body).results
    this.setState({ list: results });
  };

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
