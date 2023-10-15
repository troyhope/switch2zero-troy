type CustomizedAxisTickProps = {
  x?: number;
  y?: number;
  payload?: {
    value?: string;
  };
};

export const CustomizedAxisTick = ({
  x,
  y,
  payload,
}: CustomizedAxisTickProps) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={16}
      textAnchor="end"
      fill="#666"
      transform="rotate(-90)"
    >
      {payload.value}
    </text>
  </g>
);
