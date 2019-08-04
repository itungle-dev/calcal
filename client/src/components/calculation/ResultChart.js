import React, { Component } from "react";
import { PieChart, Pie, Cell } from "recharts";

class ResultChart extends Component {
	RADIAN = Math.PI / 180;
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		this.setState({ data: this.props.data });
	}

	renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percent,
		index
	}) => {
		const data = this.state.data;

		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
		const y = cy + radius * Math.sin(-midAngle * this.RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="baseline"
			>
				<tspan x={x}>{`${data[index].name}`}</tspan>
				<tspan x={x} dy="1.1em">{`${data[index].value}`}</tspan>
				<tspan x={x} dy="1.1em">{`${data[index].value}`}</tspan>
			</text>
		);
	};

	render() {
		return (
			<PieChart width={300} height={300}>
				<Pie
					dataKey="value"
					data={this.state.data}
					cx={150}
					cy={150}
					label={this.renderCustomizedLabel}
					labelLine={false}
				>
					{this.state.data.map(field => {
						return <Cell key={field.name} fill={field.color} />;
					})}
				</Pie>
			</PieChart>
		);
	}
}

export default ResultChart;
