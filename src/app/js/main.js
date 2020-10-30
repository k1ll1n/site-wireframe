import $ from 'jquery'

import {Test} from './test'
import {set100vh} from './utils/100vh'

$(document).ready(() => {
	set100vh()

	const t = new Test('hello')
	t.showMessage()
})