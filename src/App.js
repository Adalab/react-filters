import React from 'react';
import List from './components/List';
import Filters from './components/Filters';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {
        data: [],
        isFetching: false,
        error: null
      },
      filters: {
        onlyEvenAge: false,
        gender: []
      }
    };

    this.handleFilterOnlyEvenAge = this.handleFilterOnlyEvenAge.bind(this);
    this.handleFilterByGender = this.handleFilterByGender.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    this.setState(prevState => {
      return {
        users: {
          ...prevState.users,
          isFetching: true
        }
      };
    });
    fetch('https://randomuser.me/api/?results=25')
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => {
          return {
            users: {
              ...prevState.users,
              data: data.results.map((item, ind) => {
                return {
                  ...item,
                  uuid: ind,
                  fullName: `${item.name.first} ${item.name.last}`
                };
              }),
              isFetching: false
            }
          };
        });
      });
  }

  handleFilterOnlyEvenAge() {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          onlyEvenAge: !prevState.filters.onlyEvenAge
        }
      };
    });
  }

  handleFilterByGender(e) {
    const { name } = e.target;
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          gender: prevState.filters.gender.includes(name)
            ? prevState.filters.gender.filter(item => item !== name)
            : prevState.filters.gender.concat(name)
        }
      };
    });
  }

  getFilteredResults() {
    const { users } = this.state;
    const { data } = users;
    const { onlyEvenAge, gender } = this.state.filters;
    return data
      .filter(user => !onlyEvenAge || user.dob.age % 2 === 0)
      .filter(user => !gender.length || gender.includes(user.gender));
  }

  render() {
    const { onlyEvenAge, gender } = this.state.filters;
    const { isFetching } = this.state.users;

    return (
      <div className="App">
        <Filters
          evenAge={onlyEvenAge}
          oneEvenAgeChange={this.handleFilterOnlyEvenAge}
          genders={gender}
          onGenderChange={this.handleFilterByGender}
        />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <List users={this.getFilteredResults()} />
        )}
      </div>
    );
  }
}

export default App;
