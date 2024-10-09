/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555, seat: 'A1',
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444, seat: 'B1',
    bookingTime: new Date(),
  },
];

const maxSeats = 10;

function TravellerRow({ traveller }) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
  const { id, name, phone, seat, bookingTime } = traveller;
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{id}</td>
      <td>{name}</td>
      <td>{phone}</td>
      <td>{seat}</td>
      <td>{bookingTime ? bookingTime.toLocaleString() : 'N/A'}</td>
    </tr>
  );
}

function Display({ travellers }) {
  // console.log("Display: ", travellers);
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Seat</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.props.travellers.length)
    if (this.props.travellers.length == maxSeats) {
      this.props.setfullfunction();
    } else {
      /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
      const form = document.forms.addTraveller;
      this.props.addfunction(form.travellername.value, form.travellerphone.value, form.travellerseat.value);
    }
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="travellerphone" placeholder="Phone" />
        <input type="text" name="travellerseat" placeholder="Seat" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deletefunction(form.travellername.value);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { travellers: props.travellers };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.travellers !== this.props.travellers) {
      this.setState({ travellers: this.props.travellers });
    }
  }

  render() {
    return (
      <h2>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        Free Seats: {maxSeats - this.state.travellers.length}
      </h2>);
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: "Homepage", isMax: false };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setFull = this.setFull.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(name, phone, seat) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    var newList = this.state.travellers;
    console.log(this.state.isMax);
    var newid = newList[newList.length - 1].id + 1;
    const newPassenger = { id: newid, name: name, phone: phone, seat: seat, bookingTime: new Date() };
    newList = newList.concat(newPassenger);
    this.setState({ travellers: newList });
  }

  setFull() {
    this.setState({ isMax: true });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    var newlist = [];
    this.state.travellers.forEach(element => {
      if (element.name != passenger) {
        newlist.push(element);
      }
    });
    this.setState({ travellers: newlist, isMax: false });
  }
  render() {
    var displayedComponent, warningMessage;
    if (this.state.selector === 'Homepage') {
      {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/ }
      displayedComponent = <Homepage travellers={this.state.travellers} />;
    } else if (this.state.selector === 'Display') {
      {/*Q3. Code to call component that Displays Travellers.*/ }
      displayedComponent = <Display travellers={this.state.travellers} />;
    } else if (this.state.selector === 'Add') {
      {/*Q4. Code to call the component that adds a traveller.*/ }
      displayedComponent = <Add addfunction={this.bookTraveller} setfullfunction={this.setFull} travellers={this.state.travellers}/>;
      if (this.state.isMax) {
        warningMessage = <div>No more seats!</div>
      }
    } else if (this.state.selector === 'Delete') {
      {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/ }
      displayedComponent = <Delete deletefunction={this.deleteTraveller} />;
    }
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector('Homepage')}>Homepage</button>
          <button onClick={() => this.setSelector('Display')}>Display</button>
          <button onClick={() => this.setSelector('Add')}>Add</button>
          <button onClick={() => this.setSelector('Delete')}>Delete</button>
        </div>
        <div>
          {displayedComponent}
          {warningMessage}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
