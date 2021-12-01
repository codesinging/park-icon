const path = require('path')
const fs = require('fs')
const del = require('del')

const iconPark = require('@icon-park/svg')

class Builder {
    prefix = 'ParkIcon'

    successCount = 0
    failedCount = 0

    successComponents = []
    failedComponents = []

    baseDir = ''
    srcDir = ''
    stubDir = ''

    constructor() {
        this.baseDir = path.resolve(__dirname, '../..')
        this.srcDir = path.join(this.baseDir, 'src')
        this.stubDir = path.join(this.srcDir, 'builder', 'stubs')
    }

    clean() {
        del.sync(path.join(this.srcDir, 'components', '*'))
        del.sync(path.join(this.srcDir, 'list.js'))
        del.sync(path.join(this.srcDir, 'index.js'))
    }

    getList() {
        let list = Object.keys(iconPark)
        list.splice(0, 2)
        return list
    }

    getSvg(name) {
        let svg = iconPark[name]
        return svg ? svg({}) : ''
    }

    getStub(name) {
        return fs.readFileSync(path.resolve(this.stubDir, name)).toString()
    }

    createBuilder(name) {
        let svg = this.getSvg(name)
        if (!svg) {
            return false
        }

        let template = svg
            .replace('<?xml version="1.0" encoding="UTF-8"?>', '')
            .replace('width="1em"', ':width="size"')
            .replace('height="1em"', ':height="size"')
            .replace(/stroke="currentColor"/g, ':stroke="color"')
            .replace(/fill="currentColor"/g, ':fill="color"')
            .replace(/stroke-width="4"/g, ':stroke-width="strokeWidth"')

        let saveName = name
        let componentName = this.prefix + saveName
        let componentContent = this.getStub('component.vue')
            .replace('__NAME__', componentName)
            .replace('<div>__SVG__</div>', template)

        return {
            name,
            saveName,
            componentName,
            svg,
            componentContent,
        }
    }

    createComponent(name) {
        let builder = this.createBuilder(name)

        if (builder) {
            const componentFilename = path.join(this.baseDir, 'components', 'icons', builder.componentName + '.vue')

            fs.writeFileSync(componentFilename, builder.componentContent)
            console.log('Created component: ' + builder.componentName)
            this.successCount++
            this.successComponents.push(builder)
        } else {
            this.failedCount++
            this.failedComponents.push(name)
            console.log('Failed to create: ' + name)
        }
    }

    createComponents() {
        this.getList().forEach(name => this.createComponent(name))
    }

    createList() {
        let indexes = this.successComponents.map(item => `"${item.saveName}"`).join(",\n    ")
        let content = this.getStub('list.js')
            .replace('__ICONS__', indexes)
        let filename = path.join(this.baseDir, 'components', 'list.js')

        fs.writeFileSync(filename, content)
        console.log('Created list: ' + filename)
    }

    printResult() {
        console.log(`Creation result: ${this.successCount} successes, ${this.failedCount} errors`)

        if (this.failedCount) {
            console.log('Component failed: ', this.failedComponents)
        }
    }
}

module.exports = new Builder()