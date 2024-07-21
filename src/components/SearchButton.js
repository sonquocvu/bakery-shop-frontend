import React from 'react';

const SearchButton = () => {

    return (
        <div id="search" className="search-wrap">
            <button type="button" className="close">×</button>
            <form className="search-form">
                <input type="search" id="ooooo" value="" placeholder="Type here........" />
                <button type="submit" className="search-btn"><i className="flaticon-search"></i></button>
            </form>
        </div>        
    );
}

export default SearchButton;