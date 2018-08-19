const CustomCheckBox = require('customCheckBox.js').CustomCheckBox;

class label extends React.Component {
  constructor(props) {
    isSelected : props.isSelected || false,
    index : props.index || null,
    text : props.text || "",
    parent : props.parent || {}
  }

  render() {
    <table>
      <tr>
        <td>
          <CustomCheckBox isHeader={false} isSelected={this.state.isSelected}/>
        </td>
        <td>
          <p>Label{this.state.index != 1 ? this.state.index : 1}</p>
          <input placeholder={this.state.text}></input>
        </td>
        <td>
          Remove Button
        </td>
      </tr>
    </table>
  }
}
