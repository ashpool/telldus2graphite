var isNull = function (value) {
        return null === value;
    },
    isNumber = function (value) {
        return !isNull(value) && !isNaN(parseFloat(value)) && isFinite(value);

    },
    isTimestamp = function (value) {
        return isNumber(value) && 1200000000000 < value;
    };

module.exports = {
    isNumber: isNumber,
    isTimestamp: isTimestamp
};