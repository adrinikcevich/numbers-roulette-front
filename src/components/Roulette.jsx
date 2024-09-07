import { useEffect, useRef, useState } from 'react'

function Roulette({ finalNumber }) {
    const [lastNumber, setLastNumber] = useState(null)
    const rouletteRef = useRef(null)
    const numbers = Array.from({ length: 100 }, (_, i) => i + 1)

    let rouletteStyle = {
        transform: `translateX(-${lastNumber * 100 - 500}px)`,
        transition: 'all 3s ease-out',
    }

    const rotate = () => {
        setLastNumber(finalNumber)
    }

    useEffect(() => {
        if (finalNumber) {
            rotate(finalNumber)
        }
    }, [finalNumber])

    useEffect(() => {
    }, [])

    return (
        <div className="roulette">
            <div className="roulette-selector"></div>
            <div className="roulette-num-container" style={rouletteStyle} ref={rouletteRef}>
                {numbers.map((num) => {
                    return (
                        <span className="roulette-num" key={num}>
                            {num}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Roulette
