const Label = require('label.js').Label;
const Header = require('header.js').Header;

class AddLabel extends React.Component {
  constructor(props) {
    labels : props.labels || []
  }

  render() {
    var labelsContent = this.state.labels;
    var _this = this;

    var labels = (
      labelsContent.map(function(data, index) {
        <Label isSelected={data.isSelected} index={index + 1} text={data.text} parent={_this.state} />
      })
    )

    return (
      <Header labels={labelsContent} />
      {labels}
      <p>Add label button and submit button</p>
    )
  }
}
