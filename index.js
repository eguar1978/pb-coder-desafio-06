const fs = require('fs');

class Archivo {

    constructor(productos, ruta) {
        this.productos = productos;
        this.ruta = ruta;
    }

    async save(producto) {
        producto.id = this.productos.length + 1;
        this.productos.push(producto);

        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
        } catch (err) {
            throw new Error('No se pudo guardar el archivo');
        }
    }

    async read() {
        try {
            const archivo = await fs.promises.readFile(this.ruta);
            console.log(JSON.parse(archivo));
        } catch (err) {
            console.log('[]');
        }
    }

    async delete() {
        try {
            await fs.promises.unlink(this.ruta);
        } catch (err) {
            throw new Error('Imposible eliminar archivo');
        }
    }
}

const producto_01 = {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
};

const producto_02 = {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
};

const producto_03 = {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
};

let producto = new Archivo([], 'productos.txt');

producto.save(producto_01);
producto.save(producto_02);
producto.save(producto_03);

producto.read();

//producto.delete();