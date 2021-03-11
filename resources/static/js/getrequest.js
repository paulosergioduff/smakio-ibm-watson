$( document ).ready(function() {
	
	// GET REQUEST
	$("#allCustomers").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : "/api/users/all",
			success: function(result){
				$('#getResultDiv ul').empty();
				var custList = "";
				$.each(result, function(i, customer){
					$('#getResultDiv .list-group').append(customer.id + ". " + customer.firstname + " " + customer.lastname +'<audio controls><source src=\"/static/uploads/'+customer.firstname+'.wav\" type=\"audio/wav\"></audio><br>')
				});
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
	}
})