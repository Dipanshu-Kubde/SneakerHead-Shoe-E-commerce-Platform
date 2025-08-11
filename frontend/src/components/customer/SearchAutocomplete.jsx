import React from "react";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight
} from "react-instantsearch";
import { searchClient } from "../../utils/algoliaClient";
import "./SearchAutocomplete.css"; 

export default function SearchAutocomplete() {
  return (
    <InstantSearch indexName="products" searchClient={searchClient}>
      <SearchBox translations={{ placeholder: "Search shoes, brands, etc." }} />
      <div className="hits-container">
        <Hits hitComponent={ProductHit} />
      </div>
    </InstantSearch>
  );
}

function ProductHit({ hit }) {
  return (
    <div className="hit">
      <img src={hit.imageUrl} alt={hit.name} className="hit-image" />
      <div className="hit-info">
        <h4><Highlight attribute="name" hit={hit} /></h4>
        <p className="hit-price">₹{hit.price}</p>
      </div>
    </div>
  );
}
