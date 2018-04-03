<!-- INVITATION CODE -->
$('.invitation_text .form-control').keyup(function(e){
	if($(this).val().length==$(this).attr('maxlength'))
	$(this).next('.form-control').focus()
})
<!-- END INVITATION CODE -->

<!-- FIND COMPANY -->
$('.autocomplete').keyup(function() {
    var query = $.trim($('.autocomplete').val()).toLowerCase();
    $('div.company_name').each(function(){
         var $this = $(this);
         if($this.text().toLowerCase().indexOf(query) === -1)
             $this.closest('.company_section .col-md-3').fadeOut();
        else $this.closest('.company_section .col-md-3').fadeIn();
    });
});
$('.company_box').click(function(e){
	$('.company_box').removeClass('active');
    $(this).addClass('active');
});
<!-- END FIND COMPANY -->

<!-- SELECT SEARCH -->
$(document).ready(function() {
    $('select').select2();
});
<!-- END SELECT SEARCH -->

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