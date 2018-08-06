$(document).ready(function() {
	$(".open").pageslide({ speed: '500' });
	$(".row .collapse").collapse();
	
	$("header h1 .menu-button").on("click", function(event){
		$(".container").toggleClass("container-shift");
	});
	
	$(".container").on("click", function(event){
		$(".container").removeClass("container-shift");
	});
	
	$(window).on("resize", function(event){
		if ($(window).width() < 759){
			$(".dropdown-toggle b").hide();
			$("#menu1").removeClass("open");
		}
		else {
			$(".dropdown-toggle b").show();
		}
	}).resize();
	
	$('.span9 .nav a').click(function(e) {
	  e.preventDefault();
	  $(this).tab('show');
	});
    
});

