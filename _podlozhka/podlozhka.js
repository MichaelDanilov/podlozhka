(function($,undefined) {
  'use strict';

  var $body_elems = $('body').children(), // root
  $podlozhka = {},
  $form = {},
  $event = {};

  // inserted html
  $podlozhka.html = '<div class="dnlv-podlozhka__body"></div><div class="dnlv-podlozhka__img"></div><div class="dnlv-podlozhka__form dnlv-podlozhka-twbs"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Podlozhka</h4></div><div class="modal-body"><div class="form-group"><label for="dnlv-podlozhka-form-imgsrc">Path of image</label><input type="text" class="form-control" id="dnlv-podlozhka-form-imgsrc" placeholder="_podlozhka/img/img.png" value="_podlozhka/img/img.png"></div><div class="form-group"><label>Margins</label><div class="form-inline"><div class="input-group"><span class="input-group-addon">left:</span><input type="text" class="form-control" id="dnlv-podlozhka-form-imgx"><span class="input-group-addon">px</span></div><div class="input-group"><span class="input-group-addon">top:</span><input type="text" class="form-control" id="dnlv-podlozhka-form-imgy"><span class="input-group-addon">px</span></div></div></div></div></div></div>';
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

  function changeImgPositions (x, y) {
    $form.x.val(parseFloat(x));
    $form.y.val(parseFloat(y));
  }

  $form.img_src.on('keyup',function () {

    $podlozhka.img_src = $form.img_src.val();

    $podlozhka.img_wrap.css({
      'background-image': 'url(' + $podlozhka.img_src + ')'
    });

    $event.mousedown = false;

    changeImgPositions($podlozhka.mouse_positions.x, $podlozhka.mouse_positions.y);

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
          changeImgPositions($positions[1], $positions[2]);
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

})(jQuery);