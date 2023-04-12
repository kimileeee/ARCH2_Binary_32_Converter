const parse = require("nodemon/lib/cli/parse");

  function binary_to_hex(binary) {
    let a = binary;
    let b = "";
  
    if (binary.includes(".")) {
      let arr = binary.split(".");
      a = arr[0];
      b = arr[1];
    }
  
    let an = a.length % 4;
    let bn = b.length % 4;
  
    if (an != 0) a = "0".repeat(4 - an) + a;
  
    if (bn != 0) b = "0".repeat(4 - bn) + b;
  
    let res =  binary_to_hex_convert(a);
  
    if (b.length > 0) res += "." +  binary_to_hex_convert(b);
  
    return res;
  }
  
  function BinToDec(bin) {
    let num = 0;
  
    for (let i = 0; i < bin.length; i++)
      if (bin[bin.length - i - 1] === "1") num += 2 ** i;
  
    return num;
  }

  function binary_to_hex_convert(binary) {
    if (binary.length == 0) return "";

    const hex_index = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
      ];
  
    return binary
      .match(/.{1,4}/g)
      .map((v) => hex_index[BinToDec(v)])
      .join("");
  }
  
function clearInput(){
    document.getElementById("num").value="";
    document.getElementById("base").value="";
    document.getElementById("exponent").value="";
    document.getElementById("binNum").value="";
    document.getElementById("hexNum").value="";
}

function clearOutput(){
    binNum.innerHTML="";
    hexNum.innerHTML="";
    document.getElementById("error").style.display = "block";
}

