class CustomCheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.state = {
      isHeader : props.isHeader,
      isSelected : props.isSelected,
      index : props.index,
      allSelected : props.allSelected
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.isSelected != prevProps.isSelected) {
      this.setState({
        isHeader : this.props.isHeader,
        isSelected : this.props.isSelected,
        index : this.props.index,
        allSelected : this.props.allSelected
      })
    }
  }

  toggleSelection() {
    if(this.state.isHeader) {
      if(this.state.isSelected) {
        console.log('here1');
        if(this.state.allSelected) {
          console.log('here2');
          this.props.toggleSelection(0, false);
        } else {
          this.props.toggleSelection(0, true);
        }
      } else {
        this.props.toggleSelection(0, true);
      }
    } else {
      if(this.state.isSelected) {
        this.props.toggleSelection(this.state.index, false);
      } else {
        this.props.toggleSelection(this.state.index, true);
      }
    }
  }

  render() {
    console.log('called4', this.state);
    var isHeader = this.state.isHeader;
    var isSelected = this.state.isSelected;
    var currentClass;

    if(isSelected) {
      currentClass = "selectedCheckBox"
    } else {
      currentClass = "unselectedCheckBox";
    }

    if(currentClass == "selectedCheckBox" && isHeader) {
      return (
        <div className={currentClass} onClick={this.toggleSelection}><i className="fas fa-minus"></i></div>
      )
    } else if(currentClass == "selectedCheckBox" && !isHeader) {
      return (
        <div className={currentClass} onClick={this.toggleSelection}><i className="fas fa-check"></i></div>
      )
    } else {
      return (
        <div className={currentClass} onClick={this.toggleSelection}></div>
      )
    }
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    var count = 0;
    var labels = this.props.labels
    labels.forEach(function(data) {
      if(data.isSelected) {
        count++;
      }
    })

    this.state = {
      labels : props.labels || [],
      isSelected : count > 0 ? true : false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    var labels = this.props.labels;
    var count = 0;
    labels.forEach(function(data) {
      if(data.isSelected) {
        count++;
      }
    })
    var shouldSelect = count > 0 ? true : false;

    if(prevState.isSelected != shouldSelect) {
      this.setState({
        labels : this.props.labels,
        isSelected : shouldSelect
      })
    }
  }

  render() {
    console.log('called3', this.state);
    var labels = this.state.labels;
    var count = 0;
    labels.forEach(function(data) {
      if(data.isSelected) {
        count++;
      }
    })

    return (
          <tr className="header">
            <td className="col1">
              <CustomCheckBox isHeader={true} allSelected={(count==labels.length) ? true : false} isSelected={this.state.isSelected} index={0} toggleSelection={this.props.toggleSelection}/>
            </td>
            <td className="col2">
              <p className="secHeading">Section Heading</p>
              {
                count > 0 ? (
                  <p style={{textAlign:'right',color:'#a6a6a6',marginRight:'10px',marginTop:'15px'}}>{count} Labels Selected</p>
                ) : null
              }
            </td>
            {
              count > 0 ? (
                <td className="col3">
                  <div className="buttonDiv">REMOVE</div>
                </td>
              ) : (
                <td className="col3">
                  <div className="buttonDiv" style={{color:'#D3D3D3'}}>REMOVE</div>
                </td>
              )
            }
          </tr>
    )
  }
}

class Label extends React.Component {
  constructor(props) {
    super(props);
    this.removeLabel = this.removeLabel.bind(this);
    this.state = {
      isSelected : props.isSelected,
      index : props.index,
      text : props.text || ""
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.isSelected != prevProps.isSelected ||
      this.props.text != prevProps.text ||
      this.props.index != prevProps.index
    ) {
      this.setState({
        isSelected : this.props.isSelected,
        text : this.props.text,
        index : this.props.index
      })
    }
  }

  removeLabel() {
    this.props.removeLabel(this.state.index);
  }

  render() {
    console.log('called2', this.state);
    return (
          <tr className="label" style={{height:'110px'}}>
            <td className="col1">
              <CustomCheckBox isHeader={false} isSelected={this.state.isSelected} toggleSelection={this.props.toggleSelection} index={this.state.index}/>
            </td>
            <td className="col2">
              <p>Label&nbsp;{this.state.index != 1 ? this.state.index : null}</p>
              <input placeholder={this.state.text}></input>
            </td>
            {
              this.state.index != 1 ? (
                <td className="col3" style={{width:'13%',textAlign:'right',paddingTop:'33px',cursor:'pointer',color:'red'}} onClick={this.removeLabel}>
                  REMOVE
                </td>
              ) : (
                <td className="col3" style={{width:'13%',textAlign:'right', paddingTop:'33px'}}></td>
              )
            }
          </tr>
    )
  }
}

class AddLabel extends React.Component {
  constructor(props) {
    super(props);
    this.removeLabel = this.removeLabel.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.state = {
      labels : props.labels || []
    }
  }

  removeLabel(index) {
    var stateData = [];
    for(var x in this.state.labels) {
      stateData.push(x);
    }
    stateData.splice(index-1, 1);
    this.setState({
      labels: stateData
    });
  }

  toggleSelection(type, newState) {
    var currentState = this.props.labels;

    if(type == 0) {
      var stateData = [];
      for(var x in currentState) {
        stateData.push(currentState[x]);
      }
      stateData.map(function(label) {
        label.isSelected = newState;
        return label;
      })
      this.setState({
        labels: stateData
      });
    } else {
      var stateData = [];
      for(var x in currentState) {
        stateData.push(currentState[x]);
      }
      stateData[type-1].isSelected = newState;
      this.setState({
        labels: stateData
      });
    }
  }

  render() {
    console.log('called1', this.state);
    var labelsContent = this.state.labels;
    var _this = this;

    var labels = (
      labelsContent.map(function(data, index) {
        return (
          <Label
            key={index+1}
            isSelected={_this.state.labels[index].isSelected}
            index={index + 1}
            text={data.text}
            removeLabel={_this.removeLabel}
            toggleSelection={_this.toggleSelection}
          />
        )
      })
    )

    return (
        <div>
            <table>
              <tbody>
                <Header labels={labelsContent} toggleSelection={_this.toggleSelection}/>
                {labels}
                <tr>
                  <td></td>
                  <td style={{paddingTop:'25px',borderBottom:'1px solid #D3D3D3'}}></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div style={{margin:'30px 0xp 30px 10%',height:'100px'}}>
              <p className="addLabel">+ ADD LABEL</p>
            </div>
            <div className="submitButton">SUBMIT</div>
      </div>
    )
  }
}

ReactDOM.render(
  <AddLabel labels={[
    {
      isSelected: false,
      text: "Nice"
    },
    {
      isSelected: true,
      text: "Good"
    },
    {
      isSelected: true,
      text: "Excellent"
    }
  ]} />,
  document.getElementById('root')
);
