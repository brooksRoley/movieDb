import React from 'react'

export default class Genres extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      genres: [],
    }
  }

  getGenres = async () => {
    if(this.state.genres.length === 0){
      const searchUrl = `/api/genres`;
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.text();
      let genres = JSON.parse(body).genres;
      genres = genres.map(genre => { return genre.name });
      this.setState({ genres });
    } else {
      this.setState({ genres: [] });
    }
  }

  render() {
    let { genres } = this.state;
    return (
      <div>
        <button className='btn' onClick={this.getGenres}>Get Genres</button>
        <ul className="genres-list">
          { 
            genres.map(genre => {
              return <li key={genre}>{genre}</li>;
            })
           }
        </ul>
      </div>
    )
  }
}
