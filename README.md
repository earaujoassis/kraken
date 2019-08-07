# Kraken

> Kraken is a custom platform for personal knowledge management

Kraken was conceived as a conjuction between a previous project named `memex`, which is described as "A personal
platform knowledge base system (memex); a personal, multi-device application to keep track of readings, writings
and research projects". We added the file management into it in order to keep track of not only documents (from a
documents-store), but also files and other documents (like PDF, images etc). Another project also merged into this
one is `shortener`, which was intended to be a "URL Shortener" tool.

Kraken is a multi-service system; its back-end is written in Python, through Flask and Pymongo, and its front-end
is written in JavaScript, from the original Memex and Shortener projects. The back-end (`core`) is LICENSED under
the "MIT License" and the front-end (`memex`) is LICENSED under the "GNU AFFERO GPL, Version 3" and (`shortener`)
under the "MIT License". Please refer to each LICENSE file for more details.

## Memex

> A personal platform knowledge base system (memex); a personal, multi-device application to keep track of readings,
writings and research projects

> Note: there was a project named `diary` which was merged into this project (memex)

In the 1930s, [Vannevar Bush](https://en.wikipedia.org/wiki/Vannevar_Bush) described a "device in which an individual
stores all his books, records, and communications, and which is mechanized so that it may be consulted with exceeding
speed and flexibility. It is an enlarged intimate supplement to his memory." This project presents a software system
as a solution to such endeavor.

Memex (presented as Mem) is build upon a JavaScript stack, using Hapi as the web framework and Mongoose to create
schemas, work upon models and manage queries over MongoDB. In order to authenticate and authorize users, it uses
[earaujoassis/space](https://github.com/earaujoassis/space) as an OAuth 2.0 provider.

### Setup and running

Please make sure to create a `.env` file according to `.sample.env`. Once that is done:

```sh
$ npm install
$ npm install -g foreman
$ nf start
```

Warning: in order to authenticate users, you should setup an instance of the
[earaujoassis/space](https://github.com/earaujoassis/space) &mdash; OAuth 2.0 server/provider.

## Shortener

> A simple URL Shortener

## Issues

Please take a look at [/issues](https://github.com/earaujoassis/kraken/issues)

## License

[MIT License](http://earaujoassis.mit-license.org/) &copy; Ewerton Carlos Assis. [core/LICENSE](core/LICENSE)
file for more details.

Copyright &copy; 2016-present, Ewerton Carlos Assis. Free software distributed under the GNU AFFERO GPL, Version 3 (see
[memex/LICENSE](memex/LICENSE) file). All files located in the `memex/node_modules` directory are third-party libraries
used by this software which have their own licenses; we recommend you read them, as their terms may differ from the
terms of the GNU AFFERO GPL, Version 3.
