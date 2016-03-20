var React = require("react")
var ReactDOM = require("react-dom")
var BS = require("react-bootstrap")
var request = require("superagent")

var SearchBar = React.createClass({
	getInitialState: function() {
		return ({value: ""})
	},
	handleOnSubmit: function() {
		 this.props.handleOnSubmit(this.state.value)
	},
	handleChange: function() {
		this.setState({value: this.refs.input.getValue()});
	},
	render: function() {
		var boxStyle = {
			marginTop: "5%"
		};
		var inputStyle = {
			marginTop: "2%"
		}
		return (
			<div>
				<div className="row" style={inputStyle}>
					<div className="col-lg-6 col-lg-offset-3">
						<BS.Input value={this.state.value} onChange={this.handleChange} type="text" placeholder="Enter Git Repo URL" ref="input"/>
					</div>
				</div>
				<div className="row">
					<BS.Button className="btn btn-primary center-block" type="button" value="Search" bsStyle="success" onClick={this.handleOnSubmit}>
						Search</BS.Button>
				</div>
			</div>
		)
	}
})

module.exports = SearchBar
