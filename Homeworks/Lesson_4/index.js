// Проверяем себя, если не понимаем почему так а не иначе пишем в чат или в ЛС, желательно объяснять почему то или иное решение

// Типы данных

console.log([1, 2, 3] + ' is the answer.'); // '1,2,3 is the answer'; потому что String([]) джойнит массив через ','
console.log(false || true * 2); // 2; false пропускаем из-за оператора ИЛИ затем true преобразуется в number для умножения
console.log({ valueOf: () => 42 } * 2); // 84; метод valueOf будет вызван для конвертации объекта в примитив
console.log(parseInt('7.5') + parseFloat('2.5')); // 9.5; 7 + 2.5
console.log(!!'Hello' - 1); // 0; !!true === true
console.log(new String('hello') instanceof Object); // true; потому что String вызываем как конструктор, что создаст объект String наподобии оборачивающего
console.log((true ^ false) === (false ^ true)); // true; ^ коммутативен
console.log(true && '5' + 5); // '55'; так как ни один из операндов И не является ложным, вернётся последний
console.log({ valueOf: () => '10', toString: () => '20' } + 5); // '105'; toString не будет вызван, потому что для объекта явно определён valueOf, возвращающий примитив; он имеет приоритет при преобразовании в примитив
console.log((5).toString() === '5'); // true; метод toString оборачивающего объекта Number вернёт '5'
console.log(null || false || undefined); // undefined; так как ни один из операндов ИЛИ не является истинным, вернётся последний
console.log(0 || 2 || NaN); // 2; ИЛИ вернёт первый истинный операнд
console.log(1 && null && 2); // null; И вернёт первый ложный операнд

//

function xy() {}

console.log(typeof xy); //  'function'; для объекта функции и класса предусмотрен возврат 'function'
console.log(xy instanceof Object); // true; функция - объект

var str1 = String('sg123');
var str2 = new String('sg123');

// большая часть вывода ниже просто объясняется тем, что str1 - строка, а str2 - объект
console.log(typeof str1 === typeof str2); // false
console.log(str1 === str2); // false; === не ипользует преобразование типов
console.log(str1 === String(123)); // true
console.log(str2 === new String(123)); // false; сравниваются референсы на разные объекты
console.log(str1 === 123); // false
console.log(str1 === '123'); // true
console.log(str1 == str2); // true; == использует преобразование типов; объект str2 имеет String в качестве прототипа и использует его метод toString для преобразования себя в строку
console.log(str1 == 123); // true
console.log(str1 == '123'); // true

var arr = [];
console.log(typeof arr); // 'object'; для обекта массива не предусмотрен специальный вывод typeof

var str3 = '123';
str3[0] = '2';
console.log(str3); // '123'; невозможно мутировать примитив, при обращении к str[0] объект-оболочка String возвращает значение по индексу, но игнорирует все попытки это значение перезаписать

var p = 1 + 2 + 3 + '';
var z = '' + 1 + 2 + 3;

console.log(p, typeof p); // 6 string; + лево-ассоциативен, поэтому правая часть выражения посчитается ((1 + 2) + 3) + '' с преобразованием в строку на последнем шаге
console.log(z, typeof z); // 123 string; по той же причине расчёт (('' + 1) + 2) + 3 с преобразованием в строку на первом шаге

var o = '123x';
console.log(Number(o)); // NaN; Number может корректно парсить только строки содержащие (с оговорками) числовые литералы
console.log(parseInt(o, 10)); // 123
console.log(+o); // NaN; унарный + производит простое преобразование к числу, что сработает на строке с числовым литералом
console.log(typeof +o); // number; NaN - это число с точки зрения JS
console.log(Boolean(String(false))); // true; String от булеана вернёт строку с самим булеаном внутри, это значение всегда истинно

var h = [];
console.log(h ? 1 : 2); // 1; массив труфи

// Переменные

let a = a + 1;
console.log(a); // ReferenceError; a объявлена через let, так как правая часть выражения обрабатывается до левой, то a в ней всё еще находится в темпоральной дедзоне и не может референситься

//

var b = b + 1;
console.log(b); // NaN; b объявлена через var, по той же причине с правой стороны выражения она всё еще undefined; числовая операция с undefined вернёт NaN

//

function foo(c) {
    if (c > 0) {
        var c = c + 10;
        return c;
    }
    return c;
}
console.log(foo(15)); // 25; так как аргумент функции ведет себя, как объявленный через var, то на 77-й строке он просто переназначается новой переменной с тем же именем

//

function foo() {
    console.log(d2);
    let d1 = '1';
    return function () {
        console.log(d1);
        console.log(d2);
    };
}

const d2 = '2';
const x = foo();

x(); // Вывод в консоли будет 2 (выполнение foo()) 1 2 (выполнение x()). Ошибки референса не будет, так как темпоральная дедзона работает по времени выполнения, а не по расположению строк в коде

//

function giveMeX(showX) {
    if (showX) {
        let x = 5;
    }
    return x;
}

console.log(giveMeX(false)); // ReferenceError; let определяет переменную только в скоупе блока if, за его пределами она недоступна
console.log(giveMeX(true)); // То же самое

//

console.log(x); // Я бы предположил, что тут y вместо x. Тогда undefined, так как переменная референсится до своего объявления через var

var y = 1;

console.log(y); // 1;

function car() {
    if (false) {
        var y = 2;
    }
    console.log(y);
}

car(); // undefined; потому что переменная была определена внутри функции через var, и несмотря на то, что объявление в недоступном блоке, это объявление всё равно работает в скоупе функции.
console.log(y); // 1; мы вернулись к глобальному скоупу.

//

var i = 1;
var j = {};

(function () {
    i++;
    j.j = 1;
})();
console.log(i, j); // 2 { j: 1 }; иммидедли инвоукнули функцию и использовали внутри переменные из глобального скоупа

(function (i, j) {
    i++;
    j.k = 1;
})(i, j);
console.log(i, j); // 2 { j: 1, k: 1 }; иммидедли инвоукнули функцию с передачей параметров; примитив передался величиной, поэтому переменная в глобальном скоупе не изменилась; объект передался референсом и был изменён внутри функции

//

class Drink {
    constructor(sugar) {
        this.sugar = sugar;
    }
}

// Бонус

// Создать объект всеми возможными способами

const obj1 = {};
const obj2 = new Object();
const obj3 = Object.fromEntries([
    ['obj1', obj1],
    ['obj2', obj2],
]);
const obj4 = Object.create(obj3);
const obj5 = new (function Coffee(size) {
    this.size = size;
})('big');
const obj6 = new Drink('ya');
const obj7 = Object.assign({}, obj5, obj6);

//

// Написать функцию глубокого сравнения двух объектов:
// объекты могут быть любыми, и иметь любой уровень вложенности

const firstObj = { here: { is: 'on', other: '3' }, object: 'any' };
const secondObj = { here: { is: 'on', other: '2' }, object: 'any' };

const deepEqual = (firstObj, secondObj) => {
    if (
        Object.keys(firstObj).length !== Object.keys(secondObj)?.length ||
        (typeof firstObj === 'function' && firstObj !== secondObj)
    )
        return false;
    for (const key of Object.keys(firstObj)) {
        if (
            firstObj[key] === secondObj[key] ||
            (firstObj[key] instanceof Object &&
                secondObj[key] instanceof Object &&
                deepEqual(firstObj[key], secondObj[key]))
        )
            continue;
        return false;
    }
    return true;
};

//

console.log(deepEqual(firstObj, secondObj)); // false; объекты разные
