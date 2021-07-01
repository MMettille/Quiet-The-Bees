import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud"; 

import Header from '../Header/Header'
import { stringifyRequest } from "loader-utils";
import { tag } from "postcss-selector-parser";
function WordCloud() {

    useEffect(() => {
      // ⬇ This calls my get request from the server
    getWordCloud()
    }, []);

    const getWordCloud = () => {
        axios.get("/api/query/wordcloud")
        .then((response) => {
            const words = response.data;
            console.log(words)

            // ⬇ This creates the kind of chart that I would like from am4charts
            const x = am4core.create("chartdiv", am4plugins_wordCloud.WordCloud );
            // ⬇ Creating the series for a word cloud
            const series = x.series.push(new am4plugins_wordCloud.WordCloudSeries());
            // ⬇ Binding the series to the data we grabbed from the database 
            series.data = words;
            series.dataFields.word = "tag";
            series.dataFields.value = "weight";
            // ⬇ Customizing the color
            series.colors = new am4core.ColorSet()
            series.colors.passOptions = {};
            series.colors.list = [
                am4core.color("#0096a5"),
                am4core.color("#56c7d6"),
                am4core.color("#7e57c2"),
                am4core.color("#8e0000"),
                am4core.color("#388e3c"),
            ]
            
        }).catch((error) => {
            console.log(`We have a server error`, error);
          });
    }

  return (
    <>
        <Header />
        <div id="chartdiv"></div>
    </>
  );
}

export default WordCloud;