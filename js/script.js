window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	const navigationList = document.querySelector('.navigation__list');
	const navigationItems = document.querySelectorAll('.navigation__link')
	const mainContent = document.querySelector('.main__content');

	// Main content
	async function viewHtmlContent(url) {
		try {
			const response = await fetch(url);
			const html = await response.text();
			mainContent.innerHTML = html;
			const btn = mainContent.querySelector('.main__btn');
			const cardsSkills = mainContent.querySelectorAll('.main__skills-card');
			const cardsExperience = mainContent.querySelectorAll('.main__experience-card');
			getElementContent(btn, cardsSkills, cardsExperience, mainContent);

		} catch (error) {
			console.log('Ошибка при загрузке содержимого:', error);
		}
	}
	viewHtmlContent('../about.html');



	function hideContent(content) {
		Array.from(content).forEach((item, i) => {
			if (i >= 2) item.style.display = 'none';
		});
	}

	function showContent(content) {
		Array.from(content).forEach(item => item.style.display = 'block');
	}

	function changeContentBtn(btnText) {
		if (btnText.textContent === 'Показать полностью') {
			btnText.textContent = 'Свернуть';
		} else {
			btnText.textContent = 'Показать полностью';
		}
	}

	function getElementContent(btn, skills, experience, mainContent) {
		const state = {
			skills: false,
			experience: false,
		};

		hideContent(skills);
		hideContent(experience);

		if (btn === null) return;

		btn.addEventListener('click', (e) => {
			let target = e.target;
			if (target && target.classList.contains('btn-experience')) {
				if (state.experience) {
					hideContent(experience);
					changeContentBtn(btn);
					checkHeightContent(mainContent);
				} else {
					showContent(experience);
					changeContentBtn(btn);
					checkHeightContent(mainContent);
				}
				state.experience = !state.experience;
			} else if (target && target.classList.contains('btn-skills')) {
				if (state.skills) {
					hideContent(skills);
					changeContentBtn(btn);
					checkHeightContent(mainContent);
				} else {
					showContent(skills);
					changeContentBtn(btn);
					checkHeightContent(mainContent);
				}
				state.skills = !state.skills;
			}
		});
	}

	navigationList.addEventListener('click', (e) => {
		const target = e.target;

		if (target && target.classList.contains('navigation__link')) {
			navigationItems.forEach(item => item.classList.remove('navigation__link_bold'))
			target.classList.add('navigation__link_bold');
		}

		if (target && target.classList.contains('about')) {
			viewHtmlContent('../about.html');
		} else if (target && target.classList.contains('experience')) {
			viewHtmlContent('../experience.html');
		} else if (target && target.classList.contains('skills')) {
			viewHtmlContent('../skills.html');
		}
	});

	function checkHeightContent(content) {
		if (content.offsetHeight >= 834) {
			content.style.paddingBottom = '30px';
		} else {
			content.style.paddingBottom = '0px';
		}
	}
	checkHeightContent(mainContent);

});


