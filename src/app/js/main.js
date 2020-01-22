import $ from 'jquery'

import {Test} from './test'

$(document).ready(() => {
	const t = new Test('hello')
	t.showMessage()

	/* Открытие Float-container'а */
	$('.show-float-container').click(() => {
		$('.float-container').attr('show', 'yes')
		$('.float-container.ss-content').animate({scrollTop: 0})
	})
	/* END */

	/* Закрытие Float-container'а */
	$('.float-container .float-header').click(() => {
		$('.float-container').attr('show', 'no')
	})
	/* END */

	$('.burger').click(openBurger())
	/* END */
})

/*
  * Нажатие бургера
  * @this относится к кнопке
  * */
function openBurger() {
	const val = $(this).attr('active') === 'yes' ? 'no' : 'yes'
	$(this).attr('active', val)
}