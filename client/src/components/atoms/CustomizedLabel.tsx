type CustomizedLabelProps = {
  x?: number;
  y?: number;
  stroke?: string;
  value?: string;
};

export const CustomizedLabel = ({
  x = 0,
  y = 0,
  stroke = "#000",
  value = "",
}: CustomizedLabelProps) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
);
