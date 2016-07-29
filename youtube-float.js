// ==UserScript==
// @name        /r/videos floater
// @namespace   videofloater
// @description Floats the video in a small side window while you read comments
// @include     https://www.reddit.com/r/videos/comments/*
// @include     http://www.reddit.com/r/videos/comments/*
// @include     http://www.reddit.com/r/music/comments/*
// @require     https://code.jquery.com/jquery-3.1.0.min.js
// @version     1
// @grant       none
// ==/UserScript==
$(document).ready(function () {
  $('.expando-button.expanded.video').click(function () {
    var url = $('a.title').attr('href');
    var myId = getId(url);
    var new_iframe = '<iframe width="100%" height="90%" src="//www.youtube.com/embed/'
    + myId + '" frameborder="0" allowfullscreen autoplay="1"></iframe>';
    var close_div = '<div><p><a class = "floater-close" href="javascript:void(0)">Close</a></p></div>';
    var floater = '<div class="floatbox" ' +
    'style=z-index:100000;position:fixed;width:28%;height:33%;right:0;top:0;>' +
    new_iframe +
    close_div +
    '</div>';
    $(floater).appendTo('body');
    $('.floater-close').click(function () {
      $('.floatbox').remove();
    });
  });
  function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
});
