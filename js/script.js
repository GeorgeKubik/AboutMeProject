window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const navigationList = document.querySelector('.navigation__list');
	const navigationItems = document.querySelectorAll('.navigation__link');
	const mainSection = document.querySelectorAll('.main__content-block');
	const mainContent = document.querySelector('.main__content');

	const experienceCards = document.querySelectorAll('.main__experience-card');
	const skillsCards = document.querySelectorAll('.main__skills-card');
	const btnShowCards = document.querySelectorAll('.main__btn');


	function hideContent() {
		mainSection.forEach(content => {
			content.classList.add('hide');
			content.classList.remove('show', 'fade');
		});
	}

	function showContent(i = 0) {
		mainSection[i].classList.add('show', 'fade');
		mainSection[i].classList.remove('hide');
	}

	function setRegularText() {
		navigationItems.forEach(item => {
			item.classList.remove('navigation__link_bold');
		})
	}

	function setBoldText(i = 0) {
		navigationItems[i].classList.add('navigation__link_bold');
	}

	hideContent();
	showContent();
	setRegularText();
	setBoldText();


	navigationList.addEventListener('click', (e) => {
		const target = e.target;
		if (target && target.classList.contains('navigation__link')) {
			navigationItems.forEach((item, i) => {
				if (target === item) {
					hideContent();
					showContent(i);
					setRegularText();
					setBoldText(i);
				}
			})
		}
	})

	function rollUpBlock(block) {
		Array.from(block).forEach((block, i) => {
			if (i >= 2) {
				block.style.display = 'none';
				block.classList.remove('fade');
			}
		})
	}

	function expandBlock(block) {
		Array.from(block).forEach(block => {
			block.style.display = 'block';
			block.classList.add('fade');
		})
	}

	function changeTextBtn(btnText) {
		if (btnText.textContent === 'Показать полностью') {
			btnText.textContent = 'Свернуть';
		} else {
			btnText.textContent = 'Показать полностью';
		}
	}

	function checkHeightContent(content, rollup = false) {
		if (content.offsetHeight >= 834 && rollup) {
			content.style.paddingBottom = '30px';
		} else {
			content.style.paddingBottom = '0px';
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

		if (btns === null) return;

		btns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				let target = e.target;
				if (target && target.classList.contains('btn-experience')) {
					if (state.experience) {
						rollUpBlock(experience);
						changeTextBtn(btn);
						checkHeightContent(mainContent, false);
					} else {
						expandBlock(experience);
						changeTextBtn(btn);
						checkHeightContent(mainContent, true);
					}
					state.experience = !state.experience;
				} else if (target && target.classList.contains('btn-skills')) {
					if (state.skills) {
						rollUpBlock(skills);
						changeTextBtn(btn);
						checkHeightContent(mainContent, false);
					} else {
						expandBlock(skills);
						changeTextBtn(btn);
						checkHeightContent(mainContent, true);
					}
					state.skills = !state.skills;
				}
			});
		})
	}
	getElementContent(btnShowCards, skillsCards, experienceCards, mainContent);

});


