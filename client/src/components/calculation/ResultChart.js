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
			this.props.data[0].calories !== prevProps.data[0].calories ||
			this.props.data[1].calories !== prevProps.data[1].calories ||
			this.props.data[2].calories !== prevProps.data[2].calories ||
			this.props.data[0].grams !== prevProps.data[0].grams ||
			this.props.data[1].grams !== prevProps.data[1].grams ||
			this.props.data[2].grams !== prevProps.data[2].grams
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
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * this.RADIAN);
		const y = cy + radius * Math.sin(-midAngle * this.RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="central"
			>
				<tspan x={x} dx="0.5em" dy="-1em" fontSize="smaller">{`${
					this.state.data[index].name
				}`}</tspan>
				<tspan x={x} dx="0.5em" dy="1.1em" fontSize="smaller">
					{`${this.state.data[index].grams}`} grams
				</tspan>
				<tspan x={x} dx="0.5em" dy="1.1em" fontSize="smaller">
					{`${this.state.data[index].calories}`} calories
				</tspan>
			</text>
		);
	};

	render() {
		return (
			<PieChart width={300} height={300}>
				<Pie
					dataKey="ratio"
					data={this.state.data}
					cx={150}
					cy={150}
					label={this.renderCustomizedLabel}
					labelLine={false}
					animationDuration={1000}
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
