$(function(){

//DOM Variables
let currentDay = $("#currentDay");
let container = $(".container");

//function to set the day in the jumbotron
function displayDay() {
    let day = moment().format("dddd, Do MMMM YYYY");
    currentDay.text(day);
}

//function to set the color of the input box, depending on time of day
function setColor(element) {
    let textAreaID = element.attr("id");
    let textAreaNum = parseInt(textAreaID);
    let currentHour = moment().format("H:mm");
    let currentHourNum = parseInt(currentHour);

    //if the time of the input box is in the past, the box will turn grey
    if (textAreaNum < currentHourNum) {
        element.addClass("past");
        element.removeClass("present future");
    //if the time of the input box is in the present hour, it will turn red
    } else if (textAreaNum === currentHourNum) {
        element.addClass("present");
        element.removeClass("future past");
    //if the time of the input box is in the future it will turn green
    } else {
        element.addClass("future");
        element.removeClass("past present");
    };
};

//function to store the input values in the local storage when a save button is clicked
function handleSave (element) {
    let textAreaID = element.attr("id");
    let textInput = element.val().trim();
    console.log(textInput);

    localStorage.setItem(textAreaID, textInput);

};

//function to dynamically create the input boxes
function renderTimeBlocks() {
//creates a row for each hour between 9am and 5pm
for (let i = 9; i < 18; i++) {
    let row = $("<div>").addClass("row input-group mb-3");
        let timeBlock = $("<div>").addClass("input-group-prepend time-block");
            let hour = moment(i, "HH").format("ha");
            let hour24 = moment(i, "HH").format("H:mm");
            let span = $("<span>").addClass("input-group-text hour").text(hour);
            timeBlock.append(span);

        let textArea = $("<input>").attr("type", "text").addClass("form-control textarea")
            .attr("placeholder", "Enter task here").attr("aria-label", "Enter task here")
            .attr("aria-describedby", "button-addon2").attr("id", hour24)
            //retrieves any data in local storage in order to persist inputs after refresh
            .val(localStorage.getItem(hour24));
            
            //calls the setColor function every second so that the color of the rows is updated exactly on the hour
            setInterval(setColor, 1000, textArea);

        let buttonDiv = $("<div>").addClass("input-group-append");
            let saveButton = $("<button>").addClass("btn btn-outline-secondary saveBtn")
                .attr("type", "button").attr("id", "button-addon2").text("Save");
            buttonDiv.append(saveButton);

        row.append(timeBlock, textArea, buttonDiv);

    container.append(row);
   
    //event listener for when a Save button is clicked
    saveButton.on("click", function() {
        //if no input, the function returns without doing anything
        if (textArea.val() === "") {
            return;
        }
        //calls the handleSave function
        handleSave(textArea);
        });
    };


   
};

//calls the renderTimeBlocks function
renderTimeBlocks();

//calls the displayDay function every second so that the date is updated exactly at midnight
setInterval(displayDay, 1000);

});

