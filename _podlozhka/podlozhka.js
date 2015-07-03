(function($, window, undefined) {
  'use strict';

  $(window.document).on('ready', function() {
    var $body_elems = $('body').children(), // root
    $podlozhka = {},
    $form = {},
    $event = {},
    $_utils = {};

    $_utils.changeImgPositions = function (x, y) {
      $form.x.val(parseFloat(x));
      $form.y.val(parseFloat(y));
    };

    // inserted html
    $podlozhka.html = '<div class="dnlv-podlozhka__body"></div><div class="dnlv-podlozhka__img"></div><div class="dnlv-podlozhka__form dnlv-podlozhka-twbs"><div class="modal-content"><div class="modal-header"><div class="on-off"><span class="icon-off"></span></div><h4 class="modal-title">Podlozhka</h4></div><div class="modal-body"><div class="form-group"><label for="dnlv-podlozhka-form-imgsrc">Path of image</label><input type="text" class="form-control" id="dnlv-podlozhka-form-imgsrc" placeholder="_podlozhka/img/img.png" value="_podlozhka/img/img.png"></div><ul class="nav nav-tabs"><li class="active"><a href="#numeric" data-toogle="tab">Numeric</a></li><li class=""><a href="#sticky" data-toogle="tab">Sticky</a></li></ul><div class="tab-content" id="myTabContent"><div id="numeric" class="tab-pane fade active in"><div class="form-group"><label>Margins</label><div class="form-inline"><div class="input-group"><span class="input-group-addon">left:</span><input type="text" class="form-control" id="dnlv-podlozhka-form-imgx"><span class="input-group-addon">px</span></div><div class="input-group"><span class="input-group-addon">top:</span><input type="text" class="form-control" id="dnlv-podlozhka-form-imgy"><span class="input-group-addon">px</span></div></div></div></div><div id="sticky" class="tab-pane fade"><div class="form-group"><label>Position</label><div class="form-inline"><label for="posLeft" class="radio-inline"><input type="radio" name="position" value="left 0" id="posLeft" class="dnlv-podlozhka-form-position"> Left</label><label for="posCenter" class="radio-inline"><input type="radio" name="position" value="center 0" id="posCenter" class="dnlv-podlozhka-form-position"> Center</label><label for="posRight" class="radio-inline"><input type="radio" name="position" value="right 0" id="posRight" class="dnlv-podlozhka-form-position"> Right</label></div></div></div></div></div></div></div>';
    // styles
    $podlozhka.css = '<link rel="stylesheet" href="_podlozhka/podlozhka.min.css">';
    $podlozhka.img_src = '';

    $('body').append($podlozhka.html);
    $('head').append($podlozhka.css);

    $podlozhka.body = $('.dnlv-podlozhka__body');
    $podlozhka.img_wrap = $('.dnlv-podlozhka__img');
    
    $form.img_src = $('#dnlv-podlozhka-form-imgsrc');
    $form.x = $('#dnlv-podlozhka-form-imgx');
    $form.y = $('#dnlv-podlozhka-form-imgy');
    $form.position = $('.dnlv-podlozhka-form-position');

    $body_elems.each(function(){
      var $this = $(this),
      elem;
      if ($this.nodeName !== 'script') {
        elem = $this.detach();
        $podlozhka.body.append(elem);
      }
    });

    $podlozhka.mouse_positions = {
      x: 0,
      y: 0
    };
    $podlozhka.img_positions = {
      x: 0,
      y: 0
    };

    // on-off podlozhka
    $('.on-off').on('click',function (){
      var $this = $(this);
      if ($this.hasClass('on-off_active')) {
        $('.dnlv-podlozhka__form .modal-body').hide();
        $this.removeClass('on-off_active');
        $podlozhka.img_wrap.hide();
      } else {
        $('.dnlv-podlozhka__form .modal-body').show();
        $this.addClass('on-off_active');
        $podlozhka.img_wrap.show();
      }
    });

    // worker on change path to image
    $form.img_src.on('keyup',function () {

      $podlozhka.img_src = $form.img_src.val();

      $podlozhka.img_wrap.css({
        'background-image': 'url(' + $podlozhka.img_src + ')'
      });

      $event.mousedown = false;

      $_utils.changeImgPositions($podlozhka.mouse_positions.x, $podlozhka.mouse_positions.y);

      $podlozhka.img_wrap.on('mousedown',function(event){
        if (!$event.mousedown) {
          $event.mousedown = true;
          $podlozhka.mouse_positions.x = event.pageX;
          $podlozhka.mouse_positions.y = event.pageY;
          return;
        }
      });

      $podlozhka.img_wrap.on('mousemove',function(event){
        var x,y;
        if ($event.mousedown) {
          x = $podlozhka.img_positions.x + (event.pageX - $podlozhka.mouse_positions.x);
          y = $podlozhka.img_positions.y + (event.pageY - $podlozhka.mouse_positions.y);
          $podlozhka.img_wrap.css({
            'background-position': x + 'px ' + y + 'px'
          });
        }
      });

      $podlozhka.img_wrap.on('mouseup',function(){
        var $positions;
        if ($event.mousedown) {
          $event.mousedown = false;
          $positions = $podlozhka.img_wrap.css('background-position').match(/^([0-9\-\+\.]*)px ([0-9\-\+\.]*)px$/i);
          if ($positions) {
            $podlozhka.img_positions.x = parseFloat($positions[1]);
            $podlozhka.img_positions.y = parseFloat($positions[2]);
            $_utils.changeImgPositions($positions[1], $positions[2]);
            return;
          }
        }
      });
    });

    $form.x.on('keyup',function () {
      $podlozhka.img_positions.x = parseFloat($(this).val());
      $podlozhka.img_wrap.css({
        'background-position': $podlozhka.img_positions.x + 'px ' + $podlozhka.img_positions.y + 'px'
      });
    });

    $form.y.on('keyup',function () {
      $podlozhka.img_positions.y = parseFloat($(this).val());
      $podlozhka.img_wrap.css({
        'background-position': $podlozhka.img_positions.x + 'px ' + $podlozhka.img_positions.y + 'px'
      });
    });

    $form.position.on('change',function (){
      $podlozhka.img_wrap.css({
        'background-position': $(this).val()
      });
    });

    $('.dnlv-podlozhka__form .nav-tabs a').click(function (event) {
      event.preventDefault();
      $(this).tab('show');
    });
});

})(jQuery, window);