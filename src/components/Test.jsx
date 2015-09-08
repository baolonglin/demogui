
var React = require('react');

var SaySomething = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.text.getDOMNode().value);
    },
    render: function() {
        return (
            <form>
                <input type="text"
                       ref="text"
                       onChange={this.handleChange}
                       value={this.props.text}
                       placeholder="Say something..." />
            </form>
        );
    }
});


var MyContainer = React.createClass({
    getInitialState: function() {
        return { text: 'Hello' };
    },
    handleUserInput: function(text) {
        this.setState({
            text: text
        });
    },
    render: function() {
        return  (<div>
                <SaySomething text={this.state.text} onUserInput={this.handleUserInput} />
                <Intermediate text={this.state.text} /></div>);
    }
});

var Intermediate = React.createClass({
  render: function() {
    // Intermediate doesn't care of "text", but it has to pass it down nonetheless
      return <Child text={this.props.text}></Child>;
  }
});
var Child = React.createClass({
    render: function() {
        var style;
        if(this.props.text) {
            style = {
                color: 'red'
            };
        }
        var children = [];
        children.push(<GrandChild text={this.props.text}/>);

        return (<span style={style}>
                    {this.props.text}
                    {children}
        </span>);
    }
});

var GrandChild = React.createClass({
    render: function() {
        var style;
        if(this.props.text) {
            style = {
                color: this.props.text
            };
        }
        return <div style={style}>{this.props.text}</div>
    }
});

module.exports = MyContainer;
