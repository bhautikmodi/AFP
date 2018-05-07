<!-- INVITATION CODE -->
$('.invitation_text .form-control').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength'))
	$(this).next('.form-control').focus()
})
<!-- END INVITATION CODE -->

<!-- REGISTER EMPLOYEE -->
$('[data-toggle="tooltip"]').tooltip()
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
	
<!-- SELECT SEARCH -->
$(document).ready(function() {
    $('.select2').select2();
});
<!-- END SELECT SEARCH -->

<!-- ASSESSMENT -->
$('input[type="radio"]').change(function(){
	var i;
	for (i = 0; i < 57; i++) { 
		if($("input:radio[name='ksa" + i + "_radio']").is(":checked")) {
		  $('#ksa' + i + '_dots').removeClass('fa-circle-o');
		  $('#ksa' + i + '_dots').addClass('fa-dot-circle-o');
	  }
	}
});
<!-- END ASSESSMENT -->

<!-- TOOLTIP -->
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
<!-- END TOOLTIP -->

<!-- SCROLLBAR -->
 new PerfectScrollbar('.preview_ksa .scroll_table');
 new PerfectScrollbar('.course_rec .scroll_course');
<!-- END SCROLLBAR -->