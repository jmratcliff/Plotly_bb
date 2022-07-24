function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();

  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
  }

  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text(result.location);
    });
  }

  // 1. Create the buildCharts function.
  function buildCharts(sample) {
    // 2. Use d3.json to load and retrieve the samples.json file 
      d3.json("samples.json").then((data) => {
        // 3. Create a variable that holds the samples array. 
        var sampledata = data.samples;
  
  
        // 4. Create a variable that filters the samples for the object with the desired sample number.
        var samplesArray = sampledata.filter(sampleObj => sampleObj.id == sample);
  
        //  5. Create a variable that holds the first sample in the array.
        var sampleResult = samplesArray[0];
  
        // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
        var otuIds = data.samples.otu_ids;
        var otuLabels = data.samples.otu_labels;
        var sampleValues = data.samples.sample_values;
  
        // 7. Create the yticks for the bar chart.
        // Hint: Get the the top 10 otu_ids and map them in descending order  
        //  so the otu_ids with the most bacteria are last. 
  
        var yticks = sampleResult.map(y => y.otuIds).slice(0, 10).reverse();
  
  
        // 8. Create the trace for the bar chart. 
        var trace1 = {
          x: sampleValues,
          y: otuIds,
          text: otuLabels,
          type: "bar",
        };
      
        var barData = [trace1];
  
        // 9. Create the layout for the bar chart. 
        var barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100   
        }};
        // 10. Use Plotly to plot the data with the layout. 
        Plotly.newPlot("bar-plot", barData, barLayout);    
      });
    }  