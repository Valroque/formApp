class CustomCheckBox extends React.Component {
  constructor(props) {
    this.state = {
      isHeader : props.isHeader || false,
      isSelected : props.isSelected || false
    }
  }

  render() {
    var isHeader = this.state.isHeader;
    var isSelected = this.state.isSelected;
    var currentClass;

    if(isSelected) {
      if(isHeader) {
        currentClass = "headerCheckBox";
      } else {
        currentClass = "labelCheckBox";
      }
    } else {
      currentClass = "unselected";
    }

    if(currentClass == "headerCheckBox") {
      return (
        <div class={currentClass}><i class="fas fa-minus"></i></div>
      )
    } else if(currentClass == "labelCheckBox") {
      return (
        <div class={currentClass}><i class="fas fa-check"></i></div>
      )
    } else {
      return (
        <div class={currentClass}></div>
      )
    }
  }
}

exports.CustomCheckBox = CustomCheckBox;
