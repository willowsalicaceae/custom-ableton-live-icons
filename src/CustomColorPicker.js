import React from 'react';
import { CustomPicker } from 'react-color';
import { EditableInput } from 'react-color/lib/components/common';

const initialSwatchSize = { width: 12, height: 12 }; // Initial size of 15x15 pixels

const colorSwatches = [
  '#ff94a6', '#ffa529', '#cc9927', '#f7f47c', '#bffb00', '#1aff2f', '#25ffa8', '#5cffe8', '#8bc5ff', '#5480e4', '#92a7ff', '#d86ce4', '#e553a0', '#ffffff',
  '#ff3636', '#f66c03', '#99724b', '#fff034', '#87ff67', '#3dc300', '#00bfaf', '#19e9ff', '#10a4ee', '#007dc0', '#886ce4', '#b677c6', '#ff39d4', '#d0d0d0',
  '#e2675a', '#ffa374', '#d3ad71', '#edffae', '#d2e498', '#bad074', '#9bc48d', '#d4fde1', '#cdf1f8', '#b9c1e3', '#cdbbe4', '#ae98e5', '#e5dce1', '#a9a9a9',
  '#c6928b', '#b78256', '#99836a', '#bfba69', '#a6be00', '#7db04d', '#88c2ba', '#9bb3c4', '#85a5c2', '#8393cc', '#a595b5', '#bf9fbe', '#bc7196', '#7b7b7b',
  '#af3333', '#a95131', '#724f41', '#dbc300', '#85961f', '#539f31', '#0a9c8e', '#236384', '#1a2f96', '#2f52a2', '#624bad', '#a34bad', '#cc2e6e', '#3c3c3c',
];

class MyCustomCompactPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '',
      swatchSize: initialSwatchSize, // State to manage swatch size
    };
  }

  handleChange = (color, event) => {
    event.preventDefault();
    this.setState({ selectedColor: color });
    this.props.onChange({ hex: color, source: 'hex' });
  };

  renderSwatches() {
    const { selectedColor, swatchSize } = this.state;
    return colorSwatches.map(color => (
      <div key={color} style={{
        background: color,
        width: `${swatchSize.width}px`, // Dynamic width from state
        height: `${swatchSize.height}px`, // Dynamic height from state
        float: 'left',
        margin: '3px',
        cursor: 'pointer',
        border: selectedColor === color ? '1px solid #111111' : '1px solid transparent',
      }}
      onMouseEnter={(e) => e.currentTarget.style.border = '1px solid #b0ddeb'} // Hover effect
      onMouseLeave={(e) => e.currentTarget.style.border = selectedColor === color ? '1px solid #111111' : '1px solid transparent'} // Remove hover effect if not selected
      onClick={(e) => this.handleChange(color, e)}
      />
    ));
  }

  adjustSwatchSize = (newWidth, newHeight) => {
    this.setState({
      swatchSize: { width: newWidth, height: newHeight }
    });
  }

  render() {
    const marginSize = 6;
    const numRows = 5; // Total number of rows
    const numColumns = 14; // Total number of columns in a row

    // No need to adjust width for marginRight on the last item per row in a flex container
    const gridWidth = (this.state.swatchSize.width * (numColumns + 1)) + (marginSize * (numColumns - 1)) + 4;
    // Adjust height to account for the marginBottom on the last row
    const gridHeight = (this.state.swatchSize.height * (numRows + 1)) + (marginSize * (numRows - 1)) + 4;


    return (
      <div style={{
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        padding: '4px',
        background: '#222222',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between', // This evenly spaces items horizontally
        border: '1px solid #b5b5b5',
      }}>
        <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
          {this.renderSwatches()}
        </div>
      </div>
    );
  }
}

export default CustomPicker(MyCustomCompactPicker);
