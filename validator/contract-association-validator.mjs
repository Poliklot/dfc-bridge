// Generated from contract-association.schema.json with pinned Ajv/formats; do not edit.
/* Bundled ajv runtime helpers
The MIT License (MIT)

Copyright (c) 2015-2021 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


*/
/* Bundled ajv-formats runtime helpers
MIT License

Copyright (c) 2020 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
/* Bundled fast-deep-equal runtime helpers
MIT License

Copyright (c) 2017 Evgeny Poberezkin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
  }
});

// contract-association-standalone.mjs
var validate = validate20;
var contract_association_standalone_default = validate20;
var schema31 = { "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "https://poliklot.github.io/bridge-design-methodology/schema/contract-association.schema.json", "title": "DFC Bridge saved snapshot and authored contract association", "description": "Explicit immutable linkage evidence. Integrity and reference validation do not certify source authorship, product meaning, implementation or release.", "type": "object", "additionalProperties": false, "required": ["format", "schemaVersion", "snapshotRevision", "contractSha256", "contractRevision", "source", "scope", "contexts"], "properties": { "format": { "const": "dfc-bridge-contract-association" }, "schemaVersion": { "const": 1 }, "snapshotRevision": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "contractSha256": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "contractRevision": { "type": "string", "minLength": 1, "maxLength": 2400 }, "source": { "type": "object", "additionalProperties": false, "required": ["fileKey", "figmaPageId"], "properties": { "fileKey": { "type": ["string", "null"], "minLength": 1, "maxLength": 2400 }, "figmaPageId": { "type": "string", "pattern": "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" } } }, "scope": { "type": "object", "additionalProperties": false, "required": ["kind", "rootIds"], "properties": { "kind": { "enum": ["page", "section"] }, "rootIds": { "type": "array", "minItems": 1, "maxItems": 1e4, "uniqueItems": true, "items": { "type": "string", "pattern": "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" } } } }, "contexts": { "type": "array", "minItems": 1, "maxItems": 1e4, "items": { "type": "object", "additionalProperties": false, "required": ["contextId", "rootId"], "properties": { "contextId": { "type": "string", "pattern": "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$", "maxLength": 2400 }, "rootId": { "type": "string", "pattern": "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" } } } } } };
var pattern4 = new RegExp("^[0-9a-f]{64}$", "u");
var pattern6 = new RegExp("^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$", "u");
var pattern8 = new RegExp("^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$", "u");
var func1 = require_ucs2length().default;
function validate20(data, { instancePath = "", parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {}) {
  ;
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = void 0;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = void 0;
  }
  if (errors === 0) {
    if (data && typeof data == "object" && !Array.isArray(data)) {
      let missing0;
      if (data.format === void 0 && (missing0 = "format") || data.schemaVersion === void 0 && (missing0 = "schemaVersion") || data.snapshotRevision === void 0 && (missing0 = "snapshotRevision") || data.contractSha256 === void 0 && (missing0 = "contractSha256") || data.contractRevision === void 0 && (missing0 = "contractRevision") || data.source === void 0 && (missing0 = "source") || data.scope === void 0 && (missing0 = "scope") || data.contexts === void 0 && (missing0 = "contexts")) {
        validate20.errors = [{ instancePath, schemaPath: "#/required", keyword: "required", params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
        return false;
      } else {
        const _errs1 = errors;
        for (const key0 in data) {
          if (!(key0 === "format" || key0 === "schemaVersion" || key0 === "snapshotRevision" || key0 === "contractSha256" || key0 === "contractRevision" || key0 === "source" || key0 === "scope" || key0 === "contexts")) {
            validate20.errors = [{ instancePath, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key0 }, message: "must NOT have additional properties" }];
            return false;
            break;
          }
        }
        if (_errs1 === errors) {
          if (data.format !== void 0) {
            const _errs2 = errors;
            if ("dfc-bridge-contract-association" !== data.format) {
              validate20.errors = [{ instancePath: instancePath + "/format", schemaPath: "#/properties/format/const", keyword: "const", params: { allowedValue: "dfc-bridge-contract-association" }, message: "must be equal to constant" }];
              return false;
            }
            var valid0 = _errs2 === errors;
          } else {
            var valid0 = true;
          }
          if (valid0) {
            if (data.schemaVersion !== void 0) {
              const _errs3 = errors;
              if (1 !== data.schemaVersion) {
                validate20.errors = [{ instancePath: instancePath + "/schemaVersion", schemaPath: "#/properties/schemaVersion/const", keyword: "const", params: { allowedValue: 1 }, message: "must be equal to constant" }];
                return false;
              }
              var valid0 = _errs3 === errors;
            } else {
              var valid0 = true;
            }
            if (valid0) {
              if (data.snapshotRevision !== void 0) {
                let data2 = data.snapshotRevision;
                const _errs4 = errors;
                if (errors === _errs4) {
                  if (typeof data2 === "string") {
                    if (!pattern4.test(data2)) {
                      validate20.errors = [{ instancePath: instancePath + "/snapshotRevision", schemaPath: "#/properties/snapshotRevision/pattern", keyword: "pattern", params: { pattern: "^[0-9a-f]{64}$" }, message: 'must match pattern "^[0-9a-f]{64}$"' }];
                      return false;
                    }
                  } else {
                    validate20.errors = [{ instancePath: instancePath + "/snapshotRevision", schemaPath: "#/properties/snapshotRevision/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                    return false;
                  }
                }
                var valid0 = _errs4 === errors;
              } else {
                var valid0 = true;
              }
              if (valid0) {
                if (data.contractSha256 !== void 0) {
                  let data3 = data.contractSha256;
                  const _errs6 = errors;
                  if (errors === _errs6) {
                    if (typeof data3 === "string") {
                      if (!pattern4.test(data3)) {
                        validate20.errors = [{ instancePath: instancePath + "/contractSha256", schemaPath: "#/properties/contractSha256/pattern", keyword: "pattern", params: { pattern: "^[0-9a-f]{64}$" }, message: 'must match pattern "^[0-9a-f]{64}$"' }];
                        return false;
                      }
                    } else {
                      validate20.errors = [{ instancePath: instancePath + "/contractSha256", schemaPath: "#/properties/contractSha256/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                      return false;
                    }
                  }
                  var valid0 = _errs6 === errors;
                } else {
                  var valid0 = true;
                }
                if (valid0) {
                  if (data.contractRevision !== void 0) {
                    let data4 = data.contractRevision;
                    const _errs8 = errors;
                    if (errors === _errs8) {
                      if (typeof data4 === "string") {
                        if (func1(data4) > 2400) {
                          validate20.errors = [{ instancePath: instancePath + "/contractRevision", schemaPath: "#/properties/contractRevision/maxLength", keyword: "maxLength", params: { limit: 2400 }, message: "must NOT have more than 2400 characters" }];
                          return false;
                        } else {
                          if (func1(data4) < 1) {
                            validate20.errors = [{ instancePath: instancePath + "/contractRevision", schemaPath: "#/properties/contractRevision/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                            return false;
                          }
                        }
                      } else {
                        validate20.errors = [{ instancePath: instancePath + "/contractRevision", schemaPath: "#/properties/contractRevision/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                        return false;
                      }
                    }
                    var valid0 = _errs8 === errors;
                  } else {
                    var valid0 = true;
                  }
                  if (valid0) {
                    if (data.source !== void 0) {
                      let data5 = data.source;
                      const _errs10 = errors;
                      if (errors === _errs10) {
                        if (data5 && typeof data5 == "object" && !Array.isArray(data5)) {
                          let missing1;
                          if (data5.fileKey === void 0 && (missing1 = "fileKey") || data5.figmaPageId === void 0 && (missing1 = "figmaPageId")) {
                            validate20.errors = [{ instancePath: instancePath + "/source", schemaPath: "#/properties/source/required", keyword: "required", params: { missingProperty: missing1 }, message: "must have required property '" + missing1 + "'" }];
                            return false;
                          } else {
                            const _errs12 = errors;
                            for (const key1 in data5) {
                              if (!(key1 === "fileKey" || key1 === "figmaPageId")) {
                                validate20.errors = [{ instancePath: instancePath + "/source", schemaPath: "#/properties/source/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key1 }, message: "must NOT have additional properties" }];
                                return false;
                                break;
                              }
                            }
                            if (_errs12 === errors) {
                              if (data5.fileKey !== void 0) {
                                let data6 = data5.fileKey;
                                const _errs13 = errors;
                                if (typeof data6 !== "string" && data6 !== null) {
                                  validate20.errors = [{ instancePath: instancePath + "/source/fileKey", schemaPath: "#/properties/source/properties/fileKey/type", keyword: "type", params: { type: schema31.properties.source.properties.fileKey.type }, message: "must be string,null" }];
                                  return false;
                                }
                                if (errors === _errs13) {
                                  if (typeof data6 === "string") {
                                    if (func1(data6) > 2400) {
                                      validate20.errors = [{ instancePath: instancePath + "/source/fileKey", schemaPath: "#/properties/source/properties/fileKey/maxLength", keyword: "maxLength", params: { limit: 2400 }, message: "must NOT have more than 2400 characters" }];
                                      return false;
                                    } else {
                                      if (func1(data6) < 1) {
                                        validate20.errors = [{ instancePath: instancePath + "/source/fileKey", schemaPath: "#/properties/source/properties/fileKey/minLength", keyword: "minLength", params: { limit: 1 }, message: "must NOT have fewer than 1 characters" }];
                                        return false;
                                      }
                                    }
                                  }
                                }
                                var valid1 = _errs13 === errors;
                              } else {
                                var valid1 = true;
                              }
                              if (valid1) {
                                if (data5.figmaPageId !== void 0) {
                                  let data7 = data5.figmaPageId;
                                  const _errs15 = errors;
                                  if (errors === _errs15) {
                                    if (typeof data7 === "string") {
                                      if (!pattern6.test(data7)) {
                                        validate20.errors = [{ instancePath: instancePath + "/source/figmaPageId", schemaPath: "#/properties/source/properties/figmaPageId/pattern", keyword: "pattern", params: { pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" }, message: 'must match pattern "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"' }];
                                        return false;
                                      }
                                    } else {
                                      validate20.errors = [{ instancePath: instancePath + "/source/figmaPageId", schemaPath: "#/properties/source/properties/figmaPageId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                      return false;
                                    }
                                  }
                                  var valid1 = _errs15 === errors;
                                } else {
                                  var valid1 = true;
                                }
                              }
                            }
                          }
                        } else {
                          validate20.errors = [{ instancePath: instancePath + "/source", schemaPath: "#/properties/source/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                          return false;
                        }
                      }
                      var valid0 = _errs10 === errors;
                    } else {
                      var valid0 = true;
                    }
                    if (valid0) {
                      if (data.scope !== void 0) {
                        let data8 = data.scope;
                        const _errs17 = errors;
                        if (errors === _errs17) {
                          if (data8 && typeof data8 == "object" && !Array.isArray(data8)) {
                            let missing2;
                            if (data8.kind === void 0 && (missing2 = "kind") || data8.rootIds === void 0 && (missing2 = "rootIds")) {
                              validate20.errors = [{ instancePath: instancePath + "/scope", schemaPath: "#/properties/scope/required", keyword: "required", params: { missingProperty: missing2 }, message: "must have required property '" + missing2 + "'" }];
                              return false;
                            } else {
                              const _errs19 = errors;
                              for (const key2 in data8) {
                                if (!(key2 === "kind" || key2 === "rootIds")) {
                                  validate20.errors = [{ instancePath: instancePath + "/scope", schemaPath: "#/properties/scope/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key2 }, message: "must NOT have additional properties" }];
                                  return false;
                                  break;
                                }
                              }
                              if (_errs19 === errors) {
                                if (data8.kind !== void 0) {
                                  let data9 = data8.kind;
                                  const _errs20 = errors;
                                  if (!(data9 === "page" || data9 === "section")) {
                                    validate20.errors = [{ instancePath: instancePath + "/scope/kind", schemaPath: "#/properties/scope/properties/kind/enum", keyword: "enum", params: { allowedValues: schema31.properties.scope.properties.kind.enum }, message: "must be equal to one of the allowed values" }];
                                    return false;
                                  }
                                  var valid2 = _errs20 === errors;
                                } else {
                                  var valid2 = true;
                                }
                                if (valid2) {
                                  if (data8.rootIds !== void 0) {
                                    let data10 = data8.rootIds;
                                    const _errs21 = errors;
                                    if (errors === _errs21) {
                                      if (Array.isArray(data10)) {
                                        if (data10.length > 1e4) {
                                          validate20.errors = [{ instancePath: instancePath + "/scope/rootIds", schemaPath: "#/properties/scope/properties/rootIds/maxItems", keyword: "maxItems", params: { limit: 1e4 }, message: "must NOT have more than 10000 items" }];
                                          return false;
                                        } else {
                                          if (data10.length < 1) {
                                            validate20.errors = [{ instancePath: instancePath + "/scope/rootIds", schemaPath: "#/properties/scope/properties/rootIds/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                                            return false;
                                          } else {
                                            var valid3 = true;
                                            const len0 = data10.length;
                                            for (let i0 = 0; i0 < len0; i0++) {
                                              let data11 = data10[i0];
                                              const _errs23 = errors;
                                              if (errors === _errs23) {
                                                if (typeof data11 === "string") {
                                                  if (!pattern6.test(data11)) {
                                                    validate20.errors = [{ instancePath: instancePath + "/scope/rootIds/" + i0, schemaPath: "#/properties/scope/properties/rootIds/items/pattern", keyword: "pattern", params: { pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" }, message: 'must match pattern "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"' }];
                                                    return false;
                                                  }
                                                } else {
                                                  validate20.errors = [{ instancePath: instancePath + "/scope/rootIds/" + i0, schemaPath: "#/properties/scope/properties/rootIds/items/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                              }
                                              var valid3 = _errs23 === errors;
                                              if (!valid3) {
                                                break;
                                              }
                                            }
                                            if (valid3) {
                                              let i1 = data10.length;
                                              let j0;
                                              if (i1 > 1) {
                                                const indices0 = {};
                                                for (; i1--; ) {
                                                  let item0 = data10[i1];
                                                  if (typeof item0 !== "string") {
                                                    continue;
                                                  }
                                                  if (typeof indices0[item0] == "number") {
                                                    j0 = indices0[item0];
                                                    validate20.errors = [{ instancePath: instancePath + "/scope/rootIds", schemaPath: "#/properties/scope/properties/rootIds/uniqueItems", keyword: "uniqueItems", params: { i: i1, j: j0 }, message: "must NOT have duplicate items (items ## " + j0 + " and " + i1 + " are identical)" }];
                                                    return false;
                                                    break;
                                                  }
                                                  indices0[item0] = i1;
                                                }
                                              }
                                            }
                                          }
                                        }
                                      } else {
                                        validate20.errors = [{ instancePath: instancePath + "/scope/rootIds", schemaPath: "#/properties/scope/properties/rootIds/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                                        return false;
                                      }
                                    }
                                    var valid2 = _errs21 === errors;
                                  } else {
                                    var valid2 = true;
                                  }
                                }
                              }
                            }
                          } else {
                            validate20.errors = [{ instancePath: instancePath + "/scope", schemaPath: "#/properties/scope/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                            return false;
                          }
                        }
                        var valid0 = _errs17 === errors;
                      } else {
                        var valid0 = true;
                      }
                      if (valid0) {
                        if (data.contexts !== void 0) {
                          let data12 = data.contexts;
                          const _errs25 = errors;
                          if (errors === _errs25) {
                            if (Array.isArray(data12)) {
                              if (data12.length > 1e4) {
                                validate20.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/maxItems", keyword: "maxItems", params: { limit: 1e4 }, message: "must NOT have more than 10000 items" }];
                                return false;
                              } else {
                                if (data12.length < 1) {
                                  validate20.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/minItems", keyword: "minItems", params: { limit: 1 }, message: "must NOT have fewer than 1 items" }];
                                  return false;
                                } else {
                                  var valid5 = true;
                                  const len1 = data12.length;
                                  for (let i2 = 0; i2 < len1; i2++) {
                                    let data13 = data12[i2];
                                    const _errs27 = errors;
                                    if (errors === _errs27) {
                                      if (data13 && typeof data13 == "object" && !Array.isArray(data13)) {
                                        let missing3;
                                        if (data13.contextId === void 0 && (missing3 = "contextId") || data13.rootId === void 0 && (missing3 = "rootId")) {
                                          validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2, schemaPath: "#/properties/contexts/items/required", keyword: "required", params: { missingProperty: missing3 }, message: "must have required property '" + missing3 + "'" }];
                                          return false;
                                        } else {
                                          const _errs29 = errors;
                                          for (const key3 in data13) {
                                            if (!(key3 === "contextId" || key3 === "rootId")) {
                                              validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2, schemaPath: "#/properties/contexts/items/additionalProperties", keyword: "additionalProperties", params: { additionalProperty: key3 }, message: "must NOT have additional properties" }];
                                              return false;
                                              break;
                                            }
                                          }
                                          if (_errs29 === errors) {
                                            if (data13.contextId !== void 0) {
                                              let data14 = data13.contextId;
                                              const _errs30 = errors;
                                              if (errors === _errs30) {
                                                if (typeof data14 === "string") {
                                                  if (func1(data14) > 2400) {
                                                    validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2 + "/contextId", schemaPath: "#/properties/contexts/items/properties/contextId/maxLength", keyword: "maxLength", params: { limit: 2400 }, message: "must NOT have more than 2400 characters" }];
                                                    return false;
                                                  } else {
                                                    if (!pattern8.test(data14)) {
                                                      validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2 + "/contextId", schemaPath: "#/properties/contexts/items/properties/contextId/pattern", keyword: "pattern", params: { pattern: "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$" }, message: 'must match pattern "^[A-Za-z0-9]+(?:[._:/-][A-Za-z0-9*]+)*$"' }];
                                                      return false;
                                                    }
                                                  }
                                                } else {
                                                  validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2 + "/contextId", schemaPath: "#/properties/contexts/items/properties/contextId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                  return false;
                                                }
                                              }
                                              var valid6 = _errs30 === errors;
                                            } else {
                                              var valid6 = true;
                                            }
                                            if (valid6) {
                                              if (data13.rootId !== void 0) {
                                                let data15 = data13.rootId;
                                                const _errs32 = errors;
                                                if (errors === _errs32) {
                                                  if (typeof data15 === "string") {
                                                    if (!pattern6.test(data15)) {
                                                      validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2 + "/rootId", schemaPath: "#/properties/contexts/items/properties/rootId/pattern", keyword: "pattern", params: { pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$" }, message: 'must match pattern "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"' }];
                                                      return false;
                                                    }
                                                  } else {
                                                    validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2 + "/rootId", schemaPath: "#/properties/contexts/items/properties/rootId/type", keyword: "type", params: { type: "string" }, message: "must be string" }];
                                                    return false;
                                                  }
                                                }
                                                var valid6 = _errs32 === errors;
                                              } else {
                                                var valid6 = true;
                                              }
                                            }
                                          }
                                        }
                                      } else {
                                        validate20.errors = [{ instancePath: instancePath + "/contexts/" + i2, schemaPath: "#/properties/contexts/items/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
                                        return false;
                                      }
                                    }
                                    var valid5 = _errs27 === errors;
                                    if (!valid5) {
                                      break;
                                    }
                                  }
                                }
                              }
                            } else {
                              validate20.errors = [{ instancePath: instancePath + "/contexts", schemaPath: "#/properties/contexts/type", keyword: "type", params: { type: "array" }, message: "must be array" }];
                              return false;
                            }
                          }
                          var valid0 = _errs25 === errors;
                        } else {
                          var valid0 = true;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      validate20.errors = [{ instancePath, schemaPath: "#/type", keyword: "type", params: { type: "object" }, message: "must be object" }];
      return false;
    }
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { "props": true, "dynamicProps": false, "dynamicItems": false };
export {
  contract_association_standalone_default as default,
  validate
};
