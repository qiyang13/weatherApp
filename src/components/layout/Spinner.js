import React from 'react'
import SpinnerImg from '../../assets/spinner.gif'

const Spinner = () => {
    return (
        <div>
            <img src={SpinnerImg} alt="Loading..." width={100} />
        </div>
    )
}

export default Spinner