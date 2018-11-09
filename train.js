const fs = require('fs-extra')
const mnist = require('mnist')
const crossValidate = require('./cross-validate')
const trainingSet = mnist.set(300, 0).training

//5-fold
crossValidate.train(trainingSet, {
	errorThresh: .001,
	log: true,
	logPeriod: 1
}, 5)

fs.writeJSON('network.json', crossValidate.toJSON(), err => {
	if (err) throw err
	console.log('Rede neural treinada')
	console.log('Execute "npm test" para ver os resultados')
})
