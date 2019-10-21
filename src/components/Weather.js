import React from 'react';

class Weather extends React.Component {
    render() {
        return (
            <div className="weather_display_div">
                <div className="location">{this.props.name}</div>
                <div className="time">{this.props.time}</div>
                <div className="weather">{this.props.condition}</div>
                <div className="weather_div">
                    <div className="weather_temp">{this.props.temp}</div>
                    <div className="temp_unit">
                        <button className={this.props.tempC ? 'active temp_C' : 'temp_C'} value="tempC"
                                onClick={this.props.handleClick}>&deg;C
                        </button>
                        &nbsp;|&nbsp;
                        <button className={!this.props.tempC ? 'active temp_F' : 'temp_F'} value="tempF"
                                onClick={this.props.handleClick}> &deg;F
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;