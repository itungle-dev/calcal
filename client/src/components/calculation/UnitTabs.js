import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";

const UnitTabs = ({ tabUnit, handleTabChange }) => {
	return (
		<Paper square>
			<Tabs
				value={tabUnit}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Imperial" />
				<Tab label="Metric" />
			</Tabs>
		</Paper>
	);
};

export default UnitTabs;
