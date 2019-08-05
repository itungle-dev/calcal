import React, { Component } from "react";
import { PieChart, Pie, Cell } from "recharts";

class ResultChart extends Component {
	RADIAN = Math.PI / 180;
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data
		};
	}

	componentDidMount() {
		this.setState({ data: this.props.data });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (
			this.props.data[0].value !== prevProps.data[0].value ||
			this.props.data[1].value !== prevProps.data[1].value ||
			this.props.data[2].value !== prevProps.data[2].value
		) {
			this.setState((prevState, props) => {
				return { data: props.data };
			});
		}
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
		console.log("resultChart this.state.data", this.state.data);
		console.log("resultChart this.props.data", this.props.data);
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
