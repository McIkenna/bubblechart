import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const BubChart = ({
  overflow,
  graph,
  data,
  height,
  width,
  padding,
  showLegend,
  legendPercentage,
  bubbleClickFun,
  valueFont,
  labelFont,
}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const bubblesWidth = showLegend ? width * (1 - (legendPercentage / 100)) : width;
    const legendWidth = width - bubblesWidth;
    const color = d3.scaleOrdinal(d3.schemeCategory20c);
    const pack = d3.pack()
      .size([bubblesWidth * graph.zoom, bubblesWidth * graph.zoom])
      .padding(padding);
    const root = d3.hierarchy({ children: data })
      .sum(function (d) { return d.value; })
      .sort(function (a, b) { return b.value - a.value; })
      .each((d) => {
        if (d.data.label) {
          d.label = d.data.label;
          d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
        }
      });
    const nodes = pack(root).leaves();

    svg.html('');
    if (overflow) svg.style('overflow', 'visible');

    const bubbleChart = svg.append('g')
      .attr('class', 'bubble-chart')
      .attr('transform', `translate(${bubblesWidth * graph.offsetX},${bubblesWidth * graph.offsetY})`);

    const node = bubbleChart.selectAll('.node')
      .data(nodes)
      .join('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${d.x},${d.y})`)
        .on('click', (d) => {
          bubbleClickFun(d.label);
        });

    node.append('circle')
      .attr('id', (d) => d.id)
      .attr('r', (d) => d.r - (d.r * 0.04))
      .style('fill', (d) => d.data.color ? d.data.color : color(nodes.indexOf(d)))
      .style('z-index', 1)
      .on('mouseover', function (d) {
        d3.select(this).attr('r', d.r * 1.04);
      })
      .on('mouseout', function (d) {
        const r = d.r - (d.r * 0.04);
        d3.select(this).attr('r', r);
      });

    node.append('clipPath')
      .attr('id', (d) => `clip-${d.id}`)
      .append('use')
      .attr('xlink:href', (d) => `#${d.id}`);

    node.append('text')
      .attr('class', 'value-text')
      .style('font-size', `${valueFont.size}px`)
      .attr('clip-path', (d) => `url(#clip-${d.id})`)
      .style('font-weight', (d) => valueFont.weight ? valueFont.weight : 600)
      .style('font-family', valueFont.family)
      .style('fill', () => valueFont.color ? valueFont.color : '#000')
      .style('stroke', () => valueFont.lineColor ? valueFont.lineColor : '#000')
      .style('stroke-width', () => valueFont.lineWeight ? valueFont.lineWeight : 0)
      .text((d) => d.data.value);
    node.append('text')
      .attr('class', 'label-text')
      .style('font-size', `${labelFont.size}px`)
      .attr('clip-path', (d) => `url(#clip-${d.id})`)
      .style('font-weight', (d) => labelFont.weight ? labelFont.weight : 600)
      .style('font-family', labelFont.family)
      .style('fill', () => labelFont.color ? labelFont.color : '#000')
      .style('stroke', () => labelFont.lineColor ? labelFont.lineColor : '#000')
      .style('stroke-width', () => labelFont.lineWeight ? labelFont.lineWeight : 0)
      .text((d) => d.label);
    
    if (showLegend) {
      const legend = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${bubblesWidth},${(height - (nodes.length * 20)) / 2})`);
    
    const legendItems = legend.selectAll('.legend-item')
        .data(nodes)
        .join('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0,${i * 20})`);
    
    legendItems.append('rect')
        .attr('width', 12)
        .attr('height', 12)
        .style('fill', (d) => d.data.color ? d.data.color : color(nodes.indexOf(d)));
    
    legendItems.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('dy', '0.35em')
        .style('font-size', '12px')
        .text((d) => d.label);
    }
  }, [overflow, graph, data, height, width, padding, showLegend, legendPercentage, bubbleClickFun, valueFont, labelFont]);

  return (
  <svg ref={svgRef} height={height} width={width}>
  <g className="bubble-chart"></g>
  </svg>
  );
  };
  
  BubChart.propTypes = {
  overflow: PropTypes.bool,
  graph: PropTypes.shape({
  zoom: PropTypes.number,
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  }),
  data: PropTypes.arrayOf(
  PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  }).isRequired,
  ).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  showLegend: PropTypes.bool.isRequired,
  legendPercentage: PropTypes.number.isRequired,
  bubbleClickFun: PropTypes.func,
  valueFont: PropTypes.shape({
  size: PropTypes.number.isRequired,
  weight: PropTypes.number,
  family: PropTypes.string.isRequired,
  color: PropTypes.string,
  lineColor: PropTypes.string,
  lineWeight: PropTypes.number,
  }),
  labelFont: PropTypes.shape({
  size: PropTypes.number.isRequired,
  weight: PropTypes.number,
  family: PropTypes.string.isRequired,
  color: PropTypes.string,
  lineColor: PropTypes.string,
  lineWeight: PropTypes.number,
  }),
  };
  
  BubChart.defaultProps = {
  overflow: false,
  graph: {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  },
  padding: 1,
  showLegend: true,
  legendPercentage: 20,
  valueFont: {
  size: 12,
  family: 'sans-serif',
  },
  labelFont: {
  size: 12,
  family: 'sans-serif',
  },
  };
  
export default BubChart;
    
