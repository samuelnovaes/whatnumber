const brain = require('brain.js')

module.exports = new brain.CrossValidate(brain.NeuralNetwork, {
	inputSize: 784,
	hiddenLayers: [100],
	outputSize: 10
})