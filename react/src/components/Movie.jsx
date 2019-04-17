import React from 'react';
import { BASE_URL, API_KEY, IMG_API, IMAGE_NOT_FOUND } from '../constants';

export default class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {},
      castAndCrew: {},
      poster: '',
    }
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie = async e => {
    const id = this.props.match.params[0];
    const searchUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const fetchMovie = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const fetchCast = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    let movie = await fetchMovie.text();
    let castAndCrew = await fetchCast.text();
    movie = JSON.parse(movie);
    castAndCrew = JSON.parse(castAndCrew);
    this.setState({ movie, castAndCrew });
  }

  navigateBack = () => {
    this.props.history.push('/');
  }

  render() {
  	const { movie, castAndCrew } = this.state;
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
      </div>
    );
  }
}
