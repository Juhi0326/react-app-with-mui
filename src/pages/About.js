import React from 'react'
import CustomButton from '../components/CustomButton'

export const About = () => {
    const handleClick = () => {
        console.log('click')
    }
    return (
        <div>
            About page
            <CustomButton
                onClick={handleClick}
                value='Bejelentkezés'
                variant={'contained'}
                color={'success'}
                btnSize={'medium'}
            />

        </div>

    )
}
export default About;