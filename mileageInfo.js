function generateMileageInfo(history) {

    //create obj with mileages for given dates
    function getMileagesDates(obj) {
        var listOfDates = []
        var listOfMileages = []
        var longDate = ''
        var date = ''
        var mileage = 0
        var mileagesDates = {}
        for (var i = 0; i < obj.length; i++) {
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

    //create obj with mileages for given dates
    function getYearsMileages(obj) {
        var listOfYears = []
        var listOfMileages = []
        var longDate = ''
        var year = 0
        var mileage = 0
        var mileagesYears = {}
        for (var i = 0; i < obj.length; i++) {
            if (history[i]["data"]["passed"] === true) {
                var longDate = obj[i]["date"]
                var year = longDate.substring(0, 4)
                listOfYears.push(year)
                var mileage = obj[i]["data"]["mileage"]
                listOfMileages.push(mileage)
            }
        }

        listOfYears.forEach((years, i) => mileagesYears[years] = listOfMileages[i])
        return mileagesYears

    }

    //get average mileage for given year
    function getPredictionForYear (mileagesYears, Year) {
        var oneYearBefore = Year - 1 //2018
        var twoYearsBefore = Year - 2 //2017

        var mForOneYB = mileagesYears[oneYearBefore]
        var mForTwoYB = mileagesYears[twoYearsBefore]

        var mostRecentAvr = mForOneYB - mForTwoYB

        var predictionMForYear = mForOneYB + mostRecentAvr

        return predictionMForYear

    }

    //lowest mileages
    function getMinMileage(obj) {
        var listOfValues = []
        var minMileage = 0
        for (var i = 0; i < obj.length; i++) {
            if (history[i]["data"]["passed"] === true) {
                listOfValues.push(obj[i]["data"]["mileage"])
                listOfValues.sort(function (a, b) { return a - b; });
                minMileage = listOfValues[0]
            }

        } return minMileage;
    }


    //highest mileages
    function getMaxMileage(obj) {
        var listOfValues = []
        var maxMileage = 0
        for (var i = 0; i < obj.length; i++) {
            if (history[i]["data"]["passed"] === true) {
                listOfValues.push(obj[i]["data"]["mileage"])
                listOfValues.sort(function (a, b) { return b - a; });
                maxMileage = listOfValues[0]
            }

        } return maxMileage;
    }

    //date of lowest mileages
    function getFDate(mileagesDates, minMileage) {
        FDate = ''
        FDate = mileagesDates[minMileage]

        return FDate
    }


    //date of highest mileages
    function getTDate(mileagesDates, maxMileage) {
        TDate = ''
        TDate = mileagesDates[maxMileage]

        return TDate
    }

    //get days beetwen dates 
    function getDaysBetween(FDate, TDate) {

        var daysBDates = 0

        fDate = new Date(FDate);
        tDate = new Date(TDate);

        daysBDates = Math.floor((Date.UTC(tDate.getFullYear(), tDate.getMonth(), tDate.getDate()) - Date.UTC(fDate.getFullYear(), fDate.getMonth(), fDate.getDate())) / (1000 * 60 * 60 * 24));

        return daysBDates
    }


    //get differences of max and min mileages
    function mileageDiff(maxMileage, minMileage) {
        var diffMileage = 0;
        diffMileage = maxMileage - minMileage

        return diffMileage
    }


    //average milleage for 1 day
    function avrMPerDay(daysBDates, diffMileage) {
        var avrPDay = 0
        avrPDay = diffMileage / daysBDates

        return avrPDay
    }


    function getAverageMileage(avrPDay, period) {
        var AverageMileage = 0
        AverageMileage = Math.floor(avrPDay * period)

        return AverageMileage
    }


    var mileageInfo = {

        average: function (obj, days) {

            var mileagesDates = getMileagesDates(obj)
            var minMileage = getMinMileage(obj)
            var maxMileage = getMaxMileage(obj)

            var FDate = getFDate(mileagesDates, minMileage) 
            var TDate = getTDate(mileagesDates, maxMileage)

            var daysBDates = getDaysBetween(FDate, TDate)
            var diffMileage = mileageDiff(maxMileage, minMileage)

            var avrMPerDay = avrMPerDay(daysBDates, diffMileage)

            var AverageMileage = getAverageMileage(avrMPerDay, days)
            return AverageMileage

        },

        prediction: function (obj, year) {



        }

    }

    return {
        average: mileageInfo.average(history, 365),
        predictions: mileageInfo.prediction(history, 2019),
      };


}

