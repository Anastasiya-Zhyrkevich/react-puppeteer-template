import React from 'react';
import './App.css';
import faker from 'faker';
import Fuse from 'fuse.js';

// --------------- API START --------------

function simulateResponseTime({ min, max }) {
  return Math.floor(Math.random() * (max - min) + min);
}

faker.seed(42);

const users = Array.from({ length: 100 }).map(() => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
});

const fuse = new Fuse(users, {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
});

/**
 * Search users by name
 * @param {string} query - The query to search users by
 * @return {Promise<{ name: string; email: string; }[]>} Search result
 */
function searchUsersByName(query) {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(fuse.search(query));
    }, simulateResponseTime({ min: 50, max: 100 }));
  });
}

// ---------------- API END ---------------

const DEFAULT_ITEM_RENDERER = user => <div className="item">{user.name}</div>;

class Autocomplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      autocomplete: []
    };
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ text: value });
    this.updateAutocomplete(value);
  }

  handleItemClick(user) {
    this.setState({ text: user.name, autocomplete: [] });
  }

  updateAutocomplete(query) {
    searchUsersByName(query).then(users =>
      this.setState({ autocomplete: users })
    );
  }

  render() {
    const itemRenderer = this.props.renderer || DEFAULT_ITEM_RENDERER;
    return (
      <div className="container">
        <input
          className="input"
          type="text"
          value={this.state.text}
          onChange={e => this.handleChange(e)}
        />
        {!!this.state.autocomplete.length && (
          <div className="autocompleteClass">
            {this.state.autocomplete.map(user => (
              <div
                key={user.name}
                className="item-container"
                onClick={() => this.handleItemClick(user)}
              >
                {itemRenderer(user)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Autocomplete;
