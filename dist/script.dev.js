"use strict";

var URL = require("./urls.js");

var puppeteer = require("puppeteer-extra");

var StealthPlugin = require("puppeteer-extra-plugin-stealth");

var fs = require("fs/promises");

puppeteer.use(StealthPlugin());

function start() {
  var browser, context, i, page, HTTPResponse, title, cookies, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, cookie;

  return regeneratorRuntime.async(function start$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false,
            channel: "chrome",
            args: ["--proxy-server=http://80.92.206.140:30207"],
            userDataDir: "C:/Users/shayan/AppData/Local/Google/Chrome/User Data/"
          }));

        case 3:
          browser = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(browser.createIncognitoBrowserContext());

        case 6:
          context = _context.sent;
          i = 0;

        case 8:
          if (!(i < 10)) {
            _context.next = 52;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(context.newPage());

        case 11:
          page = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(page["goto"](URL[i], {
            timeout: 100000
          }));

        case 14:
          HTTPResponse = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(page.title());

        case 17:
          title = _context.sent;
          console.log("title = ", title);
          if (!title) i--; // await page.waitForTimeout(10000);

          _context.next = 22;
          return regeneratorRuntime.awrap(page.cookies());

        case 22:
          cookies = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 26;
          _iterator = cookies[Symbol.iterator]();

        case 28:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 35;
            break;
          }

          cookie = _step.value;
          _context.next = 32;
          return regeneratorRuntime.awrap(page.deleteCookie(cookie));

        case 32:
          _iteratorNormalCompletion = true;
          _context.next = 28;
          break;

        case 35:
          _context.next = 41;
          break;

        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](26);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 41:
          _context.prev = 41;
          _context.prev = 42;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 44:
          _context.prev = 44;

          if (!_didIteratorError) {
            _context.next = 47;
            break;
          }

          throw _iteratorError;

        case 47:
          return _context.finish(44);

        case 48:
          return _context.finish(41);

        case 49:
          i++;
          _context.next = 8;
          break;

        case 52:
          _context.next = 57;
          break;

        case 54:
          _context.prev = 54;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1.message);

        case 57:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 54], [26, 37, 41, 49], [42,, 44, 48]]);
}

start();