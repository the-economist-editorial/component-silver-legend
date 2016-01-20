// SilverChartLegend is a child of the current chart style componentWillMount
import Dthree from 'd3';
import React from 'react';

export default class SilverLegend extends React.Component {

  // PROP TYPES
  static get propTypes() {
    return {
    };
  }

  // DEFAULT PROPS
  // This component maintains class names for the elements that it appends
  static get defaultProps() {
    return {
    };
  }

  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // RENDER
  render() {
    console.log('Legend!');
    return (
      <div className="tempdiv">Legends</div>
    );
  }
}
