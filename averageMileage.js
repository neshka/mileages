
//create obj with mileages for given dates
function getMileagesDates(obj) {
    var listOfDates = []
    var listOfMileages = []
    var longDate = ''
    var date = ''
    var mileage = 0
    var mileagesDates = {}
    for (var i = 0; i<obj.length;i++){
        if (history[i]["data"]["passed"] === true) {
            var longDate = obj[i]["date"]
            var date = longDate.split('T')[0]
            listOfDates.push(date)
            var mileage = obj[i]["data"]["mileage"]
            listOfMileages.push(mileage)
        }       
    } 

    listOfMileages.forEach((mileage, i) => mileagesDates[mileage] = listOfDates[i])
    return mileagesDates
    
}

//lowest mileages
function getMinMileage (obj) {
    var listOfValues = []
    var minMileage = 0
    for (var i = 0; i<obj.length;i++){
        if (history[i]["data"]["passed"] === true) {
            listOfValues.push(obj[i]["data"]["mileage"])
            listOfValues.sort(function (a, b) {  return a - b;  });
            minMileage = listOfValues[0]
        }      
    
    } return minMileage;
}


//highest mileages
function getMaxMileage (obj) {
    var listOfValues = []
    var maxMileage = 0
    for (var i = 0; i<obj.length;i++){
        if (history[i]["data"]["passed"] === true) {
            listOfValues.push(obj[i]["data"]["mileage"])
            listOfValues.sort(function (a, b) {  return b - a;  });
            maxMileage = listOfValues[0]
        }      
    
    } return maxMileage;
}

//date of lowest mileages
function getFDate (mileagesDates, minMileage) {
    FDate = ''
    FDate = mileagesDates[minMileage]

    return FDate
}


//date of highest mileages
function getTDate (mileagesDates, maxMileage) {
    TDate = ''
    TDate = mileagesDates[maxMileage]

    return TDate
}

//get days beetwen dates 
function getDaysBetween (FDate, TDate) {
    
    var daysBDates = 0
    
    fDate = new Date(FDate);
    tDate = new Date(TDate);

    daysBDates = Math.floor((Date.UTC(tDate.getFullYear(), tDate.getMonth(), tDate.getDate()) - Date.UTC(fDate.getFullYear(), fDate.getMonth(), fDate.getDate()) ) /(1000 * 60 * 60 * 24));

    return daysBDates
}


//get differences of max and min mileages
function mileageDiff (maxMileage, minMileage) {
    var diff = 0;
    diff = maxMileage - minMileage

    return diff
}


//average milleage for 1 day
function avrMPerDay (daysBDates, diff) {
    var avrPDay = 0
    avrPDay = diff/daysBDates

    return avrPDay
}


function getAverageMileage (avrPDay, period) {
    var AverageMileage = 0
    AverageMileage = Math.floor(avrPDay * period)

    return AverageMileage
}



