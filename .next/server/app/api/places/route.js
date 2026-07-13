/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/places/route";
exports.ids = ["app/api/places/route"];
exports.modules = {

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fplaces%2Froute&page=%2Fapi%2Fplaces%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fplaces%2Froute.ts&appDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fplaces%2Froute&page=%2Fapi%2Fplaces%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fplaces%2Froute.ts&appDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_Projects_Assignment_TS_01_shobuj_bangla_app_api_places_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/places/route.ts */ \"(rsc)/./app/api/places/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/places/route\",\n        pathname: \"/api/places\",\n        filename: \"route\",\n        bundlePath: \"app/api/places/route\"\n    },\n    resolvedPagePath: \"E:\\\\Projects\\\\Assignment-TS-01\\\\shobuj-bangla\\\\app\\\\api\\\\places\\\\route.ts\",\n    nextConfigOutput,\n    userland: E_Projects_Assignment_TS_01_shobuj_bangla_app_api_places_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwbGFjZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnBsYWNlcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnBsYWNlcyUyRnJvdXRlLnRzJmFwcERpcj1FJTNBJTVDUHJvamVjdHMlNUNBc3NpZ25tZW50LVRTLTAxJTVDc2hvYnVqLWJhbmdsYSU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9RSUzQSU1Q1Byb2plY3RzJTVDQXNzaWdubWVudC1UUy0wMSU1Q3Nob2J1ai1iYW5nbGEmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ3lCO0FBQ3RHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob2J1ai1iYW5nbGEvPzU2NDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkU6XFxcXFByb2plY3RzXFxcXEFzc2lnbm1lbnQtVFMtMDFcXFxcc2hvYnVqLWJhbmdsYVxcXFxhcHBcXFxcYXBpXFxcXHBsYWNlc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcGxhY2VzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvcGxhY2VzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wbGFjZXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJFOlxcXFxQcm9qZWN0c1xcXFxBc3NpZ25tZW50LVRTLTAxXFxcXHNob2J1ai1iYW5nbGFcXFxcYXBwXFxcXGFwaVxcXFxwbGFjZXNcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fplaces%2Froute&page=%2Fapi%2Fplaces%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fplaces%2Froute.ts&appDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/places/route.ts":
/*!*********************************!*\
  !*** ./app/api/places/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/mongodb */ \"(rsc)/./lib/mongodb.ts\");\n\n\nasync function GET() {\n    try {\n        const collection = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.getPlacesCollection)();\n        const places = await collection.find({}).sort({\n            createdAt: -1\n        }).toArray();\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            places\n        });\n    } catch (error) {\n        console.error(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Failed to fetch places\"\n        }, {\n            status: 500\n        });\n    }\n}\nasync function POST(request) {\n    try {\n        const body = await request.json();\n        const collection = await (0,_lib_mongodb__WEBPACK_IMPORTED_MODULE_1__.getPlacesCollection)();\n        const place = {\n            ...body,\n            createdAt: new Date(),\n            updatedAt: new Date()\n        };\n        const result = await collection.insertOne(place);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            place: {\n                ...place,\n                _id: result.insertedId\n            }\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: \"Failed to save place\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3BsYWNlcy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ1M7QUFFN0MsZUFBZUU7SUFDcEIsSUFBSTtRQUNGLE1BQU1DLGFBQWEsTUFBTUYsaUVBQW1CQTtRQUM1QyxNQUFNRyxTQUFTLE1BQU1ELFdBQVdFLElBQUksQ0FBQyxDQUFDLEdBQUdDLElBQUksQ0FBQztZQUFFQyxXQUFXLENBQUM7UUFBRSxHQUFHQyxPQUFPO1FBRXhFLE9BQU9SLHFEQUFZQSxDQUFDUyxJQUFJLENBQUM7WUFBRUMsU0FBUztZQUFNTjtRQUFPO0lBQ25ELEVBQUUsT0FBT08sT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUNBO1FBQ2QsT0FBT1gscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU9HLFNBQVM7UUFBeUIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDaEc7QUFDRjtBQUVPLGVBQWVDLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELFFBQVFQLElBQUk7UUFDL0IsTUFBTU4sYUFBYSxNQUFNRixpRUFBbUJBO1FBRTVDLE1BQU1pQixRQUFRO1lBQ1osR0FBR0QsSUFBSTtZQUNQVixXQUFXLElBQUlZO1lBQ2ZDLFdBQVcsSUFBSUQ7UUFDakI7UUFFQSxNQUFNRSxTQUFTLE1BQU1sQixXQUFXbUIsU0FBUyxDQUFDSjtRQUUxQyxPQUFPbEIscURBQVlBLENBQUNTLElBQUksQ0FBQztZQUFFQyxTQUFTO1lBQU1RLE9BQU87Z0JBQUUsR0FBR0EsS0FBSztnQkFBRUssS0FBS0YsT0FBT0csVUFBVTtZQUFDO1FBQUUsR0FBRztZQUFFVixRQUFRO1FBQUk7SUFDekcsRUFBRSxPQUFPSCxPQUFPO1FBQ2RDLFFBQVFELEtBQUssQ0FBQ0E7UUFDZCxPQUFPWCxxREFBWUEsQ0FBQ1MsSUFBSSxDQUFDO1lBQUVDLFNBQVM7WUFBT0csU0FBUztRQUF1QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM5RjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hvYnVqLWJhbmdsYS8uL2FwcC9hcGkvcGxhY2VzL3JvdXRlLnRzPzJhNDYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IGdldFBsYWNlc0NvbGxlY3Rpb24gfSBmcm9tIFwiQC9saWIvbW9uZ29kYlwiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGF3YWl0IGdldFBsYWNlc0NvbGxlY3Rpb24oKTtcclxuICAgIGNvbnN0IHBsYWNlcyA9IGF3YWl0IGNvbGxlY3Rpb24uZmluZCh7fSkuc29ydCh7IGNyZWF0ZWRBdDogLTEgfSkudG9BcnJheSgpO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHBsYWNlcyB9KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJGYWlsZWQgdG8gZmV0Y2ggcGxhY2VzXCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG4gICAgY29uc3QgY29sbGVjdGlvbiA9IGF3YWl0IGdldFBsYWNlc0NvbGxlY3Rpb24oKTtcclxuXHJcbiAgICBjb25zdCBwbGFjZSA9IHtcclxuICAgICAgLi4uYm9keSxcclxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxyXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCksXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGNvbGxlY3Rpb24uaW5zZXJ0T25lKHBsYWNlKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwbGFjZTogeyAuLi5wbGFjZSwgX2lkOiByZXN1bHQuaW5zZXJ0ZWRJZCB9IH0sIHsgc3RhdHVzOiAyMDEgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHNhdmUgcGxhY2VcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZ2V0UGxhY2VzQ29sbGVjdGlvbiIsIkdFVCIsImNvbGxlY3Rpb24iLCJwbGFjZXMiLCJmaW5kIiwic29ydCIsImNyZWF0ZWRBdCIsInRvQXJyYXkiLCJqc29uIiwic3VjY2VzcyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJwbGFjZSIsIkRhdGUiLCJ1cGRhdGVkQXQiLCJyZXN1bHQiLCJpbnNlcnRPbmUiLCJfaWQiLCJpbnNlcnRlZElkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/places/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getItemsCollection: () => (/* binding */ getItemsCollection),\n/* harmony export */   getMongoClient: () => (/* binding */ getMongoClient),\n/* harmony export */   getPlacesCollection: () => (/* binding */ getPlacesCollection)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst uri = process.env.MONGODB_URI || \"mongodb://127.0.0.1:27017/shobuj-bangla\";\nconst dbName = process.env.MONGODB_DB || \"shobuj-bangla\";\nlet cachedClientPromise = null;\nasync function getMongoClient() {\n    if (!cachedClientPromise) {\n        cachedClientPromise = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri).connect();\n    }\n    return cachedClientPromise;\n}\nasync function getPlacesCollection() {\n    const client = await getMongoClient();\n    return client.db(dbName).collection(\"places\");\n}\nasync function getItemsCollection() {\n    const client = await getMongoClient();\n    return client.db(dbName).collection(\"items\");\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFzQztBQUV0QyxNQUFNQyxNQUFNQyxRQUFRQyxHQUFHLENBQUNDLFdBQVcsSUFBSTtBQUN2QyxNQUFNQyxTQUFTSCxRQUFRQyxHQUFHLENBQUNHLFVBQVUsSUFBSTtBQUV6QyxJQUFJQyxzQkFBbUQ7QUFFaEQsZUFBZUM7SUFDcEIsSUFBSSxDQUFDRCxxQkFBcUI7UUFDeEJBLHNCQUFzQixJQUFJUCxnREFBV0EsQ0FBQ0MsS0FBS1EsT0FBTztJQUNwRDtJQUVBLE9BQU9GO0FBQ1Q7QUFFTyxlQUFlRztJQUNwQixNQUFNQyxTQUFTLE1BQU1IO0lBQ3JCLE9BQU9HLE9BQU9DLEVBQUUsQ0FBQ1AsUUFBUVEsVUFBVSxDQUFDO0FBQ3RDO0FBRU8sZUFBZUM7SUFDcEIsTUFBTUgsU0FBUyxNQUFNSDtJQUNyQixPQUFPRyxPQUFPQyxFQUFFLENBQUNQLFFBQVFRLFVBQVUsQ0FBQztBQUN0QyIsInNvdXJjZXMiOlsid2VicGFjazovL3Nob2J1ai1iYW5nbGEvLi9saWIvbW9uZ29kYi50cz8wNWJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSBcIm1vbmdvZGJcIjtcclxuXHJcbmNvbnN0IHVyaSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfVVJJIHx8IFwibW9uZ29kYjovLzEyNy4wLjAuMToyNzAxNy9zaG9idWotYmFuZ2xhXCI7XHJcbmNvbnN0IGRiTmFtZSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfREIgfHwgXCJzaG9idWotYmFuZ2xhXCI7XHJcblxyXG5sZXQgY2FjaGVkQ2xpZW50UHJvbWlzZTogUHJvbWlzZTxNb25nb0NsaWVudD4gfCBudWxsID0gbnVsbDtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNb25nb0NsaWVudCgpIHtcclxuICBpZiAoIWNhY2hlZENsaWVudFByb21pc2UpIHtcclxuICAgIGNhY2hlZENsaWVudFByb21pc2UgPSBuZXcgTW9uZ29DbGllbnQodXJpKS5jb25uZWN0KCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FjaGVkQ2xpZW50UHJvbWlzZTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBsYWNlc0NvbGxlY3Rpb24oKSB7XHJcbiAgY29uc3QgY2xpZW50ID0gYXdhaXQgZ2V0TW9uZ29DbGllbnQoKTtcclxuICByZXR1cm4gY2xpZW50LmRiKGRiTmFtZSkuY29sbGVjdGlvbihcInBsYWNlc1wiKTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEl0ZW1zQ29sbGVjdGlvbigpIHtcclxuICBjb25zdCBjbGllbnQgPSBhd2FpdCBnZXRNb25nb0NsaWVudCgpO1xyXG4gIHJldHVybiBjbGllbnQuZGIoZGJOYW1lKS5jb2xsZWN0aW9uKFwiaXRlbXNcIik7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfVVJJIiwiZGJOYW1lIiwiTU9OR09EQl9EQiIsImNhY2hlZENsaWVudFByb21pc2UiLCJnZXRNb25nb0NsaWVudCIsImNvbm5lY3QiLCJnZXRQbGFjZXNDb2xsZWN0aW9uIiwiY2xpZW50IiwiZGIiLCJjb2xsZWN0aW9uIiwiZ2V0SXRlbXNDb2xsZWN0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fplaces%2Froute&page=%2Fapi%2Fplaces%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fplaces%2Froute.ts&appDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5CAssignment-TS-01%5Cshobuj-bangla&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();