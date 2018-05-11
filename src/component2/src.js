import module2 from 'module/module2';
import module1 from 'module/module1';
import $ from 'jquery';
import './style.less';

$(function() {
    $('body').append('<h1>Component2</h1>');
    $('body').append(`<h1>${module1}</h1>`);
    $('body').append(`<h1>${module2}</h1>`);
});


