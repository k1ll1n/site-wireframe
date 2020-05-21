import {observable, autorun} from 'mobx'

export class FloatContainer {
	constructor(containerSelector, closeSelector) {
		this._openEl = document.querySelector(containerSelector)
		this._closeEl = document.querySelector(closeSelector)
		this._init = false
		this._floatContainer = observable({
			isOpen: 'no',
			openClose() {
				this.isOpen = this.isOpen === 'yes' ? 'no' : 'yes'
			}
		})

		autorun(() => {
			const state = this._floatContainer.isOpen
			if (!this._init) {
				this._init = true
			} else {
				this._openEl.setAttribute('show', state)
			}
		})
	}

	openClose() {
		this._floatContainer.openClose()
	}

	init(beforeAction = null, afterAction = null) {
		this._closeEl.addEventListener('click', () => {
			if (beforeAction !== null) {
				beforeAction()
			}
			this._floatContainer.openClose()
			if (afterAction !== null) {
				afterAction()
			}
		})
	}
}