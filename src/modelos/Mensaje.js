export default class Mensaje {
    #id
    #tipo;
    #text;
    #fyh;
    #email;

    constructor({ id, email, text, fyh, tipo }) {
        this.id = id;
        this.email = email;
        this.text = text;
        this.fyh = fyh;
        this.tipo = tipo
    }

    get id() { return this.#id }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido');
        this.#id = id;
    }

    get email() { return this.#email }

    set email(email) {
        if (!email) throw new Error('"email" es un campo requerido');
        this.#email = email;
    }

    get text() { return this.#text }

    set text(text) {
        if (!text) throw new Error('"text" es un campo requerido');
        this.#text = text;
    }

    get fyh() { return this.#fyh }

    set fyh(fyh) {
        if (!fyh) throw new Error('"fyh" es un campo requerido');
        this.#fyh = fyh;
    }

    get tipo() { return this.#tipo }

    set tipo(tipo) {
        if (!tipo) throw new Error('"tipo" es un campo requerido');
        this.#tipo = tipo;
    }

}