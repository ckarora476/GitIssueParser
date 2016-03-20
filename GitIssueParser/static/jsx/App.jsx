var React = require("react")
var ReactDOM = require("react-dom")
var SearchBar = require("./SearchBar.jsx")
var request = require("superagent")
var GitIssueTable = require("./GitIssueTable.jsx");
var Loader = require('react-loader');
require("./../css/app.css");
var baseURL = "https://gitissueparser.herokuapp.com/"
var GitIssueParserApp = React.createClass({
	getInitialState: function() {
		return ({url: "", "table_data": {}, "table_visible": false, loaded: true,error:false,errorMessage:""})
	},
	render: function() {
		var errorStyle={
			color:"red",
			margin:"0 auto"
		}
		return (
			<div className="container">
					<Header heading="GIT ISSUE PARSER"/>
					<SearchBar handleOnSubmit={this.handleOnSubmit}></SearchBar>
					<Loader loaded={this.state.loaded}>
					{this.state.table_visible
						? <GitIssueTable data={this.state.table_data}></GitIssueTable>
						: <div></div>}
					{this.state.error?<Error error={this.state.errorMessage}></Error>:<div></div>}
				</Loader>

			</div>
		)
	},
	handleOnSubmit: function(urlString) {
		var self = this
		var mat = /^https:\/\/github.com\/[\.\w-]+\/[\.\w-]+$/

		if (urlString===""){
			self.setState({table_visible:false,error:true,errorMessage:"URL cannot be empty"})
			return
		}
		if(mat.test(urlString)==false){
			self.setState({table_visible:false,error:true,errorMessage:"Invalid Git URL"})
			return
		}

		self.setState({loaded: false})
		this.setState({url: urlString})
		var apiUrl = baseURL + "repo/issues"
		request.post(apiUrl).send({git_url: urlString}).set('Accept', 'application/json').end(function(err, res) {
			if (err || !res.ok) {
				errorJSON=JSON.parse(res.text)
				self.setState({table_visible:false,error:true,errorMessage:errorJSON.error})
			} else {
				self.parseDataAndSetState(res.text)
			}
			self.setState({loaded: true})
		});

	},
	parseDataAndSetState: function(jsonString) {
		var jsonObj = JSON.parse(jsonString)
		this.setState({table_data: jsonObj.open_issue_counts, table_visible: true,error:false})

	}

});

var Error=React.createClass({
	render: function() {
		var errorStyle={
			color:"red"
		}
		return (
			<div className="row">
				<div className="col-lg-6 col-lg-offset-3">
					<h4 style={errorStyle}>{"**"+this.props.error}</h4>
				</div>
			</div>
		)

	}
})

var Header = React.createClass({
	render: function() {
		var headerStyle={
			marginTop:"10%"
		}
		return (
			<div className="row" style={headerStyle}>
				<div className="col-lg-6 col-lg-offset-4">
					<h1>{this.props.heading}</h1>
				</div>
			</div>
		)

	}
});

ReactDOM.render(
	<GitIssueParserApp/>, document.getElementById("mainapp"))
