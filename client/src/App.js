import{
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  InputGroup,
  Input,
  Button,
  FormGroup
} from 'reactstrap';

import Weather from './Weather';
import React, {useState, useEffect, Component} from 'react';

function App (){
  const [weather, setWeather] = React.useState(null);
  const [cityList, setCityList] = React.useState([]);
  const [newCityName, setNewCityName] = React.useState('');


const getCityList = () =>{
  fetch('/api/cities')
   .then(res=> res.json()) //json şeklinde dönmesinii sağlarız 
   .then(res=> {
     var cityList = res.map(r => r.city_name);
     setCityList({cityList});
   });
};

const getWeather = (city) => {
  fetch(`/api/weather/${city}`)
  .then(res=> res.json())
  .then(weather => {
    console.log(weather);
    setWeather({weather});
  });
}

const handleChangeCity = (e) => {
  getWeather(e.target.value);
}

useEffect(() => {
  getCityList();
}, []);

const handleInputChange = (e) => {
  setNewCityName({ newCityName: e.target.value});  
};

const handleAddCity = () => {
  fetch('/api/cities', {
    method: 'post',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({city: newCityName})
  })
  .then(res => res.json())
  .then(res => { //CityEklendikten sonra CityList güncellenir
    getCityList();
    setNewCityName({newCityName:''});
  });
};

  return (
   <Container fluid className = "centered">
    <Navbar dark color = "dark">
      <NavbarBrand href = "/">Weather App</NavbarBrand>
    </Navbar>
    <Row>
      <InputGroup>
        <Input
        placeholder = "New city name.."
        value={newCityName}
        onChange={handleInputChange}        
        />
        <Button color="primary" onClick={handleAddCity}>Add City</Button>
      </InputGroup>
    </Row>
    <Row>
      <Col>
      <h1 className ="display-5">
     Current Weather 
     </h1>
     <FormGroup>
      <Input type="select" onChange={handleChangeCity}>
        { cityList.length === 0 && <option>No cities added yet.</option> }
        { cityList.length > 0 && <option>Select a city.</option> }
        { cityList.map((city, i)=><option key ={i}>{city}</option>) }
      </Input>
     </FormGroup>
      </Col>
    </Row>
    <Weather data ={weather}/>
   </Container>
  );
}
  

export default App;
