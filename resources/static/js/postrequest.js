$( document ).ready(function() {
	
	// SUBMIT FORM
    $("#customerForm").submit(function(event) {
		// Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
    
    
    function ajaxPost(){
    	
    	// PREPARE FORM DATA
    	var formData = {
    		firstname : $("#firstname").val(),
    		lastname :  $("#lastname").val()
    	}
    	
    	// DO POST
    	$.ajax({
			type : "POST",
			contentType : "application/json",
			url : window.location + "api/users/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(customer) {
				$("#postResultDiv").html("<p>" + 
					"<p class='mensagemAlerta'>Enviado com sucesso!! O servidor demora alguns segundos para gerar o audio do comentário. Clique em \"Atualizar lista\" daqui a alguns instantes<br>"); 

			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		});

		// Não tive tempo de isolar essa função para recarregar a lista de comentários
		// Este é o único motivo para estar usando esse trecho código desta maneira

		$.ajax({
			type : "GET",
			url : "/api/users/all",
			success: function(result){
				$('#getResultDiv ul').empty();
				var custList = "";
				$.each(result, function(i, customer){
					$('#getResultDiv .list-group').append(customer.id + " - " + customer.lastname +'<audio controls><source src=\"/static/uploads/'+customer.firstname+'.wav\" type=\"audio/wav\"></audio><br>')
				});
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});
    	
    	// Reset FormData after Posting
    	resetData();
 
    }
    
    function resetData(){
    	$("#firstname").val("");
    	$("#lastname").val("");
    }
})