import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../App";
import { touristPlaces } from "../../FakeData/travelInfo";
import TravelArea from "../TravelArea/TravelArea";

const TravelSection = () => {

  const [showArea, setShowArea] = useContext(userContext);

  return (
    <Grid container item xs={12} justify="space-between" className="home_box" >
        <Grid item md={6} className="home_box_content">

            <h1>{showArea.title}</h1>
            <h5> {showArea.description}</h5>

            <Link to="/booking" className='booking_btn'>
              <button>Book Now →</button>
            </Link>

        </Grid>
      <Grid
        container item md={6}
        justify="center" spacing={1} className='home_box_image' style={{marginTop: '100px', padding: '0 15px'}}>
        {
          touristPlaces.map((place) => {
            return <TravelArea key={place.id} place={place}></TravelArea>;
          })
        }
      </Grid>
    </Grid>

  );

};

export default TravelSection;
