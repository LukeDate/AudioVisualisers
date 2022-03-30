export function fractionate(val, minVal, maxVal) {
    return (val - minVal)/(maxVal - minVal);
}

export function max(arr){
    return arr &&  arr.reduce(function(a, b){ return Math.max(a, b); })
}

export function modulate(val, minVal, maxVal, outMin, outMax) {
    var fr = fractionate(val, minVal, maxVal);
    var delta = outMax - outMin;
    return outMin + (fr * delta);
}

export function avg(arr){
    var total = arr && arr.reduce(function(sum, b) { return sum + b; });
    return arr && (total / arr.length);
}    