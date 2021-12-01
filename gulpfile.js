const builder = require('./src/builder/builder')

exports.test = async () => {
    console.log(builder.getList())
}

exports.build = async() => {
    await builder.clean()
    await builder.createComponents()
    await builder.createList()
    await builder.printResult()
}