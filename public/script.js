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

    while(num % 1 != 0){
        num = num * 2;
        temp = Math.floor(num)
        dec = dec + temp.toString();
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
        exponent = exponent + count;
    }
    else { //shift decimal point to right
        var temp = decimal;
    
        while (temp.charAt(0) != "1") {
            temp = temp.toString(2).slice(1);
            count += 1;
        }
        binary = "1" + "." + temp;
        exponent = exponent - count;
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

    for(let i =0; i < add; i++)
    {
        mantissa = mantissa + "0";
    }

    return mantissa;
}


function convert(){
    var input = document.getElementById("num").value;
    var base = document.getElementById("base").value;
    var exponent = document.getElementById("exponent").value;
    var sign_bit = get_sign(input);

    var splitNum = input.toString().split('.');

    var integer = parseFloat(splitNum[0]);
    var dec  = parseFloat("0." + splitNum[1]);

    input = integer + dec;
    input = parseFloat(input) * parseFloat(Math.pow(10, exponent));
    
    splitNum = input.toString().split('.');
    integer = parseFloat(splitNum[0]);
    dec  = parseFloat("0." + splitNum[1]);

    if(dec == null)
    {dec = "0";}
    
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

       console.log(dec);

       normalized_results = normalize_base10(integer, dec, parseInt(exponent));
       var binary = normalized_results[0];
       exponent = 127 + normalized_results[1];
       var expoRep = (exponent >>> 0).toString(2);

       var answer = sign_bit + " " + expoRep + " " + getFullMantissa(binary.split('.')[1]);
       binNum.innerHTML = answer;
    }
    else {
        binNum.innerHTML = '1';
    }

}