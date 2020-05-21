module.exports = function(plop) {
	plop.setHelper('log', function(text) {
		console.log(text)
	})

	plop.setGenerator('project', {
		description: 'Обновление файла package.json',
		prompts: [
		    {
				type: 'input',
				name: 'project_name',
				default: 'site-wireframe',
				message: 'Введите название проекта(допустимые символы [a-z_-])'
		    },
			{
				type: 'input',
				name: 'site_name',
				message: 'Введите название сайта'
		    },
			{
				type: 'input',
				name: 'project_description',
				message: 'Введите описание проекта'
		    },
			{
				type: 'input',
				name: 'project_version',
				message: 'Укажите версию проекта'
		    },
			{
				type: 'input',
				name: 'git_rep',
				message: 'Укажите ссылку на Git репозиторий'
		    },
			{
				type: 'input',
				name: 'author',
				message: 'Автор проекта'
		    },
			{
				type: 'input',
				name: 'license',
				message: 'Укажите лицензию проекта'
		    },
			{
				type: 'input',
				name: 'home_page',
				message: 'Укажите ссылку на домашнюю страницу'
		    }
		],
		actions: [
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(site_name)/gi,
				template: '{{site_name}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(project_name)/gi,
				template: '{{project_name}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(project_description)/gi,
				template: '{{project_description}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(0.0.0)/gi,
				template: '{{project_version}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(git_url_repository)/gi,
				template: '{{git_rep}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(author_project)/gi,
				template: '{{author}}'
			},
			{
				type: 'modify',
				path: '../../package.json',
				pattern: /(home_page_url)/gi,
				template: '{{home_page}}'
			}
		]
	})
}

// plop --plopfile generators/index.js