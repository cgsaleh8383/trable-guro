import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';

const PlaceBox = (props) => {
    
    const { title, imgUrl,  description, id} = props.room;
    
    const room = [
        {
            title: 'COXS BAZAR',
            description: 'Coxs Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh.It is famous mostly for its long natural sandy beach, and it ...',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTd_OF7ilgJ76QFxc3szydpMlwVoSbIZ5KlqQ&usqp=CAU',
            id: 1,
            capacity: 1
        },
        {
            title: 'SREEMANGAL',
            description: 'Superior Double Rooms are perfectly equipped for traveling couples or friends.',
            imgUrl: 'https://www.travelmate.com.bd/wp-content/uploads/2019/06/Sajek-Valley.jpg',
            id: 2,
            capacity: 2
        },
        {
            title: 'SUNDERBANS',
            description: ' Have lots of in-room facilities and are designed in open-concept living area.',
            imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVgowrJfFEHqZ1djxbpKJ_Qg9tSYGzvm_2rg&usqp=CAU',
            id: 3,
            capacity: 4
        }
    ]
    const history = useHistory()
    const handleClick = (id) => {
        history.push(`/placeDetail/${id}`);
    }
    
    return (
        
        <div className='place-item'>
           
            
            <Link to={`/detail/${room.id}`} onClick={() => handleClick(room.id)}> 
                <img src={imgUrl} alt="" />
                <h2>{title}</h2>
            </Link>
           
           }
            
        </div>
    );
};

export default PlaceBox;