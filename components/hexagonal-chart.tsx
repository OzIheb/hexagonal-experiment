'use client'

export function HexagonalChart() {
  const labels = ["joy", "peace", "kindness", "kindness", "peace", "hope", "love", "love"]
  const size = 400
  const center = size / 2
  const radius = (size / 2) * 0.8 // 80% of half width to leave room for labels
  const segments = 8
  const rings = 4

  const getPointsForRing = (ringIndex: number) => {
    const ringRadius = (radius * ringIndex) / rings
    const points = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i * 2 * Math.PI) / segments - Math.PI / segments
      const x = center + ringRadius * Math.cos(angle)
      const y = center + ringRadius * Math.sin(angle)
      points.push([x, y])
    }
    return points
  }

  const getSpokes = () => {
    const points = []
    for (let i = 0; i < segments; i++) {
      const angle = (i * 2 * Math.PI) / segments - Math.PI / segments
      const x = center + radius * Math.cos(angle)
      const y = center + radius * Math.sin(angle)
      points.push([center, center, x, y])
    }
    return points
  }

  const getDividingLines = () => {
    const points = []
    for (let i = 0; i < segments / 2; i++) {
      const angle1 = (i * 2 * Math.PI) / segments - Math.PI / segments
      const angle2 = ((i + 4) * 2 * Math.PI) / segments - Math.PI / segments
      const x1 = center + radius * Math.cos(angle1)
      const y1 = center + radius * Math.sin(angle1)
      const x2 = center + radius * Math.cos(angle2)
      const y2 = center + radius * Math.sin(angle2)
      points.push([x1, y1, x2, y2])
    }
    return points
  }

  const getLabelPosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / segments - Math.PI / segments
    const x = center + (radius + 20) * Math.cos(angle)
    const y = center + (radius + 20) * Math.sin(angle)
    return [x, y]
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg aspect-square relative">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full"
          style={{ transform: "rotate(-22.5deg)" }}
        >
          {Array.from({ length: rings }).map((_, ringIndex) => {
            const points = getPointsForRing(ringIndex + 1)
            return (
              <polygon
                key={ringIndex}
                points={points.map((point) => point.join(",")).join(" ")}
                fill="none"
                stroke="white"
                strokeOpacity="0.2"
                className="transition-all duration-300"
              />
            )
          })}

          {getSpokes().map(([x1, y1, x2, y2], index) => (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeOpacity="0.2"
              className="transition-all duration-300"
            />
          ))}

          <polygon
            points={getPointsForRing(4)
              .map((point) => point.join(","))
              .join(" ")}
            fill="rgb(88, 80, 236)"
            fillOpacity="0.5"
            className="transition-all duration-300"
          />

          <polygon
            points={getPointsForRing(3)
              .map((point) => point.join(","))
              .join(" ")}
            fill="none"
            stroke="rgb(88, 80, 236)"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {getDividingLines().map(([x1, y1, x2, y2], index) => (
            <line
              key={`divider-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgb(88, 80, 236)"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          ))}
        </svg>

        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
            {labels.map((label, index) => {
              const [x, y] = getLabelPosition(index)
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  className="text-[16px] font-medium"
                  style={{ transform: `rotate(22.5deg) translate(${index % 2 ? 5 : 0}px, ${index % 2 ? 5 : 0}px)`, transformOrigin: `${x}px ${y}px` }}
                >
                  {label}
                </text>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}