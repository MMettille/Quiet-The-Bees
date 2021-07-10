// ⬇ What we need to import for functionality
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
// ⬇ What Components we need to import
import Header from "../Header/Header";
import Fab from '../Fab/Fab';
function WordCloud() {

  useEffect(() => {
    // ⬇ This calls my get request from the server
    getWordCloud();
  }, []);

  const getWordCloud = () => {
    axios
      .get("/api/query/wordcloud")
      .then((response) => {
        const words = response.data;
        console.log(words);
        // ⬇ This creates the kind of chart that I would like from am4charts
        const x = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud);
        // ⬇ Creating the series for a word cloud
        const series = x.series.push(
          new am4plugins_wordCloud.WordCloudSeries()
        );
        // ⬇ Binding the series to the data we grabbed from the database
        series.data = words;
        series.dataFields.word = "tag";
        series.dataFields.value = "weight";
        series.labels.template.tooltipText = "{word}:\n[bold]{value}[/]";
        // ⬇ Customizing the color
        series.colors = new am4core.ColorSet();
        series.colors.passOptions = {};
        series.colors.list = [
          am4core.color("#0096a5"),
          am4core.color("#56c7d6"),
          am4core.color("#7e57c2"),
          am4core.color("#8e0000"),
          am4core.color("#388e3c"),
        ];
      })
      .catch((error) => {
        console.log(`We have a server error`, error);
      });
  };

  return (
    <>
      <Header />
      <div className="container">
      <h1>Welcome to Your Word Cloud!</h1>
      <h5>Hover over each word and you will see how many times you have 
        entered that trigger. The larger the word, the more times you have
        entered that word or phrase.</h5>
      <div id="chartdiv"></div>
      </div>
      <Fab />
    </>
  );
}

export default WordCloud;
