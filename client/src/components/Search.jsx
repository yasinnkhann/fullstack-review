import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    // BINDERS
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div>
        <h4>Add more repos!</h4>
        Enter a github username:
        <input
          type="text"
          name="term"
          value={this.state.term}
          onChange={this.onChange}
        />
        <button onClick={this.search}> Add Repos </button>
      </div>
    );
  }
}

export default Search;