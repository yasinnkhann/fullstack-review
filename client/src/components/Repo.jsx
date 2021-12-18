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
          <li>
            <a href={this.props.repo.repoUrl} target="_blank">
              {this.props.repo.repoName}
            </a>
          </li>
        </div>
      </Fragment>
    );
  }
}