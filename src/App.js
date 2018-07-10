import React from 'react';
import './App.css';

import BusinessList from './components/BusinessList/BusinessList';
import SearchBar from './components/SearchBar/SearchBar';
import Loading from 'react-loading-animation';
import NotFound from './components/NotFound/NotFound';
import Yelp from './util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      loading: false,
      notFound: false
    };
  }

  searchYelp = (term, location, sortBy) => {
    this.setState({ loading: true });
    Yelp.search(term, location, sortBy)
      .then(businesses => {
        if (businesses) {
          this.setState({
            businesses: businesses,
            loading: false
          });
        } else {
          this.setState({ 
            notFound: true,
            loading: false 
          });
          setTimeout(function(){ window.location.reload(); }, 3000);
        }
      })
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar notFound={this.state.notFound} searchYelp={this.searchYelp} />
        {this.state.loading ? 
          <Loading />
          :
          this.state.notFound ? <NotFound /> : <BusinessList businesses={this.state.businesses} />}
      </div>
    );
  }
}

export default App;