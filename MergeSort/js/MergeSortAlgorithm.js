/**
 * File created by Philip Hoang 12.02.18
 * File designed and written by Kenneth Apeland
 */
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
///<reference path="InitArray.ts"/>
var n = 10;
var sortArray = [];
var copyArray = [];
var running = true;
function checkIfAlreadyRunning() {
    manager.clear();
    viewer.setPause();
}
function startMergeSort() {
    checkIfAlreadyRunning();
    copyArray = returnArray();
    mergesort(copyArray);
}
function mergesort(array) {
    if (array.length < 2) {
        return array;
    }
    else {
        var mid = void 0;
        var left = void 0;
        var right = void 0;
        mid = Math.floor(array.length * 0.5);
        //viewer.setPivotElement(copyArray.indexOf(array[mid - 1]));
        left = array.slice(0, mid);
        viewer.highlightNodes(left);
        viewer.lowerElements(left);
        viewer.deHighlightNodes(left);
        right = array.slice(mid);
        viewer.highlightNodes(right);
        viewer.lowerElements(right);
        viewer.deHighlightNodes(right);
        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}
function merge(left, right) {
    var result = [];
    var testing = copyArray.slice(0);
    var tempLeftIndex = 0;
    var tempRightIndex = 0;
    var counter = copyArray.indexOf(left[0]);
    while (tempLeftIndex < left.length && tempRightIndex < right.length) {
        //Compare the elements from each array
        viewer.highlightNode(left[tempLeftIndex]);
        viewer.highlightNode(right[tempRightIndex]);
        if (left[tempLeftIndex] < right[tempRightIndex]) {
            viewer.moveElementToPlace(left[tempLeftIndex], counter, copyArray.indexOf(left[tempLeftIndex]));
            viewer.deHighlightNode(left[tempLeftIndex]);
            result.push(left[tempLeftIndex]);
            testing[counter] = left[tempLeftIndex];
            counter++;
            tempLeftIndex++;
        }
        else {
            viewer.moveElementToPlace(right[tempRightIndex], counter, copyArray.indexOf(right[tempRightIndex]));
            viewer.deHighlightNode(right[tempRightIndex]);
            result.push(right[tempRightIndex]);
            testing[counter] = right[tempRightIndex];
            counter++;
            tempRightIndex++;
        }
    }
    if (right.slice(tempRightIndex).length > 0) {
        var moreRight = right.slice(tempRightIndex);
        viewer.highlightNodes(moreRight);
        for (var i = 0; i < moreRight.length; i++) {
            viewer.moveElementToPlace(moreRight[i], counter, copyArray.indexOf(moreRight[i]));
            viewer.deHighlightNode(moreRight[i]);
            testing[counter] = moreRight[i];
            counter++;
        }
    }
    if (left.slice(tempLeftIndex).length > 0) {
        var moreLeft = left.slice(tempLeftIndex);
        viewer.highlightNodes(moreLeft);
        for (var i = 0; i < moreLeft.length; i++) {
            viewer.moveElementToPlace(moreLeft[i], counter, copyArray.indexOf(moreLeft[i]));
            viewer.deHighlightNode(moreLeft[i]);
            testing[counter] = moreLeft[i];
            counter++;
        }
    }
    copyArray = testing.slice(0);
    return result.concat(left.slice(tempLeftIndex)).concat(right.slice(tempRightIndex));
}
function setRandomMyArray() {
    for (var i = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 100);
    }
    return sortArray;
}
function setSortedArray() {
    var arr = setRandomMyArray();
    return arr.sort(function (n1, n2) { return n1 - n2; });
}
function setInvSortedArray() {
    return setSortedArray().reverse();
}
function isSorted(arr) {
    return arr.forEach(function (n1, n2) { return n1 <= n2; });
}
function setAlmostSortedArray() {
    var arr = setSortedArray();
    for (var i = 1; i < arr.length - 1; i++) {
        if (Math.random() < 0.70) {
            if (Math.random() < 0.5) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
            else {
                var temp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
            }
        }
    }
    //If sorted array, try again.
    if (isSorted(arr)) {
        return setAlmostSortedArray();
    }
    return arr;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
