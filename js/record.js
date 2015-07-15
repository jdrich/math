"use strict";

window.Record = (function () {
    var record = function (op1, op2, method, answer, success) {
        if (hostCheck()) {
            jQuery.post(
                'record.php',
                JSON.stringify({
                    op1,
                    op2,
                    method,
                    answer,
                    success
                })
            );
        }
    };

    var records = function (start, end) {
        if (hostCheck()) {
            jQuery.get(
                'record.php',
                { start, end },
                function(data) {
                    jQuery('.main').addClass('hidden');
                    jQuery('.game').addClass('hidden');
                    jQuery('.record').removeClass('hidden');

                    console.log(data);
                }
            );
        }
    }

    var hostCheck = function() {
        return window.location.host !== '';
    };

    return {
        record
    };
})();
