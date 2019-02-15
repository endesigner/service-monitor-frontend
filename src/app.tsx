import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMServer from 'react-dom/server';

type Service = {
  url: string
  , lastStatus: string
  , checked: boolean
};

type State = {
  services: Service[] | null
}

const SERVICE_API = "http://localhost:9090/service";

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { services: null };
    this.loadServices = this.loadServices.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.deleteChecked = this.deleteChecked.bind(this);
  }

  componentDidMount() {
    this.loadServices();
  }

  loadServices() {
    fetch(SERVICE_API)
      .then(res => res.json())
      .then(services => this.setState({ services: services }))
      .catch(e => console.log(e));
  }

  onCheckChange(serviceId : number) {
    return changeEvent => {
      let checkedService = { checked : changeEvent.target.checked ? true : false };

      this.setState(state => ({
        services: state.services.map((service, index) =>
          (serviceId == index)
          ? { ...service, ...checkedService }
          : service
        )
      }));
    }
  }

  deleteChecked() {
    let servicesToDelete = this.state.services
      .reduce((acc, service, index) =>
        service.checked? acc.concat(index) : acc
      , []);

    fetch(SERVICE_API, {
      method: 'DELETE',
      body: JSON.stringify(servicesToDelete)
    })
    .then(res => res.json())
    .then(services => this.loadServices())
    .catch(e => console.log(e));
  }

  render() {
    let services = this.state.services;

    return (
      <div>
        <button onClick={this.loadServices}>Reload list</button>
        <ServiceList services={services} onCheckChange={this.onCheckChange} />
        <button onClick={this.deleteChecked}>Delete checked</button>
      </div>
    );
  }
}

function ServiceList({ services, onCheckChange }) {
  if (!services) return null;

  return services.map((service, index) => (
    <div key={index}>
      <input type="checkbox" onChange={onCheckChange(index)} />
      <span>{service.url}</span>
      <span>{service.lastStatus}</span>
    </div>
  ));
}

ReactDOM.render(<App />, document.getElementById('root'));
