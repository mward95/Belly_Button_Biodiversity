function buildCharts(patientID) {
// #################################################
// READ & INTERPRET THE DATA
// #################################################

    // Read in the JSON data
    // confirm data is in console
    d3.json("samples.json").then((data => {
        console.log(data);

        // Define samples
        var samples = data.samples
        var metadata = data.metadata
        var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

        // Filter by patient ID
        var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

        // Create variables for chart
        // Grab sample_values for the bar chart
        var sample_values = filteredSample.sample_values

        // Use otu_ids as the labels for bar chart
        var otu_ids = filteredSample.otu_ids

        // use otu_labels as the hovertext for bar chart
        var otu_labels = filteredSample.otu_labels

    }))


};

// #################################################
// Demographic Info
// #################################################
function populateDemoInfo(patientID) {

    var demographicInfoBox = d3.select("#sample-metadata");

    d3.json("samples.json").then(data => {
        var metadata = data.metadata
        var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == patientID)[0]

        console.log(filteredMetadata)
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            demographicInfoBox.append("p").text(`${key}: ${value}`)
        })


    })
}
// #################################################
// FUNCTION 
// #################################################
function optionChanged(patientID) {
    console.log(patientID);
    buildCharts(patientID);
    populateDemoInfo(patientID);
}
// #################################################
// Test subject ID numbers
// #################################################
function initDashboard() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
        buildCharts(patientIDs[0]);
        populateDemoInfo(patientIDs[0]);
    });
};

initDashboard();