"use strict";
import {formatNum} from './formatter'
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var MoneyPacket = function () {
    function MoneyPacket(packNumber, money) {
        _classCallCheck(this, MoneyPacket);

        this.min = 0.01;
        this.flag = true;
        this.packNumber = packNumber;
        this.money = money;
        if (!this.checkPackage()) {
            this.flag = false;
            return {
                "flag": this.flag
            };
        }
    }

    _createClass(MoneyPacket, [{
        key: "checkPackage",
        value: function checkPackage() {
            if (this.packNumber == 0) {
                return false;
            }
            if (this.money <= 0) {
                return false;
            }
            if (this.packNumber * this.min > this.money) {
                return false;
            }
            return true;
        }
    }]);

    return MoneyPacket;
}();

var getRandomMoney = function getRandomMoney(packet) {
    if (packet.packNumber == 0) {
        return;
    }
    if (packet.packNumber == 1) {
        var _lastMoney = Math.round(packet.money * 100) / 100;
        packet.packNumber--;
        packet.money = 0;
        return _lastMoney;
    }
    var min = 0.01,
        max = packet.money / packet.packNumber * 2,
        money = Math.random() * max;
    money = money < min ? min : money;
    money = Math.floor(money * 100) / 100;
    packet.packNumber--;
    packet.money = Math.round((packet.money - money) * 100) / 100;
    return money;
};

function getMoney(packet, money) {
    var numberArr = new Array();
    var str = "";
    var packet = new MoneyPacket(packet, money),
        num = packet.flag && packet.packNumber || 0;
    for (var i = 0; i < num; i++) {
        var _pack = getRandomMoney(packet);
        numberArr.push(_pack.toFixed(2));
    }
    return numberArr;
}

function checkNumber(number,min,max,fudong) {
    var arr = new Array();
    arr = getMoney(number, fudong)
    for(var i = 0;i<arr.length;i++){
        if(arr[i]  > (Number(max)-Number(min))){
            arr = checkNumber(number,min,max,fudong);
            return arr;
        }
    }
    return arr;
}

function getCompanyNumber(number, min, max, packet) {
    console.log(number, min, max, packet,'------------')
    var fudong =formatNum((number-min) * packet,2);
    console.log(fudong,'------------fudong')
    var rrr = checkNumber(packet,min,max,fudong);
    var arr = new Array();
    for(var i = 0;i<rrr.length;i++){
        var m = Number(rrr[i])+Number(min)
        arr.push(m);
    }
    var c = 0;
    for(var k = 0;k<arr.length;k++){
        c=c+arr[k];
    }
    console.log(c/packet)
    return arr;
}
export {getCompanyNumber}