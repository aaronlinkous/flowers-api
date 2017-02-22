var wh,ww,fade_end;
var header_height = 56;
var row = 24;
var large_gutter = 32;
var normal_gutter = 16;
var	fade_start = header_height;
var fade_img = $('#product_images img');
var initial_load = 1;

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}

		var callNow = immediate && !timeout;
		clearTimeout(timeout);

		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}

function calculate_skus() {
	skus = $("#product_skus");
	num_skus = $(".sku").length;
	selected_sku = $("input[name='skus']:checked + label").attr("for");
	selected_sku = selected_sku.replace("sku","")
	min_width = 145;

	sku_w_calc = ($("#pick_date").outerWidth() - normal_gutter) / 2;
	sku_w = sku_w_calc < min_width ? min_width : sku_w_calc;

	$(".sku").outerWidth(sku_w);
	skus.animate({scrollLeft: (sku_w*selected_sku) + (normal_gutter*selected_sku)}, 500);

	setTimeout(function(){
		if(!skus.hasClass("fadeIn")) skus.addClass("fadeIn");
	}, 750);
}

var screen_setup = debounce(function() {
	wh = screen.height;
	ww = screen.width;
	fade_end = fade_img.outerHeight();

	calculate_skus();
}, 250);

window.addEventListener('resize', screen_setup);

$(document).ready(function(){
	$('#pick_date').waypoint(function(direction) {
		if(direction =="down") {
			$(this.element).addClass("sticky").removeClass("animated");
			$("header .animated").removeClass("fadeInDown").addClass("fadeOutUp").removeClass("fadeInDown");
		} else {
			$(this.element).removeClass("sticky");
			$("header .animated").removeClass("fadeOutUp").addClass("fadeInDown");
		}
	}, {
		offset: header_height / 2
	});

	screen_setup();
	initial_load = 0;
}).on('scroll', function(){
	scroll_offset = $(this).scrollTop();
	scroll_opacity = initial_load == 1 ? 1.0 : 0;

	if(scroll_offset <= fade_start) {
		scroll_opacity = 1;
	}else if(scroll_offset <= fade_end ){
		scroll_opacity = 1 - scroll_offset / fade_end;
	}

	fade_img.css('opacity', scroll_opacity);
});