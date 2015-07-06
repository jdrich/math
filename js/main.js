"use strict";

(function () {
    var operations = {
        add: '&plus;',
        subtract: '&minus;',
        multiply: '&times;',
        divide: '&divide;',
        random: '?'
    };

    var failed = false;

    var type = 'home';

    var load = function() {
        jQuery('body').html(jQuery('body').html().replace('{name}', window.Config.child.name));

        jQuery('.main').removeClass('hidden');
    };

    var endGame = function() {
        window.Game.end();

        type = 'home';

        jQuery('.record').addClass('hidden');
        jQuery('.game').addClass('hidden');
        jQuery('.main').removeClass('hidden');
    };

    var record = function(start, end) {
        jQuery('.main').addClass('hidden');
        jQuery('.game').addClass('hidden');
        jQuery('.record').removeClass('hidden');
    };

    var startGame = function(set_type) {
        window.Game.start();

        if (type !== 'home') {
            return;
        }

        type = set_type;

        next();

        jQuery('.main').addClass('hidden');
        jQuery('.game').removeClass('hidden');

    };

    var next = function() {
        failed = false;

        jQuery('input[name="answer"]').val('');
        var question = window.Game.create(type);

        render(question);
    };

    var render = function(question) {
        jQuery('.prompt').html(getPrompt());

        jQuery('.problem .op1').html(question[0]);
        jQuery('.problem .op2').html(question[1]);
        jQuery('.problem .op').html(operations[question[2]]);
    };

    var attachControlListener = function() {
        var start = function () {
            startGame(jQuery(this).attr('data-type'));
        };

        jQuery('.controls .navbar-link').click(start);
        jQuery('.tile .btn').click(start);
    };

    var attachHomeListener = function() {
        jQuery('.navbar-brand').click(endGame);
    };

    var attachRecordListener = function() {
        jQuery('.current-record').click(record);
    };

    var getPrompt = function() {
        var prompts = window.Config.prompts;

        return prompts[Math.floor(Math.random()*prompts.length)];
    };

    var getCorrect = function() {
        var correct = window.Config.successes;

        return correct[Math.floor(Math.random()*correct.length)];
    };

    var getIncorrect = function() {
        var incorrect = window.Config.failures;

        return incorrect[Math.floor(Math.random()*incorrect.length)];
    };

    var handleAnswer = function () {
        var answer = parseInt(jQuery('input[name="answer"]').val(), 10);

        var success = true;
        var skip = false;

        if(window.Game.test(answer)) {
            jQuery('.prompt').html(getCorrect());
        } else {
            success = false;

            if (failed) {
                skip = true;
            }

            failed = true;

            jQuery('.prompt').html(getIncorrect());
        }

        if (skip) {
            modal('Let\'s skip this one and get a new question', 'warning', next);
        } else if(success) {
            modal('You did a great job. Keep going!', 'success', next);
        }

        updateStats();

        return false;
    };

    var updateStats = function() {
        var stats = window.Game.stats();

        var stats_string = '<span class="text-success">' + stats[0] + '</span> / ';
        stats_string += '<span class="text-danger">' + stats[1] + '</span> / ';
        stats_string += '<span class="text-info">' + stats[2] + '</span>';

        jQuery('.current-record').html(stats_string);
    };

    var modal = function(text, type, next) {
        jQuery('body').append('<div class="main-modal alert alert-' + type + '">' + text + '<a class="next" href="#"><span class="glyphicon glyphicon-play"></span></a></div>');
        jQuery('.main-modal').each(function() {
            jQuery(this).css('margin-left', (-(jQuery(this).width() / 2)) + 'px');
        });
        jQuery('.main-modal .next').click( function() {
            jQuery(this).parent().remove();
            next();
        });
    };

    var attachAnswerListener = function () {
        jQuery('.answer').submit(handleAnswer);
    };

    var init = function() {
        load();

        attachControlListener();
        attachHomeListener();
        attachRecordListener();
        attachAnswerListener();
    };

    jQuery(document).ready(init);
})();
