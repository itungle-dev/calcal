import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const ResultChart = ({ data, animation }) => {
	const RADIAN = Math.PI / 180;
	let renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="central"
			>
				<tspan x={x} dx="0.5em" dy="-1em" fontSize="smaller">{`${
					data[index].name
				}`}</tspan>
				<tspan x={x} dx="0.5em" dy="1.1em" fontSize="smaller">
					{`${data[index].grams}`} grams
				</tspan>
				<tspan x={x} dx="0.5em" dy="1.1em" fontSize="smaller">
					{`${data[index].calories}`} calories
				</tspan>
			</text>
		);
	};
	return (
		<PieChart width={250} height={250}>
			<Pie
				dataKey="ratio"
				data={data}
				cx="50%"
				cy="50%"
				label={renderCustomizedLabel}
				labelLine={false}
				isAnimationActive={false}
			>
				{data.map(field => {
					return <Cell key={field.name} fill={field.color} />;
				})}
			</Pie>
		</PieChart>
	);
};

export default ResultChart;
