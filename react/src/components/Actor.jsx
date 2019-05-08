import React from 'react';
import { Link } from 'react-router-dom'
import { IMG_API, IMAGE_NOT_FOUND } from '../constants';

export default class Actor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: '',
      dob: '',
      bio: '',
      movies: [],
    }
  }

  componentDidMount(){
    this.getActor();
  }

  getActor = async () => {
    const id = this.props.match.params[0];
    const fetchActor = await fetch(`/api/person/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch(error => console.error(error));

    const fetchCredits = await fetch(`/api/person/${id}/credits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .catch(error => console.error(error));

    let actor = await fetchActor.text();
    actor = JSON.parse(actor);
    let { profile_path, birthday, biography } = actor;

    let credits = await fetchCredits.text();
    credits = JSON.parse(credits);
    let { cast } = credits;
    cast = cast.slice(0, 9)

    this.setState({
      picture: profile_path,
      dob: birthday,
      bio: biography,
      credits: cast,
    });
  }

  navigateBack = () => {
    this.props.history.push('/');
  }

  render(){
    let {credits, picture, dob, bio} = this.state;
    bio = bio || "Not Found";
    return(
      <div className="movie-details">
        {picture && <img src={`${IMG_API}${picture}`} alt={`actor-portrait`} />}
        {!picture && <img src={IMAGE_NOT_FOUND} alt="404" />}

        <h1>Birthday:</h1>
        <p>{dob}</p>

        <h1>Biography</h1>
        <p>Biography: {bio}</p>

        <h1>Credits</h1>
        <ul>
        { credits && credits.map(movie => {
          let { character, backdrop_path, title, id } = movie;
          return (
            <Link to={`/movie/${id}`} key={id} >
              <li className="similar-movie">
                <p>{character} in {title}</p>
                {backdrop_path && <img className="cast-portrait" src={`${IMG_API}${backdrop_path}`} alt={`movie-portrait`} />}
                {!backdrop_path && <img className="cast-portrait" src={IMAGE_NOT_FOUND} alt="404" />}
              </li>
            </Link>
          )
        })
        }
        </ul>

        <button className="btn" onClick={this.props.history.goBack}>Back to Previous Movie</button>
        <button className="btn" onClick={this.navigateBack}>Back to Popular List</button>
      </div>
    )
  }
}
