import React, { useContext, useState } from 'react';
import './Booking.css'
import { userContext } from '../../App';
import { FormGroup, Grid } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';


const Booking = () => {

    const history = useHistory()
    const [showArea] = useContext(userContext)
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)

    const formSubmited = (event) => {
        event.preventDefault()
        history.push("/booking/destination")
    }


    return (
        <div style={
            {
                position: 'absolute',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)), url(${showArea.img})`,
                height: "110vh", backgroundSize: "cover",
                width: '100%'
            }
        }>


            <Grid container item xs={12} style={{ color: "white", marginTop: "40px" }}>

                <Grid item xs={12} md={6} className="home_box_content">
                    <img src={showArea.img} alt=""/>
                    <h1>
                        {showArea.title}
                    </h1>
                    <h5>
                        {showArea.description}
                    </h5>
                </Grid>

                <Grid item xs={12} md={6} >
                    <form className="booking_submit_box"

                        onSubmit={formSubmited}>

                        <FormGroup className="form-group" >

                            <p htmlFor="origin">
                                Origin
                            </p>
                            <input className="form_control" id="origin" type="text" required />

                            <p htmlFor="origin">
                                Destination
                            </p>
                            <input className="form_control" id="origin" type="text" required />

                            <div className="datepicker-section" style={{ display: "flex" }}>
                                <div style={{ marginRight: "5px" }}>
                                    <p>From</p>
                                    <DatePicker selected={from}
                                        className="date-picker"
                                        onChange={date => setFrom(date)}
                                        required
                                        placeholderText="Peek a date" >
                                    </DatePicker>
                                </div>
                                <div>
                                    <p>To</p>
                                    <DatePicker selected={to}
                                        className="date-picker"
                                        onChange={date => setTo(date)}
                                        required
                                        placeholderText="Peek a date" >
                                    </DatePicker>
                                </div>
                            </div>
                               
                                     <input className='booking_submit' type="submit" value="Start Booking" ></input>
                               
                        </FormGroup>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default Booking;