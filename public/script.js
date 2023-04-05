const parse = require("nodemon/lib/cli/parse");

function clearInput(){
    document.getElementById("num").value="";
    document.getElementById("base").value="";
    document.getElementById("exponent").value="";
    document.getElementById("binNum").value="";
    document.getElementById("hexNum").value="";
}

function integer_to_binary(num){
    return (num >>> 0).toString(2)
}

//accepts float
function decimal_to_binary(num){
    let dec = "";
    var temp;
    count = 0;

    while(num % 1 != 0){
        num = num * 2;
        temp = Math.floor(num)
        if (temp >=1){
            temp =1;
            num = num - 1;
        }
        dec = dec + temp.toString();
        count += 1;
        if(count == 31){break;};
    }
    return dec;
}

function normalize_base10(integer, decimal, exponent){
    let binary = "";
    var count = 0;
    
    if(decimal == 0){exponent = 0;}

    if(integer.toString().length == 1 && integer == "1")
    {
        binary = integer + "." + decimal;
    }
    else if (integer.toString().length > 1) { //shift decimal point to left
        while (integer != "1") {
            temp = integer.slice(-1);
            count += 1;
            decimal = decimal.padStart(decimal.toString().length + 1, temp);
            integer = integer.slice(0, -1);
        }
        binary = "1" + "." + decimal;
        exponent = count;
    }
    else if (integer == 0) { //shift decimal point to right
        console.log('int: ' + integer);
        console.log('dec: ' + decimal);
        var temp = decimal;
    
        while (temp.charAt(0) != "1") {
            temp = temp.toString(2).slice(1);
            count += 1;
        }
        count += 1;
        temp = temp.toString(2).slice(1);
        binary = "1" + "." + temp;
        exponent = 0 - count;
        console.log(decimal);
        console.log(binary);

    }
    return [binary, exponent];
}

function get_sign(input){
    if(input.includes('-')){
        return '1';
    }
    else {return '0';}
}

function getFullMantissa(mantissa){
    var length = mantissa.length;
    var add = 23 - length;
    
    if (length < 23) {
        for(let i =0; i < add; i++)
        {
            mantissa = mantissa + "0";
        }
    }
    if(length > 23) {
        for(let i =length; i > 23; i--)
        {
            mantissa = mantissa.slice(0, -1);
        }   
    }
    console.log(length);
    return mantissa;
}

//adds leading zeros
function getFullExponent(num){
    var length = num.length;
    var add = 8 - length;

    for(let i =0; i < add; i++)
    {
        num = num.padStart(num.toString().length + 1, "0");
    }
    return num;
}

function convert(){
    var input = document.getElementById("num").value;
    var base = document.getElementById("base").value;
    var exponent = document.getElementById("exponent").value;
    var sign_bit = get_sign(input);
    var splitNum = input.toString().split('.');

    var integer = parseFloat(splitNum[0]);
    var dec  = parseFloat("0." + splitNum[1]);

    input = parseFloat(integer+dec) * parseFloat(Math.pow(10.0, exponent))
    
    splitNum = input.toString().split('.');
    integer = parseFloat(splitNum[0]);
    dec  = parseFloat("0." + splitNum[1]);
        
    if(input == "NaN"){
        binNum.innerHTML = '0 11111111 11111111111111111111111 (qNaN)';
    }
    else if (input == 0)
    {
        binNum.innerHTML = '00000000000000000000000000000000';
    }
    else if (base == "10"){
       integer = integer_to_binary(parseInt(integer));
       dec = decimal_to_binary(parseFloat(dec));

       normalized_results = normalize_base10(integer, dec, parseInt(exponent));
       var binary = normalized_results[0];
       exponent = 127 + normalized_results[1];
       var expoRep = integer_to_binary(parseInt(exponent))

       var answer = sign_bit + " " + getFullExponent(expoRep) + " " + getFullMantissa(binary.split('.')[1]);
       binNum.innerHTML = answer;
    }
    else {
        binNum.innerHTML = '1';
    }

}