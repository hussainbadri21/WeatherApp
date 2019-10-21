import React from 'react';
import config from "../configs/config"

const Api_Key = config.places_api_key;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({value: event.target.value});
        this.getPrediction(event.target.value);

    }

    getPrediction = async (e) => {
        const input = e;
        this.setState({value: input});
        const headers = new Headers({
            "Content-Type": "application/json"
        });
        const options = {
            mode: "no-cors",
            headers: headers,
        };
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url =`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${Api_Key}`;

        const ajax = await fetch(proxyurl+url);
        const response = await ajax.json();
        console.log(response);
    };

    render() {
        return (
            <form className="weather_fetch_form" onSubmit={this.props.loadWeather}>
                <label>
                    Enter City Name
                </label>
                <br/>
                <input type="text" name="input_val" value={this.state.value} onChange={this.onChange}
                       placeholder="City, State"/>
                <br/> <br/> <br/>
                <button type='submit' className='submit_btn'>Get my weather, mate</button>
            </form>
        );
    }
}

export default Form;
