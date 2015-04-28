App.filter('money', function() {
    return function(input) {
        return accounting.formatMoney(input, { symbol: "vnđ", format: "%v %s", decimal : ",", thousand: ".", precision: 0 });
    };
});