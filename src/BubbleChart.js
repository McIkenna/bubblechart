import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data }) => {
  const svgRef = useRef(null);
  

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    

    // Set up the simulation
    const simulation = d3.forceSimulation(data)
      .force('charge', d3.forceManyBody().strength(6))
      .force('x', d3.forceX().strength(0.05))
      .force('y', d3.forceY().strength(0.05))
      .force('collision', d3.forceCollide().radius(d => d.radius + 1));

    // Draw the bubbles
    svg.selectAll('.bubble')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'bubble')
      .attr('r', d => d.radius)
      .attr('fill', d => d.color)
      .append('text')
      .text(d=>d.label)
      .attr("font-size", d => d.fontSize)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)

    // Update the simulation on each tick
    simulation.on('tick', () => {
      svg.selectAll('.bubble')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    // Start the simulation
    simulation.restart();
  }, [data]);

  return (
    <svg ref={svgRef} width="1000" height="1000" viewBox="-100 0 500 100"></svg>
  );
};

export default BubbleChart;