import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function RouletteWheel({ newNumber, setShowNumber, setSpinning }) {
    const [currentPosition, setCurrentPosition] = useState(1)
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1)
    const rouletteRef = useRef()

    const rotateWheel = (newNumber) => {
        setSpinning(true)

        //Reset rotation
        // (100 - currentPosition) * 3.6+3.6
        let initialRotation = (100 - currentPosition) * 3.6 + 3.6
        initialRotation = initialRotation > 360 ? initialRotation - 360 : initialRotation
        rouletteRef.current.style.transition = 'none'
        rouletteRef.current.style.transform = `rotate(${initialRotation}deg)`

        setTimeout(() => {
            console.log("numero:",newNumber)
            const newRotation = 360  + (100-newNumber) * 3.6 + 3.6;
            rouletteRef.current.style.transition = 'all 5s ease'
            console.log("initialRotation: ",initialRotation)
            console.log("newRotation: ",newRotation)
            rouletteRef.current.style.transform = `rotate(${newRotation}deg)`

            setCurrentPosition(newNumber)
        }, 100)
        setTimeout(() => {
            setShowNumber(true)
        }, 5000)
    }

    useEffect(() => {
        if (newNumber) {
            rotateWheel(newNumber)
        }
        
    }, [newNumber])

    return (
        <div className='roulette-container'>
        <div className='roulette-selector'>

        </div>
        <div className="roulette-wheel">
            <div className="roulette-num-container" ref={rouletteRef}>
                {numbers.map((num) => {
                    return (
                        <div
                            className={`roulette-num ${num%2 === 0 ? 'even' : 'odd'}`}
                            key={num}
                            style={{ '--value': num }}
                        >
                            <span>{num}</span>
                        </div>
                    )
                })}
            </div>
        </div>
        </div>
        
    )
}

RouletteWheel.propTypes = {
    newNumber: PropTypes.number,
    setShowNumber: PropTypes.func.isRequired,
    setSpinning: PropTypes.func.isRequired,
}

export default RouletteWheel
