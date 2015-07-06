"use strict";

window.Game = (function () {
    var current;

    var correct;
    var incorrect;
    var total;

    var start = function() {
        correct = 0;
        incorrect = 0;
        total = 0;
    };

    var end = function() {
        current = null;
    };

    var test = function(op1, op2, method, answer) {
        if (typeof op2 === 'undefined') {
            answer = op1;
            op1 = current[0];
            op2 = current[1];
            method = current[2];
        }

        var success = solve(op1, op2, method) === answer;

        total++;

        if (success) {
            correct++;
        } else {
            incorrect++;
        }

        window.Record.record(op1, op2, method, answer, success);

        return success;
    };

    var randInt = function(min, max) {
        return min + Math.floor((Math.random() * (max-min+1)));
    };

    var create = function(type) {
        current = get(type);

        return current;
    };

    var get = function(type) {
        var child = window.Config.child;

        var types = ['add', 'subtract', 'multiply', 'divide'];

        if (type === 'random') {
            type = types[randInt(0, 3)];
        }

        switch(type) {
            case 'add':
                return [ randInt(0, child.addRange), randInt(0, child.addRange), 'add'];
            case 'subtract':
                var op2 = randInt(0, child.addRange);

                return [ op2 + randInt(0, child.addRange), op2, 'subtract'];
            case 'multiply':
                return [ randInt(0, child.multRange), randInt(0, child.multRange), 'multiply'];
            case 'divide':
                var op2 = randInt(1, child.multRange);

                return [ op2 * randInt(1, child.multRange), op2, 'divide'];
        }

        return null;
    };

    var solve = function(op1, op2, method) {
        if (typeof op1 === 'undefined') {
            op1 = current[0];
            op2 = current[1];
            method = current[2];
        }

        switch(method) {
            case 'add':
                return op1 + op2;
            case 'subtract':
                return op1 - op2;
            case 'multiply':
                return op1 * op2;
            case 'divide':
                return op1 / op2;
        }

        return null;
    };

    var stats = function() {
        return [correct, incorrect, total];
    };

    return {
        start,
        end,
        test,
        create,
        solve,
        stats
    };
})();