function integer_to_binary(num){
    return (num >>> 0).toString(2);
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
        //binary = "1" + decimal;
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

function normalize_base2 (integer, decimal, exponent) {
    let binary = "";
    var count = 0;
    //1.00111x2^5
    //100.111x2^7 -> 1.00111x2^9
    //0.000100111x2^15 -> 1.00111x2^11

    if(integer.toString().length == 1 && integer == "1")
    {
        console.log("here");
        decimal = decimal.split('.')[1];
        binary = integer + "." + decimal;
        //binary = integer + decimal;
        console.log("binary: " + binary);
    } 

    //1
    //00111
    else if (integer.toString().length > 1) { //shift decimal point to left
        decimal = decimal.split('.')[1];
        if(decimal == undefined){decimal = "0";}
        console.log("normalizing: " + decimal);
        while (integer != "1") {
            temp = integer.slice(-1);
            count += 1;
            decimal = decimal.padStart(decimal.toString().length + 1, temp);
            integer = integer.slice(0, -1);
        }
        binary = "1" + "." + decimal;
        console.log("binary: " + binary);
        exponent = count + exponent;
    }
    else if (integer == 0) { //shift decimal point to right
        decimal = decimal.split('.')[1];
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
        exponent = exponent - count;
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
    console.log("Convert")
    if (error_check())
    {
        console.log("VALID");
        var input = document.getElementById("num").value;
        var base = document.getElementById("base").value;
        var exponent = document.getElementById("exponent").value;
        var sign_bit = get_sign(input);
        var splitNum = input.toString().split('.');

        if (sign_bit == 1){
            splitNum[0] =  splitNum[0].substring(1); //removes the '-' sign
        }

        //separates integer and decimal
        var integer = parseFloat(splitNum[0]);
        var dec  = parseFloat("0." + splitNum[1]);

        console.log(1 + '----');
        console.log(integer);
        console.log(dec);
        
        console.log(2 + '----');
        console.log(integer);
        console.log(dec);
        
        
        if(input == "NaN"){
            binNum.innerHTML = '0 11111111 11111111111111111111111 (qNaN)';
        }
        else if (input == 0)
        {
            binNum.innerHTML = '0 00000000 00000000000000000000000';
        }
        else if (base == "2") {
            // integer = parseInt(integer);
            // dec = parseFloat(dec);
            var dec  = parseFloat("0." + splitNum[1]);

            console.log(integer);
            console.log(dec);
            normalized_results = normalize_base2(integer.toString(), dec.toString(), parseInt(exponent));
            binary = normalized_results[0].split(".");
            console.log("to normalize: " + normalized_results[0] + ", " + normalized_results[1]);
            if(checkSpecial(sign_bit, normalized_results[1], binary[0], "0."+binary[1], 1) == false) {
                var binary = normalized_results[0];
                exponent = 127 + normalized_results[1];
                var expoRep = integer_to_binary(parseInt(exponent))

                //console.log('result: ' + binary.toString().split('.')[1]);
                console.log('result: '+ binary);

                var answer_bin = sign_bit + " " + getFullExponent(expoRep) + " " + getFullMantissa(binary.split('.')[1]);
                //var answer_hex = binary_to_hex(answer_bin);
                var answer_hex = binary_to_hex(sign_bit + getFullExponent(expoRep) + getFullMantissa(binary.split('.')[1]));

                binNum.innerHTML = answer_bin;
                hexNum.innerHTML = answer_hex;
            }
        }
        else if (base == "10"){
            input = parseFloat(integer+dec) * parseFloat(Math.pow(10.0, exponent));
            console.log(input);
            splitNum = input.toString().split('.');
            integer = parseFloat(splitNum[0]);
            dec  = parseFloat("0." + splitNum[1]);

            integer = integer_to_binary(parseInt(integer));
            dec = decimal_to_binary(parseFloat(dec));
            console.log(integer+"."+dec+", "+exponent);
            
            normalized_results = normalize_base10(integer, dec, parseInt(exponent));
            binary = normalized_results[0].split(".");
            console.log("to normalize: " + normalized_results[0] + ", " + normalized_results[1]);
            
            var binary = normalized_results[0];
                
            if(checkSpecial(sign_bit, exponent, binary[0], "0."+binary[1], 0) == false) {
                exponent = 127 + normalized_results[1];
                var expoRep = integer_to_binary(parseInt(exponent))

                var answer_bin = sign_bit + " " + getFullExponent(expoRep) + " " + getFullMantissa(binary.split('.')[1]);
                var answer_hex = binary_to_hex(sign_bit + getFullExponent(expoRep) + getFullMantissa(binary.split('.')[1]));
                binNum.innerHTML = answer_bin;
                hexNum.innerHTML = answer_hex;
            }
        }
        else {
            //just for placement
            binNum.innerHTML = '1';
        }
    }
}

function checkSpecial(sign_bit, exponent, integer, dec, isBase2) {
    var exp_denorm = isBase2? -126: -38;
    var exp_infi = isBase2? 127: 38;
    if(exponent < exp_denorm) {       // denormalized
        console.log("denormalized input found");
        // peg exponent to -126 and denormalized the significand
        // e' = 0
        // significand is the denormalized significand
        dec = dec.split(".")[1];
        while (exponent != exp_denorm) {
            if(integer == undefined || integer == ""){
                integer = "0";
            }
            temp = integer.slice(-1);
            exponent++;
            dec = temp + dec;
            integer = integer.slice(0, -1);
            console.log(integer + "." + dec);
            console.log("exponent: "+ exponent)
        }
        binary = (integer? integer: "0") + "." + dec;
        console.log("normalized: " + binary);

        significand = "00000000000000000000000";
        significand = dec + significand.slice(dec.length);

        var answer_bin = sign_bit + " 00000000 " + significand;
        var answer_hex = binary_to_hex(answer_bin.split(' ').join(''));

        binNum.innerHTML = answer_bin;
        hexNum.innerHTML = answer_hex;

        console.log('denormalized: ' + answer_bin);
        return true;
    }
    else if(exponent > exp_infi) {   // infinity
        // e' = 11111111
        // significand is 000 0000 0000 0000 0000 0000
        var answer_bin = sign_bit + " 11111111 00000000000000000000000";
        var answer_hex = binary_to_hex(answer_bin.split(' ').join(''));

        binNum.innerHTML = answer_bin;
        hexNum.innerHTML = answer_hex;

        console.log('infinity');
        return true;
    }
    console.log('normal');
    return false;
}

function error_check() {
    var input = document.getElementById("num").value;
    var base = document.getElementById("base").value;
    var exponent = document.getElementById("exponent").value;
    var sign_bit = get_sign(input);
    var splitNum = input.toString().split('.');

    if(input == "" || base == null || exponent == ""){
        error_msg.innerHTML = "ERROR: Null input";
        clearOutput();
        return false;
    }

    if (sign_bit == 1){
        splitNum[0] =  splitNum[0].substring(1); //removes the '-' sign
    }

    if (splitNum.length > 2) {
        error_msg.innerHTML = "ERROR: Not a valid input";
        clearOutput();
        return false;
    }

    if (base == "2") {
        if (!/^[01]+$/.test(splitNum[0]) || (splitNum[1] != null && !/^[01]+$/.test(splitNum[1]))) {
            error_msg.innerHTML = "ERROR: Not a valid binary input";
            clearOutput();
            return false;
        }
            
    }
    else if (base == "10") {
        if (!/^[0-9]+$/.test(splitNum[0]) || (splitNum[1] != null && !/^[0-9]+$/.test(splitNum[1]))) {
            error_msg.innerHTML = "ERROR: Not a valid decimal input";
            clearOutput();
            return false;
        }
    }
    document.getElementById("error").style.display = "none";
    error_msg.innerHTML = "";
    return true;
}