import React from 'react';
import { IMG_API, IMAGE_NOT_FOUND } from '../constants';

export default class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {},
      castAndCrew: {},
      poster: '',
      review: '',
    }
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie = async e => {
    const id = this.props.match.params[0];
    const fetchMovie = await fetch(`/api/movie/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(error => console.error(error));
    const fetchCast = await fetch(`/api/cast/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(error => console.error(error));

    let movie = await fetchMovie.text();
    let castAndCrew = await fetchCast.text();
    movie = JSON.parse(movie);
    castAndCrew = JSON.parse(castAndCrew);
    this.setState({ movie, castAndCrew });
  }
 
  postReview = async e => {
    e.preventDefault();
    let { review } = this.state;
    if(!!review){
      const postReview = await fetch('/api/review', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        mode: "cors", // no-cors, cors, *same-origin
        credentials: "same-origin", // include, *same-origin, omit
        body: JSON.stringify({ review }),
      });
      let response = await postReview.text();
      alert(response);
    }

  }

  navigateBack = () => {
    this.props.history.push('/');
  }

  render() {
  	const { movie, castAndCrew, review } = this.state;
    const { cast } = castAndCrew;
    const {
      title,
      backdrop_path: poster,
      release_date,
      overview: synopsis,
    } = movie;

    if(!cast){
      return <h1 className="loading">Loading</h1>;
    }

    return (
      <div className="movie-details">
        <button onClick={this.navigateBack} className="btn"> Back to movie search</button>
        
        <h1>Title: {title}</h1>
        { poster && <img className="poster" src={`${IMG_API}${poster}`} alt={`${title}-poster`} /> }
        
        <h1>Synopsis:</h1>
        <p>{synopsis}</p>

        <h1>Released:</h1>
        <p>{release_date}</p>
        
        <h1>Cast:</h1>
        <ul>
          {cast && cast.map(actor => {
            let { cast_id, character, name, profile_path } = actor;
            return (
              <li className="cast-member" key={cast_id}>
                <p>{name} as {character}</p>
                {profile_path && <img className="cast-portrait" src={`${IMG_API}${profile_path}`} alt={`${name}-portrait`} />}
                {!profile_path && <img className="cast-portrait" src={IMAGE_NOT_FOUND} alt="404" />}
              </li>
            )
          })}
        </ul>

        <p></p>

        <form onSubmit={this.postReview}>
          <input
            type="text"
            value={review}
            placeholder="Submit your own review"
            className="search-box"
            onChange={e => this.setState({ review: e.target.value })}
          />
          <br />
          <button type="submit">Submit</button>
        </form>

      </div>
    );
  }
}
