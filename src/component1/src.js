import module1 from 'module/module1';
import $ from 'jquery';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import './style.less';
import './style.sss';
import modal from './modal.html';
import 'bootstrap';

    $('body').append('<h1>Component1</h1>');
    $('body').append(`<h1>${module1}</h1>`);
    $('body').append(modal);
    $('.modal').modal().show();
