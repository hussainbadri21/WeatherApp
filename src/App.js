import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Title from "./components/Title";
import Form from "./components/Form";
import Weather from "./components/Weather";

const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: " ",
            time: "",
            condition: "",
            temp: "",
            error: "",
            tempC: "",
            temperature: ""
        }
    }

    getWeather = async (e) => {
        const input = e.target.elements.input_val.value;
        const data = input.split(",");
        e.preventDefault();
        const ajax = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${data[0]}&appid=${Api_Key}`);
        const response = await ajax.json();
        console.log(response);
        if (response && response.cod !== null && response.cod !== '404') {
            this.setState({
                name: input,
                time: new Date().toDateString(),
                condition: response.weather[0].description,
                temp: response.main.temp,
                temperature: (parseFloat(response.main.temp) - 273.15).toFixed(2),
                tempC: true
            })
        } else {
            alert('City not found');
        }
    };


    handleClick = (event) => {
        if (event.target.value === 'tempC') {
            this.setState({temperature: (this.state.temp - 273.15).toFixed(2), tempC: true});
        } else {
            this.setState({
                temperature: ((this.state.temp - 273.15) * 9 / 5 + 32).toFixed(2),
                tempC: false,
            });
        }
    };

    render() {
        return (
            <div className='main-container'>
                <div className='col-sm-6 left_card'>
                    <Title/>
                </div>
                <div className='col-sm-6 right_card'>{this.state.temp !== "" ? <Weather
                    handleClick={this.handleClick}
                    name={this.state.name}
                    time={this.state.time}
                    condition={this.state.condition}
                    temp={this.state.temperature}
                    tempC={this.state.tempC}
                /> : <></>}

                    <Form loadWeather={this.getWeather}/>
                </div>
            </div>
        );
    }
}

export default App;
