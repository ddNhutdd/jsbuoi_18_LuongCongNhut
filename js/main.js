/**
 * biến lưu trữ giá trị
 */
const compareOperators = {
    greaterThanZero: 'greaterThanZero',
    lessThanZero: 'lessThanZero'
};
/**
 * biến mảng global
 */
var arr = [];
/**
 * querySelector
 * @param {string}: css selector
 * @return: phần tử html đầu tiên tìm được
 */
function querySelector(param) {
    return document.querySelector(param)
}
/**
 * querySelectorAll
 * @param {tring}: css selector
 * return : mảng các phần tử html tìm được
 * */
function querySelectorAll(param) {
    return document.querySelector(param)
}
/**
 * print mảng ra phần tử html, nội dung cũ sẽ được xoá đi
 * @arr {array}: một mảng chứa nội dung cần xuất ra html
 * @htmlElement{phần tử html}: phần tử html cần xuất ra nội dung mảng
 */
function printArray(array, htmlElement) {
    htmlElement.innerHTML = ''
    for (var i = 0; i < array.length; i++) {
        htmlElement.innerHTML += ' [' + array[i] + '] ';
    }
}
/**
 * convert string to number, hàm sẽ cố chuyển bất cứ thứ gì sang number, nếu thất bại thì status là false, thành công thì status là true,
 * @param {any}: giá trị cần chuyển sang Number
 * @result {[]:[result, status]}: một đối tượng hai thuộc tính là value và result. nếu không phải là số thì status là false, nếu là số thì status là true
 */
function tryToNumber(param) {
    var result = parseInt(param, 10);
    var status = Number.isNaN(result);
    return [result, !status];
}
/**
 * sự kiện cho nút thêm phần tử vào mảng. 
 */
querySelector('form>button:first-of-type').onclick = function () {
    var inputHtml = querySelector('form .form-group input')
    var valueInput = Number(inputHtml.value);
    arr.push(valueInput);
    var showResult = querySelector('.container>.alert')
    printArray(arr, showResult)
    inputHtml.value = '';
    inputHtml.focus()
}
/**
 * sự kiện cho nút clear all phần tử trong mảng
 */
querySelector('form>button:last-of-type').onclick = function () {
    arr = []
    var showResult = querySelector('.container>.alert')
    printArray(arr, showResult)
}
/**
 * sự kiện button cho bài một: tính tổng số dương trong mảng nếu không có số dương thì trả về 0
 */
querySelector('#collapse1 button').onclick = function () {
    const positiveArr = arr.filter(num => num > 0);
    var showResult = querySelector('#collapse1 .alert')
    showResult.innerHTML = positiveArr.reduce((a, b) => a + b, 0);
}
/**
 * sự kiện button cho bài hai: đếm tổng số dương trong mảng
 */
querySelector('#collapse2 button').onclick = function () {
    var count = countNumber(arr, compareOperators.greaterThanZero)
    var showResult = querySelector('#collapse2 .alert')
    showResult.innerHTML = count.toLocaleString();
}
/**
 * sự kiện button cho bài ba: tìm số nhỏ nhất trong mảng
 */
querySelector('#collapse3 button').onclick = function () {
    var minNumber = Math.min(...arr);
    var showResult = querySelector('#collapse3 .alert')
    showResult.innerHTML = minNumber === Infinity ? 'Không có' : minNumber
}
/**
 * sự kiện button cho bài bốn: tìm số dương nhỏ nhất trong mảng
 */
querySelector('#collapse4 button').onclick = function () {
    const positiveArr = arr.filter(num => num > 0);
    var result = Math.min(...positiveArr)
    var showResult = querySelector('#collapse4 .alert')
    showResult.innerHTML = result === Infinity ? "Không có" : result
}
/**
 * sự kiện button cho bài năm: tìm số chẵn cuối cùng trong mảng
 */
querySelector('#collapse5 button').onclick = function () {
    var result = -1;
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] % 2 === 0) {
            result = arr[i];
            break;
        }
    }
    var showResult = querySelector('#collapse5 .alert')
    if (result === -1) {
        showResult.innerHTML = 'trong mảng không có số chẵn nào';
    } else {
        showResult.innerHTML = result;
    }
}
/**
 * sự kiện button cho bài sáu: hoán đổi vị trí hai phần tử trong mảng
 */
