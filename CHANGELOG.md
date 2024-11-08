# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.0.2](https://github.com/Payadel/assert/compare/v1.0.1...v1.0.2) (2024-11-08)


### Development: CI/CD, Build, etc

* fix test in build-test.yml ([ade79b9](https://github.com/Payadel/assert/commit/ade79b9da07d69b5bc86dfc57e665f43e50bf10d))
* use `Payadel/inputs` in actions ([921b508](https://github.com/Payadel/assert/commit/921b5086cc7e23d294b6bec110e903da46f2e0a8))


### Fixes

* update packages ([507083c](https://github.com/Payadel/assert/commit/507083cfc0a66343c2ef51c3402e3d19d4cbc0d6))

### [1.0.1](https://github.com/Payadel/assert/compare/v1.0.0...v1.0.1) (2023-05-08)


### Refactors

* `mockError` ([57d2178](https://github.com/Payadel/assert/commit/57d2178142b5e0a3c40770e8e331a75f6488f1f5))


### Development: CI/CD, Build, etc

* update release action ([6aff55c](https://github.com/Payadel/assert/commit/6aff55c1cfb64a83c2c8e28156152e9b8b21078f))


### Documents

* add `Action Outputs` to README.md ([3d1cd47](https://github.com/Payadel/assert/commit/3d1cd471af203f1c2f08b36bbddee875f010da42))
* update README.md ([22950cd](https://github.com/Payadel/assert/commit/22950cde25b26209e02815b9e5e81bd6019dc276))
* update version in README.md ([f440fa3](https://github.com/Payadel/assert/commit/f440fa3a83ebc2a0cb16bfa8b1cf555856c2b96f))


### Fixes

* fix assert false and true type ([cd18629](https://github.com/Payadel/assert/commit/cd1862956f1b6ff82361c77aafe07c4cbe435e95))
* fix yaml validation and messages ([2d0577f](https://github.com/Payadel/assert/commit/2d0577f7be7c4b904f5de27b45788733e5681d69))

## 1.0.0 (2023-04-26)

### Features

* implement asserts
  functions ([94fadc6](https://github.com/Payadel/assert/commit/94fadc603d8db46ab95de68708dfdf444ba25cf2))
* implement controller
  functions ([13d7d1d](https://github.com/Payadel/assert/commit/13d7d1d02446e7cc6bb10526c956ae15273865b4))
* implement get inputs
  functions ([e313d24](https://github.com/Payadel/assert/commit/e313d24a9c3497abb8b37f70a42e98fd60988124))
* implement main runner ([5a1f85e](https://github.com/Payadel/assert/commit/5a1f85e468b1463e7ff6bc82e330aeb2181b494a))
* update output ([3705acf](https://github.com/Payadel/assert/commit/3705acfaae757b3ccdee1578abc49748aef54eeb))

### Fixes

* fix build-test.yml
  params ([927eb4b](https://github.com/Payadel/assert/commit/927eb4bf834ee5264c9ee5c7456ebde0170ee632))
* fix lint errors ([d10240f](https://github.com/Payadel/assert/commit/d10240fc24a1e412f966a2dd712da59ad231f619))
* rename `errors` output
  to `messages` ([27ae655](https://github.com/Payadel/assert/commit/27ae655c441527fc3e628c8a72371e2c2b2f6c96))
* return `messages` with json
  type ([18a54a8](https://github.com/Payadel/assert/commit/18a54a8b6caa947cd0f448f8e90a6ba7fc03cdb1))

### Tests

* update jest.config.js ([3df7d8f](https://github.com/Payadel/assert/commit/3df7d8f6fcd57812e7ef97fd89f74c56f5b23b7c))

### Refactors

* create utility.ts for
  tests ([7bd3fc6](https://github.com/Payadel/assert/commit/7bd3fc6e8ff601b57b106ab5e900d89c1aafd2a2))
* format codes ([461e821](https://github.com/Payadel/assert/commit/461e821240cc0b322a8e401e326ed535fc4dc7f2))
* rename `run`
  to `controller` ([8276be8](https://github.com/Payadel/assert/commit/8276be855690a1784d8808474a4bfad43368572b))

### Development: CI/CD, Build, etc

* add workflow_dispatch to
  build-test.yml ([8e99e46](https://github.com/Payadel/assert/commit/8e99e46d164f350620f545740236ae77d02f281a))
* check jest before push ([e6dd14b](https://github.com/Payadel/assert/commit/e6dd14bb92825b8e89889345d24b55b8b43c3fb6))
* remove excess deps in
  package.json ([1c6825f](https://github.com/Payadel/assert/commit/1c6825faff77340c5067fda88d564d8bd20b40bd))
* update build-test.yml ([ad349e6](https://github.com/Payadel/assert/commit/ad349e63d62f321333dd53cb04df2e7f9daf3a44))
* update git hook scripts ([ea30772](https://github.com/Payadel/assert/commit/ea3077249d1a84df3ddf8573425b2cf04fd3f12b))
* update package.json ([90f8e7a](https://github.com/Payadel/assert/commit/90f8e7aeabaacddbf51d5ee2d29ca8e72a6c389d))

### Documents

* add samples to
  README.md ([5c84f8f](https://github.com/Payadel/assert/commit/5c84f8f2f79445938d01b622734a21656fffa7d6))
* update CONTRIBUTING.md ([4721a79](https://github.com/Payadel/assert/commit/4721a7964f5993975625f143386d7390fd502abe))
* update README.md ([6dcd08c](https://github.com/Payadel/assert/commit/6dcd08c6f8a0d7538deabbf96b6cdfbe3663f929))
