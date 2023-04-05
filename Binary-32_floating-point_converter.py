def list_to_string(lst):
    return ''.join(str(elem) for elem in lst)

def decimal_to_binary(num):
    if num == 0:
        return [0]
    binary_integer = []
    while num > 0:
        binary_integer.insert(0, num % 2)
        num //= 2
    return binary_integer

def float_to_binary(decimal, place):
    binary_float = []
    product = int(decimal)
    for _ in range(place):
        product *= 2
        integer_part = product // 1
        binary_float.append(integer_part)
        product -= integer_part
    return binary_float

def ieee_754_conversion(num):
    if num == 0:
        return '00000000000000000000000000000000'

    sign_bit = '1' if num < 0 else '0'
    num = abs(num)
    integer_part, decimal_part = str(num).split('.')
    integer_part = int(integer_part)

    if integer_part == 0: #if number is less than 0
        c = 0
        while integer_part == 0:
            num *= 2
            integer_part, _ = str(num).split('.')
            integer_part = int(integer_part)
            c += 1
        print(integer_part)
        print(c)
        exponent = 127 - c
        binary_integer_part = [0]  # implicit leading 1
    else:
        binary_integer_part = decimal_to_binary(integer_part) #converts decimal to binary
        exponent = 127 + len(binary_integer_part) - 1  

    binary_exponent = decimal_to_binary(exponent)
    binary_integer_part.extend(float_to_binary(decimal_part, 23 - len(binary_integer_part)))
    binary_exponent.extend([0] * (8 - len(binary_exponent)))  # pad to 8 bits

    binary_number = sign_bit + list_to_string(binary_exponent) + list_to_string(binary_integer_part)
    return binary_number.zfill(32)  # zero-pad to 32 bits



num = float(input('Enter a floating point decimal number: '))
ieee = ieee_754_conversion(num)
print(ieee)


#TODO:
'''
    1. Account for accepting binary inputs
    
    2. Account for accepting Scientific Notation 
        a) For x10^n:
            * While n > 0
                1. ctr *= 10
            * Multiply ctr to original number, then goto decimal_to_binary().
            
        b) For x2^m
            * if m > 0
                * Shift right (*10)
            * if m < 0
                * Shift left (/10)
            
'''