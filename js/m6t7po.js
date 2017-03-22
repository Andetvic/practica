$(function(){
  $(".oculto").hide();
  $(".inf").click(function(){
    var nodo = $(this).attr("href");

    if ($(nodo).is(":visible")){
      $(nodo).hide();
      return false;
    }else{
      $(".oculto").hide("slow");
      $(nodo).fadeToggle('fast');
      return false;
    }
  });

  $('.ir-arriba').click(function(){
		$('body, html').animate({
			scrollTop: '0px'
		},300 );
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 0){
			$('.ir-arriba').slideDown(300);
		} else {
			$('.ir-arriba').slideUp(300);
		};
	});

  $('a').click(function(e){
    e.preventDefault();		//evitar el eventos del enlace normal
    var strAncla=$(this).attr('href'); //id del ancla
    $('body,html').stop(true,true).animate({
      scrollTop: $(strAncla).offset().top
    },1000);
  });
});
