$(document).ready(function () {
	'use strict';

	const $navigationList = $('.navigation__list');
	const $mainContent = $('.main__content');

	async function viewHtmlContent(url) {
		try {
			const response = await fetch(url);
			const html = await response.text();
			$mainContent.html(html);
			const $btn = $mainContent.find('.main__btn');
			const $cardsSkills = $mainContent.find('.main__skills-card');
			const $cardsExperience = $mainContent.find('.main__experience-card');
			getElementContent($btn, $cardsSkills, $cardsExperience);

		} catch (error) {
			console.log('Ошибка при загрузке содержимого:', error);
		}
	}
	viewHtmlContent('../about.html');

	function hideContent($content) {
		$content.each((i, item) => {
			if (i >= 2) $(item).css('display', 'none');
		});
	}

	function showContent($content) {
		$content.css('display', 'block');
	}

	function changeContentBtn($btn) {
		if ($btn.text() === 'Показать полностью') {
			$btn.text('Свернуть');
		} else {
			$btn.text('Показать полностью');
		}
	}

	function getElementContent($btn, $skills, $experience) {
		const state = {
			skills: false,
			experience: false,
		};

		hideContent($skills);
		hideContent($experience);

		if ($btn.length === 0) return;

		$btn.on('click', function () {
			let $target = $(this);
			if ($target.hasClass('btn-experience')) {
				if (state.experience) {
					hideContent($experience);
					changeContentBtn($btn);
					checkHeightContent();
				} else {
					showContent($experience);
					changeContentBtn($btn);
					checkHeightContent();
				}
				state.experience = !state.experience;
			} else if ($target.hasClass('btn-skills')) {
				if (state.skills) {
					hideContent($skills);
					changeContentBtn($btn);
					checkHeightContent();
				} else {
					showContent($skills);
					changeContentBtn($btn);
					checkHeightContent();
				}
				state.skills = !state.skills;
			}
		});
	}

	$navigationList.on('click', '.navigation__link', function () {
		let $target = $(this);
		$('.navigation__link').removeClass('navigation__link_bold');
		$target.addClass('navigation__link_bold');

		if ($target.hasClass('about')) {
			viewHtmlContent('../about.html');
		} else if ($target.hasClass('experience')) {
			viewHtmlContent('../experience.html');
		} else if ($target.hasClass('skills')) {
			viewHtmlContent('../skills.html');
		}
	});

	function checkHeightContent() {
		if ($mainContent.outerHeight() >= 834) {
			$mainContent.css('paddingBottom', '30px');
		} else {
			$mainContent.css('paddingBottom', '0px');
		}
	}
	checkHeightContent();
});
