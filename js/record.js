"use strict";

window.Record = (function () {
    var record = function (op1, op2, method, answer, success) {
        if (hostCheck) {
            jQuery.post(
                'record.php',
                JSON.stringify({
                    op1,
                    op2,
                    method,
                    answer, success
                })
            );
        }
    };

    var hostCheck = function() {
        return window.location.host !== '';
    };

    return {
        record
    };
})();
