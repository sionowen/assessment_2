data = [];

$(document).on('ready', function() {
	getAnimals();

$('.addAnimal').on('click', addAnimal);



	function getAnimals() {
		$.ajax({
			type: 'GET',
			url: '/animal',
			success: function(animal) {
				data = animal;
				$('.zoo').empty();
				for (var i = 0; i < data.length; ++i) {
					appendAnimals(i);
				}
			}
		})
	}


	function addAnimal() {
		event.preventDefault();

		var animal = {};

			animal.animal = $('.animal').val();



		$.ajax({
			type: 'POST',
			url: '/animal',
			data: animal,
			success: function(success) {

				getAnimals();
			}

		});



	}



function appendAnimals(animal) {
	console.log(data);
	var targetData = data[animal];
	$('.zoo').append('<tr><td>' + targetData.animal + '</td><td>' + targetData.count_of + '</td></tr>')


}
})
