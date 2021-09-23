
'use strict'

var utils = {};

utils.process = function(textData) {
    const time = getFormattedTimeText(splitTimeSegments(getTimeSectionText(textData)));
    const desc = getDescriptionText(textData);

    return {
        time: time,
        desc: desc
    };

    function getDescriptionText(textData) {
        var n = textData.indexOf(' ');
        var res = textData.slice(n, textData.length);
        return res.trim();  
    }

    function splitTimeSegments(textData) {
        var items = textData.trim().split('.');
        return items;
    }

    function getFormattedTimeText(textArray) {    
        if (textArray.length >= 3) {
            return displayDigit(textArray[0]) + ":" + displayDigit(textArray[1]) + ":" + displayDigit(textArray[2]);
        }
        else if (textArray.length === 2) {
            return '00:' + displayDigit(textArray[0]) + ":" + displayDigit(textArray[1]);
        }
        else if (textArray.length === 1){
            return '00:' + displayDigit(textArray[0]) + ':00';
        }
        else {
            return '00:00:00';
        }
    }

    // Look into seperating from first occurence of "space" character

    function displayDigit(value) {
        var number = Number(value);
        if (number < 10)
            return "0" + number.toString();
        else
            return number.toString();
    }

    function getTimeSectionText(str) {
        const regex = /[0-9.]+\s/gm;
        var results = regex.exec(str);

        if (results && results.length > 0) {
            return results[0];
        }
        return '';
    }
};