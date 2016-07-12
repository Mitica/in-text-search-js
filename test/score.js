'use strict';

var assert = require('assert');
var textScore = require('../index.js');

describe('in-text-search', function() {
	it('should be equals', function() {
		var text = 'Some simple, simple text';
		assert.equal(1, textScore(text).search(text));
		assert.equal(true, textScore(text).search('some text') <= 1);
		assert.equal(1, textScore(text).search('some simple text'));
		assert.equal(1, textScore(text).search('text'));
		assert.equal(1, textScore(text).search('text 12'));
		assert.equal(0, textScore(text).search('too sm'));
		assert.equal(true, textScore(text).search('simple') > 0);
	});

	it('should be less then 1', function() {
		var text = 'Some simple text';
		var score = textScore(text).search('Some else text');
		assert.equal(true, score === 2 / 3);
		score = textScore(text).search('Some 1234 text');
		assert.equal(true, score === 2 / 3);

		text = 'МОСКВА, 12 июл — РАПСИ, Диана Гуцул. Московский окружной военный суд 25 июля проведет предварительные слушания по уголовному делу об убийстве политика Бориса Немцова, сообщили РАПСИ в пресс-службе суда.\n' +
			'"Предварительные слушания назначены на 25 июля и, в соответствии с законом, пройдут в закрытом режиме", — сказала собеседница агентства.\n' +
			'В конце июня официальный представитель СК РФ Владимир Маркин сообщил о завершении расследования уголовного дела в отношении Заура Дадаева, Шадида Губашева, Анзора Губашева, Темирлана Эскерханова и Хамзата Бахаева, обвиняемых в совершении убийства по найму в составе организованной группы и незаконном приобретении, ношении, перевозке и хранении огнестрельного оружия.\n' +
			'По версии следствия, в конце сентября 2014 года Руслан Мухудинов и иные лица предложили Беслану Шаванову, Дадаеву, Анзору и Шадиду Губашевым, Бахаеву и Эскерханову за денежн...';

		score = textScore(text).search('Названа дата суда по делу об убийстве Немцова');
	});

	it('should use stopwords', function() {
		var text = 'Ce sa fac nu ceva text daca atunci';
		var score = textScore(text, { stopwords: 'ro' }).search('atunci');
		assert.equal(1, score);
		// console.log(score);
		score = textScore(text, { stopwords: ['daca'] }).search('daca');
		assert.equal(0, score);
		// console.log(score);
	});
});
