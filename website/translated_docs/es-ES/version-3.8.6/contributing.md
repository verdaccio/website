---
id: version-3.8.6-contributing
title: Contribuyendo en Verdaccio
original_id: contributing
---

First of all 👏👏 thanks for visiting this page, for us means you are willing contribute to `verdaccio` and we are happy for that. saltar en un código desconocido no es tarea fácil, pero estamos aquí para ayudarte.

## Canales de Comunicación

Si estas deseando por hacer preguntas, nosotros tenemos dos canales para discusiones:

* [Public Discord channel](http://chat.verdaccio.org/)

## Empezando

A primera vista verdaccio es un solo repositorio, pero hay muchas mas formas en las que podrías contribuir y una gran variedad de tecnologías en las que practicar.

### Encontrando mi lugar

Todos tenemos diferentes habilidades, así que, vamos a ver donde podrías sentirte cómodo.

### Se o quiero aprender Node.js

Node.js es la base de `verdaccio`, usamos librerías como `express`, `commander`, `request` o ` async`. Verdaccio es básicamente un API REST para crear comunicación con clientes `npm` compatibles, como ` yarn`.

Tenemos una larga [lista de plugins](plugins.md) que pueden ser usados y mejorados, pero al mismo tiempo [tu podrías crear el tuyo propio](dev-plugins.md).

### Preferiría trabajar en el Interfaz de Usuario

Recently we have moved to modern techonologies as `React` and `element-react`. We are looking forward to see new ideas how to improve the UI.

### Me siento más cómodo mejorado el stack

Por su puesto, estaríamos muy felices que nos ayudaras a mejorar el stack, puedes actualizar dependencias como `eslint`, `stylelint` o `webpack`. You might merely improve the `webpack` configuration would be great. Cualquier sugerencia es bienvenida. Ademas si quieres mejorar tu experiencia con**Yeoman** podrías ayudarnos con [verdaccio generator](https://github.com/verdaccio/generator-verdaccio-plugin).

Aquí algunas ideas:

* Crear un paquete común de de reglas eslint que podrían ser usados en todas nuestras dependencias o extensiones
* Mejorar las definiticiones de tipado en Flow
* Migrar a Webpack 4
* Mejorar el hot reload con webpack
* Usamos babel y webpack a lo largo de todas las dependencias, porque uno un preset en común?
* Mejorar la entrega vía integración continua

### Soy bueno con la Documentación

Muchos colaboradores encuentras faltas o errores gramaticales, eso también podría ser de ayuda para mejorar la experiencia de resolución de problemas.

### Soy Diseñador

Tenemos un sitio web <http://www.verdaccio.org/> y estaríamos muy felices de ver tus ideas.

Nuestro sitio web esta basado en [ Docusaurus](https://docusaurus.io/).

### Soy DevOps

Tenemos una imagen muy popular en Docker <https://hub.docker.com/r/verdaccio/verdaccio/> que necesita mantenimiento y muy seguramente mejoras, necesitamos tu conocimiento para el beneficio de todos los usuarios.

Ofrecemos soporte para ** Kubernetes**, **Puppet**, **Ansible** y **Chef** y necesitamos ayuda en esos campos, siéntete libre de ver todos los repositorios.

### Puedo hacer traduciones

Verdaccio tiene como objetivo ser multilenguaje, con el fin de conseguirlo **tenemos el soporte** de [ Crowdin](https://crowdin.com) que es una plataforma increíble de traducciones.

<img src="https://d3n8a8pro7vhmx.cloudfront.net/uridu/pages/144/attachments/original/1485948891/Crowdin.png" width="400px" />

Tenemos configurado un sitio donde puedes elegir tu idioma favorito, si no encuentras tu idioma siéntete libre de pedirlo [creando un ticket](https://github.com/verdaccio/verdaccio/issues/new).

[Ir a Crowdin Verdaccio](https://crowdin.com/project/verdaccio)

## Estoy listo para contribuir

Si estas pensando *"Ya vi todos los [repositorios](repositories.md) y estoy deseando contribuir ahora mismo"* y tengo buenas noticias para tu, ese el siguiente paso.

Primero necesitaras aprender como construir el proyecto, [nosotros hemos preparados uan guia justo para eso](build.md).

Una vez has revisado todos los script y sabes como usarlos, estamos listos para ir al siguiente paso, ejecutar [**los test unitarios**](test.md).

## Full list of contributors. We want to see your face here !

<a href="graphs/contributors"><img src="https://opencollective.com/verdaccio/contributors.svg?width=890&button=false" /></a>
