/*

 /l10n/packages.js is a mandatory file. It is used by /lib/l10n.js

 In module.exports must return a list of all language packs you want to be available in the application

 Format:

 module.exports = {
 <lang_code>: {
 <string_key + optional_index>: <localized string>,
 ...
 },
 ...
 }

 <optional_index> is used to provide different translations for the same string, if needed

 Please, put whatever you have under <lang_code> into separate language pack file

 */

// @todo "magic" file / folder

module.exports = {
    'ru_ru': require('./ru_ru')
}
