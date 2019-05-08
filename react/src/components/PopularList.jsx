import React from 'react';
import { Link } from 'react-router-dom'

export default class PopularMovieList extends React.Component {
  render() {
    let { list } = this.props;
    return (
      <div className="list-display">
        <h1>Movie List</h1>
        <ul>
          {list && list.map(movie => {
            let {id, title} = movie;
            return (
              <Link to={`/movie/${id}`} key={id} >
                <li>{title}</li>
              </Link>
            );
          })}
        </ul>
     </div>
    );
  }
}