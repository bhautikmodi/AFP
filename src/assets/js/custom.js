<!-- INVITATION CODE -->
$('.invitation_text .form-control').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength'))
	$(this).next('.form-control').focus()
})
<!-- END INVITATION CODE -->

<!-- FIND COMPANY -->
$('.autocomplete').keyup(function() {
    var query = $.trim($('.autocomplete').val()).toLowerCase();
	var i = 0;
    $('div.company_name').each(function(){
         var $this = $(this);
         if($this.text().toLowerCase().indexOf(query) === -1){
		 	
             $this.closest('.company_section .col-md-3').fadeOut();
		 } else{
			 i++;
			$this.closest('.company_section .col-md-3').fadeIn();
		 }
    });
	 if(i>0){
	   $('.company_section .no_result').fadeOut();
	   
	} else{
		$('.company_section .no_result').fadeIn();
	}
});
$('.company_box').click(function(e){
	$('.company_box').removeClass('active');
    $(this).addClass('active');
});

$( "#company_name" ).keyup(function() {
	$(".inner_content").addClass("height_zero");
	$(".company_section").removeClass("display_company");
});
<!-- END FIND COMPANY -->

<!-- REGISTER EMPLOYEE -->
$('#employee_btn').click(function () {
	$("#submit_Modal").modal('show');
});
<!-- END REGISTER EMPLOYEE -->

<!-- REGISTER COMPANY -->
$('#company_btn').click(function () {
	$("#submit_Modal").modal('show');
});
<!-- END REGISTER COMPANY -->

<!-- SALES DASHBOARD -->
$('.user_box').click(function(e){
	$('.user_box').removeClass('active');
    $(this).addClass('active');
});
<!-- END SALES DASHBOARD -->

<!-- PROGRESS BAR ASSESSMENT -->
progress = document.getElementById("progress");
$(progress).css("width", "30%");
<!-- END PROGRESS BAR ASSESSMENT -->


