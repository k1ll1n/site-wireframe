module.exports = function(plop) {
	plop.setHelper('log', function(text) {
		console.log(text)
	})

	plop.setGenerator('layout', {
		description: 'Генерация шаблона',
		prompts: [
		    {
				type: 'input',
				name: 'layout_name',
				message: 'Введите название шаблона'
		    },
			{
				type: 'confirm',
				name: 'isNewHeader',
				message: 'Создать для этого шаблона новый header?'
		    },
			{
				type: 'confirm',
				name: 'isNewFooter',
				message: 'Создать для этого шаблона новый footer?'
		    }
		],
		actions: [
			{
				type: 'add',
				path: '../../src/app/layout/{{layout_name}}_layout.pug',
				templateFile: '../templates/layout/layout.hbs'
			},
			{
				type: 'add',
				path: '../../src/app/templates/default/{{layout_name}}_header.pug',
				templateFile: '../templates/layout/header.hbs',
				skip(data) {
					if (data.isNewHeader) return
					else return 'skip'
				}
			},
			{
				type: 'add',
				path: '../../src/app/templates/default/{{layout_name}}_footer.pug',
				templateFile: '../templates/layout/footer.hbs',
				skip(data) {
					if (data.isNewFooter) return
					else return 'skip'
				}
			}
		]
	})
	plop.setPartial('layoutName', '{{layout_name}}')
}

// plop --plopfile generators/index.js