import React from 'react';


function CurrentDate(){
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];

    return <div className='current-date'>{dateString}</div>;
}

export default CurrentDate;