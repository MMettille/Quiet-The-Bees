// ⬇ What we need to import for functionality
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
// ⬇ What Components we need to import
import Header from "../Header/Header";
import "./SpoonGraph.css";
import Fab from '../Fab/Fab';

function SpoonGraph() {
  // ⬇ Creating the chart
  const chart = useRef(null);

  useEffect(() => {
    // ⬇ This calls my get request from the server
    getUserSpoonInput();
  }, []);

  // ⬇ This gets my data from the database and sets it to feedback
  const getUserSpoonInput = () => {
    axios
      .get("/api/query/spoongraph")
      .then((response) => {
        const spoonData = response.data;

        // ⬇ This creates the kind of chart that I would like from am4charts
        let x = am4core.create("chartdiv", am4charts.XYChart);
        // ⬇ Padding to the right of the graph
        x.paddingRight = 20;
        x.paddingLeft = 20;
        // ⬇ This declares what kind of date format I would like.
        x.dateFormatter.dateFormat = "yyyy-MM-dd";
        // ⬇ Adding from the data that I set in the getFeedback function
        let data = spoonData;
        // ⬇ Making the data tied to the chart, called x.
        x.data = data;
        // ⬇ creating xAxes (the horizontal axis)
        let dateAxis = x.xAxes.push(new am4charts.DateAxis());
        dateAxis.title.text = "Date";
        dateAxis.renderer.grid.template.location = 0;
        // ⬇ creating yAxes (the vertical axis)
        let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Spoons";
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        valueAxis.min = 0;
        valueAxis.max = 10;
        valueAxis.extraMin = 0.1;
        valueAxis.extraMax = 0.1;
        // ⬇ Creating the series for a line graph
        let series = x.series.push(new am4charts.LineSeries());
        // ⬇ Binding the data to the series
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "spoon";
        series.tooltipText = "{valueY.value}";
        x.cursor = new am4charts.XYCursor();
        // ⬇ Scrollbar functionality at the top of the graph
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        x.scrollbarX = scrollbarX;

        chart.current = x;
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });
  };

  

  return (
    <>
      <Header />
      <div className="container">
        <h1>Welcome to Your Spoon Graph!</h1>
        <h5>Here you will see how your spoons change throughout time.</h5>
        <div id="chartdiv"></div>
      </div>
      <Fab />
    </>
  );
}

export default SpoonGraph;
