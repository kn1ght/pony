'use strict';

(function(){
	var showModal = document.querySelector('.showModal'),
		modalBackground = document.getElementsByClassName('modal-bg')[0],
		modalExit = document.getElementsByClassName('modalClose');

	showModal.addEventListener('click', function(e) {
		e.preventDefault();
		var href = this.getAttribute('href');
		openModal(href);
	});

	for (var i = 0; i < modalExit.length; i++) {
		modalExit[i].addEventListener('click', function() {
			closeModal();
		});
	}

	modalBackground.addEventListener('click', function() {
		closeModal();
	});

	var openModal = function(id) {
		var modal = document.getElementById(id);
		modal.style.display = "block";
		modalBackground.style.display = "block";
	};

	var closeModal = function() {
		var modal = document.getElementsByClassName('modal');
		for (var i = 0; i < modal.length; i++) {
			modal[i].style.display = "none";
		}
		modalBackground.style.display = "none";
	};
})();

