"use strict";

(function(){
	var ponies = [{
		"name": "Твайлайт1",
		"link": "img/earth.jpg",
		"color": "Красный",
		"kind": "Земная пони",
		"price": 5.99,
		"is_new": false
	}, {
		"name": "Твайлайт2",
		"link": "img/earth.jpg",
		"color": "Оранжевый",
		"kind": "Земная пони",
		"price": 10.99,
		"is_new": true
	}, {
		"name": "Твайлайт3",
		"link": "img/unicorn.jpg",
		"color": "Желтый",
		"kind": "Единорог",
		"price": 19.99,
		"is_new": false
	}, {
		"name": "Твайлайт4",
		"link": "img/unicorn.jpg",
		"color": "Зеленый",
		"kind": "Единорог",
		"price": 19.99,
		"is_new": true
	}, {
		"name": "Твайлайт5",
		"link": "img/pegas.jpg",
		"color": "Голубой",
		"kind": "Пегас",
		"price": 19.99,
		"is_new": false
	}, {
		"name": "Твайлайт6",
		"link": "img/pegas.jpg",
		"color": "Синий",
		"kind": "Пегас",
		"price": 19.99,
		"is_new": true
	}, {
		"name": "Твайлайт7",
		"link": "img/alicorn.jpg",
		"color": "Фиолетовый",
		"kind": "Аликорн",
		"price": 19.99,
		"is_new": false
	}];

	function shuffle(o){ //нашел функцию со stackoverflow, чтобы шафлить наш массив
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	}

	function onlyNumbersWithDot(evt) { //нашел функцию со stackoverflow, чтобы в инпуты вводить только цифры и точку
		var e = event || evt; // for trans-browser compatibility
		var charCode = e.which || e.keyCode;
		if (charCode == 46)
			return true
		if (charCode > 31 && (charCode < 48 || charCode > 57))
			return false;
		return true;
	}

	var createNode = function(tag, attributes, content) {
		var node = document.createElement(tag),
		attribute;

		for (attribute in attributes) {
			if (attributes.hasOwnProperty(attribute)) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}

		if (typeof content === 'string') {
			node.textContent = content;
		} else {
			content.map(function(contentItem) {
				node.appendChild(contentItem);
			});
		}

		return node;
	};

	var createPonies = function(array) {
		if (array.length == 0) {
			document.getElementById("poniesContainer").innerHTML = 'По вашим критериям не найдено ни одного пони';
		}

		else {
			shuffle(array);
			var slicedArray;
			if (array.length > 20) {
				slicedArray = array.slice(0, 20);
			}
			else {
				slicedArray = array;
			}

			document.getElementById("poniesContainer").innerHTML = '';
			for (var i = 0; i < slicedArray.length; i++) {
				var pony = createNode("div", {"class": "pony"}, [
					createNode("div", {"class": "pony__name"}, "имя: " + slicedArray[i].name),
					createNode("img", {"src": slicedArray[i].link}, ""),
					createNode("div", {"class": "pony__color"}, "цвет: " + slicedArray[i].color),
					createNode("div", {"class": "pony__color"}, "тип: " + slicedArray[i].kind),
					createNode("div", {"class": "pony__color"}, "цена: " + slicedArray[i].price),
					createNode("div", {"class": "pony__color"}, "Новый: " + slicedArray[i].is_new),
				]);
				document.getElementById("poniesContainer").appendChild(pony);
			}
		}
	};

	var filter = function(myArray, myProps) { //самое сложное было написать эту функцию для фильтрации наших пони
		var results = [];
		var counter = 0;
		var secondCounter = 0;
		var minPrice = document.getElementById('min').value;
		if (minPrice == '') {
			minPrice = 0;
		}
		var maxPrice = document.getElementById('max').value;
		if (maxPrice == '') {
			maxPrice = 99999;
		}
		for (var i = 0; i < myArray.length; i++) {

			for (var myPropsKey in myProps) {
				counter += 1;

				if (myArray[i][myPropsKey] === undefined) {
					break;
				}

				else {
					for (var myArrayKey in myArray[i]) {
						if (myArrayKey == myPropsKey) {
							if (myArrayKey == "price") {
								if (myArray[i][myArrayKey] >= minPrice && myArray[i][myArrayKey] <= maxPrice) {
									secondCounter += 1;
								}
							}
							else if (myArray[i][myArrayKey] == myProps[myPropsKey] || myProps[myPropsKey] == "any") {
								secondCounter += 1;
							}
						}
					}
				}
			}

			if (counter === secondCounter) {
				results.push(myArray[i]);
			}
			counter = secondCounter = 0;

		}
		return results;
	};

	var state = { //начальное состояние объекта, по которому фильтруем
		color: "any",
		kind: "any",
		price: "any",
		is_new: "any"
	};

	var updateState = function () {
		var color = document.getElementById("color");
		state.color = color.options[color.selectedIndex].value;

		var kind = document.getElementById("kind");
		state.kind = kind.options[kind.selectedIndex].value;

		var is_new = document.getElementById('is_new').checked;
		if (is_new == false) {
			is_new = "any";
		}
		state.is_new = is_new;

		var newPonies = filter(ponies, state);
		createPonies(newPonies);
	};

	var inputs = document.getElementsByClassName('input-number');
	for (var j = 0; j < inputs.length; j++) {
		inputs[j].addEventListener('keypress', function(event) {
			if (!onlyNumbersWithDot(event)) {
				event.preventDefault();
			}
		})
	};

	document.getElementById('searchPonies').addEventListener('click', updateState);

	createPonies(ponies);
})();