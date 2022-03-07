import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const {
      artistName,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      collectionId,
    } = this.props;
    return (
      <div>
        <img alt="Imagem do album da banda" src={ artworkUrl100 } />
        <h1>{ collectionName }</h1>
        <h3>{ artistName }</h3>
        <p>{ releaseDate }</p>
        <p>{ collectionPrice }</p>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ { pathname: `/album/${collectionId}`, id: collectionId } }
        >
          Saiba Mais
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionPrice: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default Card;
