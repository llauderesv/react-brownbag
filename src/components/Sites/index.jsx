import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sites({ data = [] }) {
  return (
    <h1>
      Site Component
      <ul>
        {data.map(function(value) {
          return (
            <React.Fragment key={value.siteId}>
              <div
                style={{
                  color: value.color,
                  position: 'relative',
                }}
              >
                <li>{value.site}</li>
                <li>{value.siteCode}</li>
              </div>
            </React.Fragment>
          );
        })}
      </ul>
    </h1>
  );
}

function AccountLob({ data = [], handleSetError }) {
  return (
    <React.Fragment>
      <h1>Account Lob Component</h1>

      <Sites data={data} />
    </React.Fragment>
  );
}

function withSites(WrappedComponent) {
  class FetchSites extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        error: '',
        data: [],
      };

      this.fetchSites = this.fetchSites.bind(this);
      this.renderComponent = this.renderComponent.bind(this);
    }

    componentDidMount() {
      this.fetchSites();
    }

    fetchSites() {
      this.setState({ loading: true, error: '' });
      const rnd = Math.random() * 50;
      console.log(rnd);
      if (rnd < 20) {
        this.setState({ error: 'There was something error in the Server.' });
      }
      setTimeout(() => {
        axios
          .get('https://localhost/erecv11.api/api/v1/sites/getall')
          .then(response => {
            this.setState({ data: response.data, loading: false });
          })
          .catch(error => this.setState({ error }));
      }, 3000);
    }

    renderComponent() {
      if (this.state.loading) {
        return <h1>Loading...</h1>;
      } else if (!this.state.loading && this.state.error) {
        return (
          <React.Fragment>
            <h1>Error: {this.state.error}</h1>
            <button onClick={() => this.fetchSites()}>Retry</button>
          </React.Fragment>
        );
      } else {
        return <WrappedComponent data={this.state.data} />;
      }
    }

    render() {
      return this.renderComponent();
    }
  }

  return FetchSites;
}

function withSitesHooks(WrappedComponent) {
  function FetchSites() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      fetchSites();
    }, []);

    function fetchSites() {
      setLoading(true);

      const rnd = Math.random() * 50;

      if (rnd < 20) {
        setError('There was something error in the Server.');
      }

      setTimeout(() => {
        axios
          .get('https://localhost/erecv11.api/api/v1/sites/getall')
          .then(response => {
            setData(response.data);
            setLoading(loading);
          })
          .catch(error => {
            setError(error);
          });
      }, 3000);
    }

    function renderComponent() {
      if (loading) {
        return <h1>Loading...</h1>;
      } else if (!loading && error) {
        return (
          <React.Fragment>
            <h1>Error: {error}</h1>
            <button onClick={() => fetchSites()}>Retry</button>
          </React.Fragment>
        );
      } else {
        return <WrappedComponent data={data} />;
      }
    }

    return renderComponent();
  }

  return FetchSites;
}

export default withSitesHooks(AccountLob);
