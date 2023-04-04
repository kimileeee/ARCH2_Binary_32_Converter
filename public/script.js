function clearInput(){
    document.getElementById("num").value="";
    document.getElementById("base").value="";
    document.getElementById("binNum").value="";
    document.getElementById("hexNum").value="";
}

function decimal_to_binary(num){
    console.log(num);
    if(num == 0){
        return [0];
    }
    let binary_integer = [];
    while (num > 0){
        binary_integer.splice(0, 0, num % 2);
        num = Math.floor(num / 2);
        console.log(num);
    }
    return binary_integer;
}


function convert(){
    var input = document.getElementById("num").value;
    var sign_bit;
    
    if(input == "NaN"){
        binNum.innerHTML = '0 11111111 11111111111111111111111 (qNaN)';
    }
    else if (input == 0)
    {
        binNum.innerHTML = '00000000000000000000000000000000';
    }
    else if (input.includes('-'))
    {
        sign_bit = '1';
        //var output = decimal_to_binary(12);
        //console.log(output);
    }
    else {
        binNum.innerHTML = '1';
    }

}