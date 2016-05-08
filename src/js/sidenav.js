var $ = require('jquery'),
  Handlebars = require('handlebars'),
  template = require('../hbs/sidenav.hbs');

$('.js-sidenav').html(template());
$('.js-sidenav-2').html(TON_HBS.sidenav());
