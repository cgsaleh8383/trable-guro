import React, { useContext, useState } from 'react';
import { userContext } from '../../App';
import TravelSection from '../TravelSection/TravelSection';

const Home = () => {
    const [showArea] = useContext(userContext)

    return (
        <div>
            <div className="home-container" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                    url(${showArea.img})`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw"
            }}>

                
                <TravelSection></TravelSection>

            </div>
        </div>
    );
};

export default Home;