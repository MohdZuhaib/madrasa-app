import React, { useRef, useEffect, useState } from 'react';

interface SegmentProgress {
    percent: number; // between 0 and 1
}

interface SegmentedArcProgressProps {
    segments: SegmentProgress[];
    baseColor?: string;
    filledColor?: string;
    strokeWidth?: number;
}

const paths = [
    "M 36.71152662041874 97.17271728241259 A 125 125 0 0 1 61.920723754550636 61.30365793293491",
    "M 73.81830893528983 50.89727578658062 A 125 125 0 0 1 112.72400666048773 30.687384067934218",
    "M 128.07915923850152 26.937102503195433 A 125 125 0 0 1 171.92084076149843 26.93710250319542",
    "M 187.27599333951233 30.687384067934246 A 125 125 0 0 1 226.18169106471012 50.89727578658059",
    "M 238.07927624544934 61.30365793293488 A 125 125 0 0 1 263.28847337958126 97.1727172824126",
];

const SegmentedArcProgress: React.FC<SegmentedArcProgressProps> = ({
    segments,
    baseColor = 'rgba(255, 255, 255, 0.3)',
    filledColor = '#ffffff',
    strokeWidth = 11.875,
}) => {
    const [pathLengths, setPathLengths] = useState<number[]>([]);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);

    // Measure path lengths once
    useEffect(() => {
        const lengths = pathRefs.current.map((path) =>
            path ? path.getTotalLength() : 0
        );
        setPathLengths(lengths);
    }, []);

    return (
        <svg viewBox="0 0 300 100" className="w-full h-auto">
            {paths.map((d, i) => {
                const percent = segments[i]?.percent ?? 0;

                return (
                    <g key={i}>
                        {/* Base Arc (background) */}
                        <path
                            d={d}
                            stroke={baseColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />

                        {/* Filled Arc */}
                        <path
                            d={d}
                            ref={(el) => (pathRefs.current[i] = el)}
                            stroke={filledColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={pathLengths[i] || 1}
                            strokeDashoffset={
                                pathLengths[i] ? pathLengths[i] * (1 - percent) : 0
                            }
                            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
                        />
                    </g>
                );
            })}
        </svg>
    );
};

export default SegmentedArcProgress;
