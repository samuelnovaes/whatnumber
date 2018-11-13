const fs = require('fs-extra')
const mnist = require('mnist')
const crossValidate = require('./cross-validate')
const testSet = mnist.set(0, 300).test //300 imagens para teste
const chalk = require('chalk')
const _ = require('lodash')

fs.readJSON('network.json', (err, json) => {
	if (err) throw err
	const network = crossValidate.fromJSON(json)

	//Filtrando 10 imagens aleatórias diferentes do conjunto de 300
	const indexes = []
	while(indexes.length < 10){
		const index = _.random(0, testSet.length - 1)
		if(!indexes.includes(index)) indexes.push(index)
	}

	indexes.forEach(i => {
		const results = network.run(testSet[i].input)
		const index = results.indexOf(Math.max(...results))
		const expected = testSet[i].output.indexOf(1)
		console.log(_.chunk(testSet[i].input, 28).map(i => i.map(j => {
			const shade = 255 - Math.round(j * 255)
			return chalk.rgb(shade, shade, shade)('█')
		}).join('')).join('\n'))
		console.log(`Resposta: ${index} (${(results[index] * 100).toFixed(2)}%)`)
		console.log(`Esperado: ${expected}`)
		console.log()
	})
})