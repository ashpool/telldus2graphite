var isNumber = function (value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    isTimestamp = function (value) {
        return isNumber(value) && 1000000000 < value;
    };

module.exports = {
    isNumber: isNumber,
    isTimestamp: isTimestamp
};
