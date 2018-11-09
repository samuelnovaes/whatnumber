const fs = require('fs-extra')
const mnist = require('mnist')
const crossValidate = require('./cross-validate')
const testSet = mnist.set(0, 20).test
const chalk = require('chalk')
const _ = require('lodash')

fs.readJSON('network.json', (err, json) => {
	if (err) throw err
	const network = crossValidate.fromJSON(json)
	testSet.forEach(image => {
		const results = network.run(image.input)
		const index = results.indexOf(Math.max(...results))
		const expected = image.output.indexOf(1)
		console.log(_.chunk(image.input, 28).map(i => i.map(j => {
			const shade = 255 - Math.round(j * 255)
			return chalk.rgb(shade, shade, shade)('█')
		}).join('')).join('\n'))
		console.log(`Resposta: ${index} (${(results[index] * 100).toFixed(2)}%)`)
		console.log(`Esperado: ${expected}`)
		console.log()
	})
})