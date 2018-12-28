# Overview

<img src="/static/dataiku/images/dss-logo-about.png" width="70" style="float: right; margin-right: 30px" />

This page explains how we can develop a chord chart representation using d3.js capabilities and integration in <i class="icon-dkubird" /> **DSS**

it is based on the d3 charts samples available here : [d3.js sample by Mike Bostock](https://bl.ocks.org/mbostock)

# Details

to use javascript data visualization based on d3.js, we need to develop a WebApp. 
The following App shows the final result 
- [Chord Analysis](web_app:WEBLOGSANALYSIS.h92ez90)

The development is split into 4 parts :

| Part  | Purpose .     |
|-------|-----------------|
|HTML | The html part is very easy end references the d3js library       |
|CSS     | The ccs part is used to manage the styles, font, colors of web contents       |
|Javascript | The javascript part is most important. it handles the data process and graphical rendering  |
| Python | The python backend is used to push the dataset to the javascript part   |
