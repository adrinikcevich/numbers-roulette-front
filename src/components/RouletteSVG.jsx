function RouletteSVG() {

    const numbers = Array.from({ length: 100 }, (_, i) => i + 1)
    const radius = 400
    const segmentAngle = 360 / numbers.length
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 800"
            width="8000"
            height="8000"
        >
            <circle
                cx={radius}
                cy={radius}
                r={radius-2}
                fill="#555"
                stroke="#aaa"
                strokeWidth="1"
            />
            <circle cx={radius} cy={radius} r={radius - 4} fill="#333" />

            {numbers.map((num, index) => {
                const angle = (100 - num) * -segmentAngle

                const fillColor = index % 2 === 0 ? '#888' : '#d41818'

                return (
                    <g
                        key={index}
                        transform={`rotate(${angle}, ${radius}, ${radius})`}
                    >
                        <g transform="translate(400,405)">
                            <g>
                                <path
                                    d={`M0,0 L1,-${radius} A${radius},${radius} 0 0,1 ${
                                        radius *
                                        Math.sin((segmentAngle * Math.PI) / 180)
                                    },${
                                        -radius +
                                        radius *
                                            (1 -
                                                Math.cos(
                                                    (segmentAngle * Math.PI) /
                                                        180
                                                ))
                                    } Z`}
                                    fill={fillColor}
                                />
                            </g>
                        </g>
                        {num != 0 ? (
                            <text
                                x={radius}
                                y={10}
                                fontSize="10"
                                fontWeight="500"
                                fill="#fff"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                transform={`rotate(1.8,1,${radius})`}
                            >
                                {num}
                            </text>
                        ) : (
                            <></>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}

export default RouletteSVG
