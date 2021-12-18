import React, { Component, Fragment } from 'react';

export default class Repo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // BINDERS
  };

  render() {

    return (
      <Fragment>
        <div>
          <li>{this.props.repo.repoName}</li>
        </div>
      </Fragment>
    );
  }
}