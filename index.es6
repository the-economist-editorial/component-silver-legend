// SilverChartLegend is a child of the current chart style componentWillMount
import Dthree from 'd3';
import React from 'react';

export default class SilverLegend extends React.Component {

  // PROP TYPES
  // I assume we'll have a config object... eventually
  static get propTypes() {
    return {
      config: React.PropTypes.object,
      test: React.PropTypes.string,
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

  componentDidMount() {
    // if (this.props.config.seriesCount > 1) {
    //   console.log(this.props.config.seriesCount);
    this.updateLegend();
    // }
  }

  componentDidUpdate() {
    this.updateLegend();
  }

  // UPDATE LEGEND
  updateLegend() {
    const config = this.props.config;
    // If there's only one series, force the data to an empty array. So
    // the group always exists, but no content is appended. (This to
    // make sure the group always exists and prevent it drifting in from
    // 0,0 every time it's re-created...
    let data = [];
    if (config.seriesCount > 1) {
      data = config.legend.data;
    }
    const lineHeight = config.legend.lineHeight;
    const keyHeight = config.legend.keyHeight;
    const keyWidth = config.legend.keyWidth;
    // Context (parent group created in render)
    const legendGroup = Dthree.select('.chart-legend-group');
    // Bind legends array to group
    const legendGroupBinding = legendGroup.selectAll('.key-group')
      .data(data);
    // Enter, appending class
    const legendGroupsEnter = legendGroupBinding.enter().append('g')
      .attr('class', (ddd, iii) => {
        return `key-group key-${iii}`;
      })
      ;
    legendGroupsEnter.append('rect')
      .attr({
        'class': 'd3-key-rect',
        'x': 0,
        'y': (ddd, iii) => {
          return lineHeight * iii;
        },
        'height': keyHeight,
        'width': keyWidth,
      })
      ;

    legendGroupsEnter.append('text')
      .attr({
        'class': 'd3-key-text',
        'x': 7,
        'y': (ddd, iii) => {
          // To align text baseline, use key rect height:
          return ((lineHeight * iii) + keyHeight);
        },
      })
      ;

    // UPDATE
    legendGroupBinding.select('rect')
      .style('fill', (ddd) => ddd.colour)
      ;
    legendGroupBinding.select('text')
      .text((ddd) => ddd.string)
      ;
    // Exit
    legendGroupBinding.exit().remove();
  }
  // UPDATE LEGEND ends

  // RENDER
  // <rect className="legend-fill-rect"/>
  render() {
    return (
      <g className="chart-legend-group"/>
    );
  }
}
