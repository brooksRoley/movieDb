import React from 'react';
import { Link } from 'react-router-dom'
import { IMG_API, IMAGE_NOT_FOUND } from '../constants';

export default class Movie extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movie: {},
      cast: [],
      poster: '',
      review: '',
      similarList: [],
    }
  }

  componentDidMount() {
    this.getMovie();
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params[0] !== prevProps.match.params[0]){
      this.getMovie();
    }
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
    const fetchSimilar = await fetch(`/api/movie/${id}/similar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).catch(error => console.error(error));

    let movie = await fetchMovie.text();
    let castAndCrew = await fetchCast.text();
    let similarList = await fetchSimilar.text();

    movie = JSON.parse(movie);
    castAndCrew = JSON.parse(castAndCrew);
    let cast = castAndCrew.cast || [];
    cast = cast.slice(0,6);

    similarList = JSON.parse(similarList);
    similarList = similarList.results || [];
    similarList = similarList.slice(0,6);
    this.setState({ movie, cast, similarList });
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
    const { movie, cast, review, similarList } = this.state;
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
        
        <h1>Title:</h1>
        <h2>{title}</h2>

        { poster && <img className="poster" src={`${IMG_API}${poster}`} alt={`${title}-poster`} /> }
        
        <h1>Synopsis:</h1>
        <p>{synopsis}</p>

        <h1>Released:</h1>
        <p>{release_date}</p>
        
        <h1>Cast:</h1>
        <ul>
          {cast && cast.map(actor => {
            let { id, cast_id, character, name, profile_path } = actor;
            return (
              <Link to={`/actor/${id}`} key={cast_id}>
                <li className="cast-member">
                  <p>{name} as {character}</p>
                  {profile_path && <img className="cast-portrait" src={`${IMG_API}${profile_path}`} alt={`${name}-portrait`} />}
                  {!profile_path && <img className="cast-portrait" src={IMAGE_NOT_FOUND} alt="404" />}
                </li>
              </Link>
            )
          })}
        </ul>
        <div id="actor-modal"></div>

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

        <h1>Similar Movies:</h1>
        <ul>
          {similarList && similarList.map(movie => {
            let { id, title, poster_path } = movie;
            return (
              <Link to={`/movie/${id}`} key={id} >
                <li className="similar-movie">
                  <p>{title}</p>
                  {poster_path && <img className="cast-portrait" src={`${IMG_API}${poster_path}`} alt={`movie-portrait`} />}
                  {!poster_path && <img className="cast-portrait" src={IMAGE_NOT_FOUND} alt="404" />}

                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    );
  }
}