querySelector('#collapse6 button').onclick = function () {
    var showResult = querySelector('#collapse6 .alert');
    var temp = tryToNumber(querySelector('#collapse6 input:first-of-type').value)
    if (!temp[1]) {
        showResult.innerHTML = 'Thất bại';
        return;
    }
    var index1 = temp[0]
    temp = tryToNumber(querySelector('#collapse6 input:last-of-type').value)
    if (!temp[1]) {
        showResult.innerHTML = 'Thất bại';
        return;
    }
    var index2 = temp[0]
    var temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
    printArray(arr, showResult);
    var updateDisplay = querySelector('.container>.alert')
    printArray(arr, updateDisplay);
}
/**
 * sự kiện button cho bài bảy: sắp xếp mảng tăng dần
 */
querySelector('#collapse7 button').onclick = function () {
    arr.sort((a, b) => a - b);
    var showResult = querySelector('#collapse7 .alert')
    printArray(arr, showResult);
    var updateDisplay = querySelector('.container>.alert')
    printArray(arr, updateDisplay);
}
/**
 * sự kiện button cho bài tám: tìm số nguyên tố đầu tiên trong mảng
 */
querySelector('#collapse8 button').onclick = function () {
    var result = findFirstPrimeNumber(arr);
    var showResult = querySelector('#collapse8 .alert')
    if (result === -1) {
        showResult.innerHTML = 'Trong mảng không có số nguyên tố'
    } else {
        showResult.innerHTML = 'Số nguyên tố đầu tiên trong mảng là ' + result;
    }
}
/**
 * hàm tìm số nguyên tố đầu tiên trong mảng, nếu không có số nguyên tố trong mảng thì trả về -1
 * @arr {array}: mảng số để thực hiện tìm kiếm trên đó
 */
function findFirstPrimeNumber(arr) {
    for (var i = 0; i < arr.length; i++) {
        var isPrime = true;
        for (var j = 2; j < arr[i]; j++) {
            if (arr[i] % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            return arr[i];
        }
    }
    return -1;
}
/**
 * sự kiện button cho bài chín: đếm số nguyên
 */
querySelector('#collapse9 button').onclick = function () {
    var count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (Number.isInteger(arr[i])) {
            count++;
        }
    }
    var showResult = querySelector('#collapse9 .alert')
    showResult.innerHTML = 'Trong mảng có ' + count + ' số nguyên'
}
/**
 * sự kiện button cho bài mười: đếm số nguyên
 */
querySelector('#collapse10 button').onclick = function () {
    var positiveNumberCounted = countNumber(arr, compareOperators.greaterThanZero)
    var nagativeNumberCounted = countNumber(arr, compareOperators.lessThanZero)
    var showResult = querySelector('#collapse10 .alert')
    if (positiveNumberCounted == nagativeNumberCounted) {
        showResult.innerHTML = 'Số dương là: ' + positiveNumberCounted + ' = số âm là: ' + nagativeNumberCounted
        return
    }
    if (positiveNumberCounted > nagativeNumberCounted) {
        showResult.innerHTML = 'Số dương là: ' + positiveNumberCounted + ' > số âm là: ' + nagativeNumberCounted
        return
    }
    if (positiveNumberCounted < nagativeNumberCounted) {
        showResult.innerHTML = 'Số dương là: ' + positiveNumberCounted + ' < số âm là: ' + nagativeNumberCounted
        return
    }
}
/**
 * hàm đếm số đếm số dương hoặc số âm trong mảng
 * @arr {array}: mảng thực hiện đếm số dương hoặc số âm trong mảng
 * @compareOperators {string}: điều kiện giá trị so sánh
 * @return {number}: trả về số phần tử đếm được trong mảng arr. nếu không tìm thấy phần tử phù hợp thì trả về 0
 */
function countNumber(arr, compareOperators) {
    var result = -1;
    if (compareOperators === 'greaterThanZero') {
        const positiveArr = arr.filter(num => num > 0);
        result = positiveArr.length;
        return result;
    }
    if (compareOperators === 'lessThanZero') {
        const nagativeArr = arr.filter(num => num < 0);
        result = nagativeArr.length;
        return result;
    }
}