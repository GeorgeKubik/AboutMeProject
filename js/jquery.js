$(document).ready(function () {
	'use strict';

	const navigationList = $('.navigation__list');
	const navigationItems = $('.navigation__link');
	const mainSection = $('.main__content-block');
	const mainContent = $('.main__content');

	const experienceCards = $('.main__experience-card');
	const skillsCards = $('.main__skills-card');
	const btnShowCards = $('.main__btn');

	function hideContent() {
		mainSection.addClass('hide').removeClass('show fade');
	}

	function showContent(i = 0) {
		mainSection.eq(i).addClass('show fade').removeClass('hide');
	}

	function setRegularText() {
		navigationItems.removeClass('navigation__link_bold');
	}

	function setBoldText(i = 0) {
		navigationItems.eq(i).addClass('navigation__link_bold');
	}

	hideContent();
	showContent();
	setRegularText();
	setBoldText();

	navigationList.on('click', '.navigation__link', function () {
		let target = $(this);
		navigationItems.each(function (i) {
			if (target.is($(this))) {
				hideContent();
				showContent(i);
				setRegularText();
				setBoldText(i);
			}
		});
	});

	function rollUpBlock(block) {
		block.each(function (i) {
			if (i >= 2) {
				$(this).css('display', 'none').removeClass('fade');
			}
		});
	}

	function expandBlock(block) {
		block.css('display', 'block').addClass('fade');
	}

	function changeTextBtn(btnText) {
		if (btnText.text() === 'Показать полностью') {
			btnText.text('Свернуть');
		} else {
			btnText.text('Показать полностью');
		}
	}

	function checkHeightContent(content, rollup = false) {
		if (content.height() >= 834 && rollup) {
			content.css('paddingBottom', '30px');
		} else {
			content.css('paddingBottom', '0px');
		}
	}
	checkHeightContent(mainContent);

	function getElementContent(btns, skills, experience, mainContent) {
		const state = {
			skills: false,
			experience: false,
		};

		rollUpBlock(skills);
		rollUpBlock(experience);

		btns.each(function () {
			$(this).on('click', function () {
				let target = $(this);
				if (target.hasClass('btn-experience')) {
					if (state.experience) {
						rollUpBlock(experience);
						changeTextBtn(target);
						checkHeightContent(mainContent, false);
					} else {
						expandBlock(experience);
						changeTextBtn(target);
						checkHeightContent(mainContent, true);
					}
					state.experience = !state.experience;
				} else if (target.hasClass('btn-skills')) {
					if (state.skills) {
						rollUpBlock(skills);
						changeTextBtn(target);
						checkHeightContent(mainContent, false);
					} else {
						expandBlock(skills);
						changeTextBtn(target);
						checkHeightContent(mainContent, true);
					}
					state.skills = !state.skills;
				}
			});
		});
	}
	getElementContent(btnShowCards, skillsCards, experienceCards, mainContent);
});
