# Memex

> A personal platform knowledge base system (memex); a personal, multi-device application to keep track of readings,
writings and research projects

> Note: there was a project named `diary` which was merged into this project (memex)

In the 1930s, [Vannevar Bush](https://en.wikipedia.org/wiki/Vannevar_Bush) described a "device in which an individual
stores all his books, records, and communications, and which is mechanized so that it may be consulted with exceeding
speed and flexibility. It is an enlarged intimate supplement to his memory." This project presents a software system
as a solution to such endeavor.

Memex (presented as Mem) is build upon a JavaScript stack, using Hapi as the web framework and Mongoose to create schemas,
work upon models and manage queries over MongoDB. In order to authenticate and authorize users, it uses
[earaujoassis/space](https://github.com/earaujoassis/space) as an OAuth 2.0 provider.

## Setup and running

Please make sure to create a `.env` file according to `.sample.env`. Once that is done:

```sh
$ npm install
$ npm install -g foreman
$ nf start
```

Warning: in order to authenticate users, you should setup an instance of the
[earaujoassis/space](https://github.com/earaujoassis/space) &mdash; OAuth 2.0 server/provider.

## Issues

Please take a look at [/issues](https://github.com/earaujoassis/memex/issues)

## License

Copyright &copy; 2016, Ewerton Assis. Free software distributed under the GNU AFFERO GPL, Version 3 (see LICENSE file).
All files located in the `node_modules` directory are externally maintained libraries used by this software which have
their own licenses; we recommend you read them, as their terms may differ from the terms of the GNU AFFERO GPL, Version 3.
