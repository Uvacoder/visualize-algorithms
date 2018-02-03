/**
 * File created by Øyvind Skeie Liland 01.02.18
 */
///<reference path="controller.ts"/>
///<reference path="kValue.ts"/>
///<reference path="viewFunctions.js"/>
var view = /** @class */ (function () {
    function view() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.arrayIsReset = false;
        this.k = 0;
        this.kLeft = 0;
        this.kRight = 0;
        this.currentAlgorithmName = "Insertion sort";
        this.paused = false;
        this.animSpeed = 500;
    }
    view.prototype.serializeArray = function (array) {
        var returnString = "";
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var i = array_1[_i];
            returnString = returnString.concat(i + "|");
        }
        return returnString.substring(0, returnString.length - 1);
    };
    view.prototype.switchArrayElements = function (indexA, indexB) {
        var forwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexA, indexB * 70, 0);
                setPosition(indexB, indexA * 70, 0);
                swapId(indexA, indexB);
            };
        }(indexA, indexB);
        var backwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexB, indexB * 70, 0);
                setPosition(indexA, indexA * 70, 0);
                swapId(indexA, indexB);
            };
        }(indexA, indexB);
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
    };
    view.prototype.moveArrayElementToIndex = function (fromIndex, toIndex) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                swapId(fromIndex, toIndex);
            };
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, toIndex) {
            return function () {
                swapId(toIndex, fromIndex);
                setPosition(fromIndex, fromIndex * 70, 0);
            };
        }(fromIndex, toIndex);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveArrayElementToIndexFromSpecifiedJIndex = function (fromIndex, toIndex, jIndex) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                //swapId(fromIndex, toIndex);
            };
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            };
        }(fromIndex, jIndex);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.storePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.releasePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.unpause = function () {
        manager.start();
        this.paused = false;
    };
    view.prototype.pause = function () {
        if (!this.paused) {
            manager.pause();
            this.paused = true;
            document.getElementById('togglePause').innerText = "resume";
        }
        else {
            this.unpause();
            document.getElementById('togglePause').innerText = "pause";
        }
    };
    view.prototype.forward = function () {
        manager.next();
    };
    view.prototype.backward = function () {
        manager.previous();
    };
    view.prototype.setKValue = function (value) {
        var forwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            };
        }(k, value);
        var backwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            };
        }(k, this.k);
        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setKLeftAndRight = function (left, right) {
        var forwardSteps = function (k, left, right) {
            return function () {
                k.setLeftAndRight(left, right, this.animSpeed);
            };
        }(k, left, right);
        var backwardSteps = function (k, kLeft, kRight) {
            return function () {
                k.setLeftAndRight(kLeft, kRight, this.animSpeed);
            };
        }(k, this.kLeft, this.kRight);
        this.kLeft = left;
        this.kRight = right;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInArrayElement = function (index, color, colorOn) {
        var forwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, colorOn);
            };
        }(index, color, colorOn);
        var backwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, !colorOn);
            };
        }(index, color, colorOn);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    /*
        setRandomArray() {
            manager.clear();
            manager.start();
            controller.setRandomArray();
            arrayIsReset = true;
        }
    */
    view.prototype.setHeadText = function (str) {
        setHeaderText(str);
    };
    view.prototype.unhideK = function () {
        var forwardSteps = function (k) {
            return function () {
                k.unhide();
            };
        }(k);
        var backwardSteps = function (k) {
            return function () {
                k.hide();
            };
        }(k);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.hideK = function () {
        var forwardSteps = function (k) {
            return function () {
                k.hide();
            };
        }(k);
        var backwardSteps = function (k) {
            return function () {
                k.unhide();
            };
        }(k);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    return view;
}());
var viewer = new view();
