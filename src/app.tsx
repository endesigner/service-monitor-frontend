import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AppWrapper, Input } from './Components';

import ServiceList from './ServiceList'

type Service = {
  uuid: string
  , name: string
  , url: string
  , lastStatus: string
  , lastChecked: string
  , checked: boolean
};

type State = {
  services: Service[] | null
}

const SERVICE_API = "http://localhost:9090/service";

class App extends React.Component<{}, State> {
  private serviceName;
  private serviceUrl;

  constructor(props) {
    super(props);
    this.state = { services: [] };

    this.loadServices = this.loadServices.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.deleteChecked = this.deleteChecked.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateService = this.updateService.bind(this);
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

  addService(name: string, url : string) {
    fetch(SERVICE_API, {
      method: 'POST',
      body: JSON.stringify({ name: name, url: url })
    })
    .then(res => res.json())
    .then(services => this.loadServices())
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

  updateService({ name, url, uuid }) {
    fetch(`${SERVICE_API}/${uuid}`, {
      method: 'PUT',
      body: JSON.stringify({ name: name, url: url })
    })
    .then(res => res.json())
    .then(services => this.loadServices())
    .catch(e => console.log(e));
  }

  deleteChecked() {
    let servicesToDelete = this.state.services
      .reduce((acc, service) =>
        service.checked? acc.concat(service.uuid) : acc
      , []);

    if (!servicesToDelete.length) return;

    // TODO Error handling
    fetch(SERVICE_API, {
      method: 'DELETE',
      body: JSON.stringify(servicesToDelete)
    })
    .then(res => res.json())
    .then(services => this.loadServices())
    .catch(e => console.log(e));
  }

  handleKeyPress(event) {
    if (event.key !== "Enter") return;

    this.addService(this.serviceName.value, this.serviceUrl.value);
    this.serviceName.value = '';
    this.serviceUrl.value = '';
  }

  render() {
    let services = this.state.services;

    return (
      <AppWrapper>
        <div className="controls">
          <Input
            type="text"
            placeholder="Service name"
            onKeyPress={this.handleKeyPress}
            ref={(el) => { this.serviceName = el; }} />
          <Input
            type="text"
            placeholder="Type URL & Enter"
            onKeyPress={this.handleKeyPress}
            ref={(el) => { this.serviceUrl = el; }} />
        </div>

        <ServiceList
          services={services}
          onCheckChange={this.onCheckChange}
          onServiceUpdate={this.updateService} />

        <div className="controls">
          <button onClick={this.loadServices}>Reload list</button>
          <button onClick={this.deleteChecked}>Delete checked</button>
        </div>
      </AppWrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
