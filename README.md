# Cita AutoComplete

Auto-complete the сita receiving form on site https://sede.administracionespublicas.gob.es/ for fingerprinting.

*Receiving an invitation to the police (known as a «cita») to get a TIE card has become a nightmare. As long as you fill out the form by hand, all invitations are gone. And in some fields, it's even forbidden to use an autofill option.
So I had to quickly develop a script to make it easier.*

## Getting Started

Install the plugin to run custom userscripts, and copy the file content as a new script.

### Prerequisites

To use this script you need to first install a user script manager. Which user script manager you can use depends on which browser you use:
* Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
* Firefox: [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/), or [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
* Microsoft Edge: [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)
* Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari)
* Opera: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/) or [Violentmonkey](https://addons.opera.com/extensions/details/violent-monkey/)

```
Tested only in Firefox and Chrome with Tampermonkey, but should work fine
```

### Installing

Create a new blank script, and copy content of the [CitaAutoComplete.user.js](CitaAutoComplete.user.js) into it. Save result and enjoy!

For getting TIE card use [TieReceiveCitaAutoComplete.user.js](TieReceiveCitaAutoComplete.user.js)

You can find some IDs which can be useful for filling constants in [RequiredIDs.md](RequiredIDs.md)


## Author

* **Andrey Luzhin**

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details
