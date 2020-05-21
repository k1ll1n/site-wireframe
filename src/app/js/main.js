import $ from 'jquery'

import {Test} from './test'
import {Burger} from './custom-ui/burger'
import {FloatContainer} from './custom-ui/float-container'

$(document).ready(() => {
	const t = new Test('hello')
	t.showMessage()

	const burger = new Burger('.burger')
	const floatContainer = new FloatContainer(
		'.float-container',
		'.float-header'
	)

	burger.init(null, () => {
		floatContainer.openClose()
	})

	floatContainer.init(null, () => {
		burger.openClose()
	})
})