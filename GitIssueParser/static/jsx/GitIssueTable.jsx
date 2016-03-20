var React = require("react")
var ReactDOM = require("react-dom")
var BS = require("react-bootstrap")

var GitIssueTable = React.createClass({
	render: function() {
		var self=this
		var tableRows=Object.keys(this.props.data).map(function (key) {
			return (
				<tr>
					<th>{key}</th>
					<td>{self.props.data[key]}</td>
				</tr>
			)
		});
    var tableStyle={
			marginTop:"4%"
		}
		var tableHeadingStyle={
			textAlign:"center",
			backgroundColor:"#0B648F",
			color:"#FFFFFF"
		}
		return (
			<div className="row" style={tableStyle} >
				<div className="col-lg-6 col-lg-offset-3" >
					<BS.Table responsive striped bordered condensed hover>
						<thead>
							<tr>
							 <th style={tableHeadingStyle}>OPEN ISSUE DURATION</th>
							 <th style={tableHeadingStyle}>COUNTS</th>
							</tr>
						</thead>
						<tbody>
							{tableRows}
						</tbody>
					</BS.Table>
				</div>
			</div>
		)

	}

})

module.exports = GitIssueTable
