import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 

import Header from '../Header/Header'
import { stringifyRequest } from "loader-utils";
function WordCloud() {

    // ⬇ Creating the chart
    const chart = useRef(null);

    useEffect(() => {
      // ⬇ This calls my get request from the server
    //   getWordCloud();
    getStringOfWords()
    }, []);
  
    
    const dataArray = []
    const getStringOfWords = () => {
        axios.get("/api/query/wordcloud")
        .then((response) => {
            const words = response.data;
            getStringArray(words)
            console.log(dataArray)

            // ⬇ This creates the kind of chart that I would like from am4charts
            const x = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud ); 
        }).catch((error) => {
            console.log(`We have a server error`, error);
          });
    }

    const getStringArray = (words)=> {
        words.map(data => {
            dataArray.push(data.trigger)
        })
        return dataArray;
    }





    // ⬇ This gets my data from the database and sets it to feedback
    // const getWordCloud = () => {
    //   axios
    //     .get("/api/query/spoongraph")
    //     .then((response) => {
    //       const spoonData = response.data;
          
  
    // //       // ⬇ This creates the kind of chart that I would like from am4charts
    //       let x = am4core.create("chartdiv", am4charts.XYChart);
    //       // ⬇ Padding to the right of the graph
    //       x.paddingRight = 20;
    //       x.paddingLeft = 20;
    //       // ⬇ This declares what kind of date format I would like.
    //       x.dateFormatter.dateFormat = "yyyy-MM-dd";
    //       // ⬇ Adding from the data that I set in the getFeedback function
    //       let data = spoonData
    //       // ⬇ Making the data tied to the chart, called x.
    //       x.data = data;
    //       // ⬇ creating xAxes (the horizontal axis)
    //       let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    //       dateAxis.title.text = "Date";
    //       dateAxis.renderer.grid.template.location = 0;
    //       // ⬇ creating yAxes (the vertical axis)
    //       let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    //       valueAxis.title.text = "Spoons"
    //       valueAxis.tooltip.disabled = true;
    //       valueAxis.renderer.minWidth = 35;
    //       valueAxis.min = 0;
    //       valueAxis.max = 10;
    //       valueAxis.extraMin = 0.1;
    //       valueAxis.extraMax = 0.1; 
    //       // ⬇ Creating the series for a line graph
    //       let series = x.series.push(new am4charts.LineSeries());
    //       // ⬇ Binding the data to the series
    //       series.dataFields.dateX = "date";
    //       series.dataFields.valueY = "spoon";
    //       series.tooltipText = "{valueY.value}";
    //       x.cursor = new am4charts.XYCursor();
    //       // ⬇ Scrollbar functionality at the top of the graph
    //       let scrollbarX = new am4charts.XYChartScrollbar();
    //       scrollbarX.series.push(series);
    //       x.scrollbarX = scrollbarX;
  
    //       chart.current = x;
  
    //     })
  
    // }


  return (
    <>
        <Header />
        {/* <div id="chartdiv"></div> */}
    </>
  );
}

export default WordCloud;