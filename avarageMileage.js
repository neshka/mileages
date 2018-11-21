var regularExpression =

{
  //RRRR-M-DD //change it to consider cases when MM and D
  datePattern : /\d{4}([\/.-])\d{1}\1\d{2}/g

}

function getListOfData (obj) {
    var listOfValues = []
    for (var i = 0; i<obj.length;i++){
        if (history[i]["data"]["passed"] === true) {
            listOfValues.push(obj[i]["date"])
        }       
    } return listOfValues
}

function getDate(array) {  
    var matches = []
    for (var i = 0; i < array.length; i++){
        var str = array[i]
        var match = str.match(regularExpression['datePattern'])
        matches.push(match)
    }
    return matches                                                             
}

function getListOfMileage (obj) {
    var listOfValues = []
    for (var i = 0; i<obj.length;i++){
        if (history[i]["data"]["passed"] === true) {
            listOfValues.push(obj[i]["data"]["mileage"])
        }       
    } return listOfValues;
}

function dateWithMileage (dates, mileages) {
    var dateAndMileage = {}
    dates.forEach((date, i) => dateAndMileage[date] = mileages[i])

    return dateAndMileage
}

var daysBetweenD = function(fromDate, toDate) {
    fDate = new Date(fromDate);
    tDate = new Date(toDate);

    return Math.floor((Date.UTC(tDate.getFullYear(), tDate.getMonth(), tDate.getDate()) - Date.UTC(fDate.getFullYear(), fDate.getMonth(), fDate.getDate()) ) /(1000 * 60 * 60 * 24));
}



