import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaceDetail = () => {
    const { placeDetails} = useParams()
    // const [detail, setDetail] = useState([])
   
    return (
        <div className='home-content'>
            <h1 style={{color: '#fff'}}> yeah this{placeDetails}</h1>
        </div>
    );
};

export default PlaceDetail;