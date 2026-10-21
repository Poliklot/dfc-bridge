// Generated from content-bindings.schema.json; do not edit.
"use strict";
export const validate = validate20;
export default validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://poliklot.github.io/bridge-design-methodology/schema/content-bindings.schema.json","title":"DFC Bridge explicit saved-content bindings","type":"object","additionalProperties":false,"required":["format","schemaVersion","snapshotRevision","groups"],"properties":{"format":{"const":"dfc-bridge-content-bindings"},"schemaVersion":{"const":1},"snapshotRevision":{"type":"string","pattern":"^[a-f0-9]{64}$"},"groups":{"type":"array","minItems":1,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":["key","sources"],"properties":{"key":{"type":"string","pattern":"^[a-z][a-z0-9-]{0,119}$"},"sources":{"type":"array","minItems":1,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":["contextId","instanceId","slots"],"properties":{"contextId":{"type":"string","pattern":"^[a-z][a-z0-9-]{0,119}$"},"instanceId":{"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},"slots":{"type":"array","minItems":1,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":["key","kind"],"properties":{"key":{"type":"string","pattern":"^[a-z][a-z0-9-]{0,119}$"},"kind":{"enum":["text-property","image-fill"]},"property":{"type":"string","pattern":"^[\\s\\S]{1,2400}$"},"fillIndex":{"type":"integer","minimum":0,"maximum":10000}},"allOf":[{"if":{"properties":{"kind":{"const":"text-property"}}},"then":{"properties":{"property":{"type":"string","pattern":"^[\\s\\S]{1,2400}$"},"fillIndex":false},"required":["property"]},"else":{"properties":{"fillIndex":{"type":"integer","minimum":0,"maximum":10000},"property":false},"required":["fillIndex"]}}]}},"exceptions":{"type":"array","minItems":0,"maxItems":100,"items":{"type":"object","additionalProperties":false,"required":["slotKey","reason"],"properties":{"slotKey":{"type":"string","pattern":"^[a-z][a-z0-9-]{0,119}$"},"reason":{"type":"string","pattern":"^[\\s\\S]{1,2400}$"}}}}}}}}}}}};
const pattern4 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern5 = new RegExp("^[a-z][a-z0-9-]{0,119}$", "u");
const pattern7 = new RegExp("^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$", "u");
const pattern8 = new RegExp("^[\\s\\S]{1,2400}$", "u");

function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://poliklot.github.io/bridge-design-methodology/schema/content-bindings.schema.json" */;
let vErrors = null;
let errors = 0;
const evaluated0 = validate20.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((((data.format === undefined) && (missing0 = "format")) || ((data.schemaVersion === undefined) && (missing0 = "schemaVersion"))) || ((data.snapshotRevision === undefined) && (missing0 = "snapshotRevision"))) || ((data.groups === undefined) && (missing0 = "groups"))){
validate20.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!((((key0 === "format") || (key0 === "schemaVersion")) || (key0 === "snapshotRevision")) || (key0 === "groups"))){
validate20.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.format !== undefined){
const _errs2 = errors;
if("dfc-bridge-content-bindings" !== data.format){
validate20.errors = [{instancePath:instancePath+"/format",schemaPath:"#/properties/format/const",keyword:"const",params:{allowedValue: "dfc-bridge-content-bindings"},message:"must be equal to constant"}];
return false;
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.schemaVersion !== undefined){
const _errs3 = errors;
if(1 !== data.schemaVersion){
validate20.errors = [{instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/const",keyword:"const",params:{allowedValue: 1},message:"must be equal to constant"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.snapshotRevision !== undefined){
let data2 = data.snapshotRevision;
const _errs4 = errors;
if(errors === _errs4){
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
validate20.errors = [{instancePath:instancePath+"/snapshotRevision",schemaPath:"#/properties/snapshotRevision/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/snapshotRevision",schemaPath:"#/properties/snapshotRevision/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs4 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.groups !== undefined){
let data3 = data.groups;
const _errs6 = errors;
if(errors === _errs6){
if(Array.isArray(data3)){
if(data3.length > 100){
validate20.errors = [{instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
if(data3.length < 1){
validate20.errors = [{instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid1 = true;
const len0 = data3.length;
for(let i0=0; i0<len0; i0++){
let data4 = data3[i0];
const _errs8 = errors;
if(errors === _errs8){
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
let missing1;
if(((data4.key === undefined) && (missing1 = "key")) || ((data4.sources === undefined) && (missing1 = "sources"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0,schemaPath:"#/properties/groups/items/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs10 = errors;
for(const key1 in data4){
if(!((key1 === "key") || (key1 === "sources"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0,schemaPath:"#/properties/groups/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs10 === errors){
if(data4.key !== undefined){
let data5 = data4.key;
const _errs11 = errors;
if(errors === _errs11){
if(typeof data5 === "string"){
if(!pattern5.test(data5)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/key",schemaPath:"#/properties/groups/items/properties/key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]{0,119}$"},message:"must match pattern \""+"^[a-z][a-z0-9-]{0,119}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/key",schemaPath:"#/properties/groups/items/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs11 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data4.sources !== undefined){
let data6 = data4.sources;
const _errs13 = errors;
if(errors === _errs13){
if(Array.isArray(data6)){
if(data6.length > 100){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources",schemaPath:"#/properties/groups/items/properties/sources/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
if(data6.length < 1){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources",schemaPath:"#/properties/groups/items/properties/sources/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid3 = true;
const len1 = data6.length;
for(let i1=0; i1<len1; i1++){
let data7 = data6[i1];
const _errs15 = errors;
if(errors === _errs15){
if(data7 && typeof data7 == "object" && !Array.isArray(data7)){
let missing2;
if((((data7.contextId === undefined) && (missing2 = "contextId")) || ((data7.instanceId === undefined) && (missing2 = "instanceId"))) || ((data7.slots === undefined) && (missing2 = "slots"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1,schemaPath:"#/properties/groups/items/properties/sources/items/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
const _errs17 = errors;
for(const key2 in data7){
if(!((((key2 === "contextId") || (key2 === "instanceId")) || (key2 === "slots")) || (key2 === "exceptions"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1,schemaPath:"#/properties/groups/items/properties/sources/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs17 === errors){
if(data7.contextId !== undefined){
let data8 = data7.contextId;
const _errs18 = errors;
if(errors === _errs18){
if(typeof data8 === "string"){
if(!pattern5.test(data8)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/contextId",schemaPath:"#/properties/groups/items/properties/sources/items/properties/contextId/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]{0,119}$"},message:"must match pattern \""+"^[a-z][a-z0-9-]{0,119}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/contextId",schemaPath:"#/properties/groups/items/properties/sources/items/properties/contextId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid4 = _errs18 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data7.instanceId !== undefined){
let data9 = data7.instanceId;
const _errs20 = errors;
if(errors === _errs20){
if(typeof data9 === "string"){
if(!pattern7.test(data9)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/instanceId",schemaPath:"#/properties/groups/items/properties/sources/items/properties/instanceId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/instanceId",schemaPath:"#/properties/groups/items/properties/sources/items/properties/instanceId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid4 = _errs20 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data7.slots !== undefined){
let data10 = data7.slots;
const _errs22 = errors;
if(errors === _errs22){
if(Array.isArray(data10)){
if(data10.length > 100){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
if(data10.length < 1){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid5 = true;
const len2 = data10.length;
for(let i2=0; i2<len2; i2++){
let data11 = data10[i2];
const _errs24 = errors;
const _errs27 = errors;
let valid7 = true;
const _errs28 = errors;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
if(data11.kind !== undefined){
if("text-property" !== data11.kind){
const err0 = {};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
}
}
var _valid0 = _errs28 === errors;
errors = _errs27;
if(vErrors !== null){
if(_errs27){
vErrors.length = _errs27;
}
else {
vErrors = null;
}
}
let ifClause0;
if(_valid0){
const _errs30 = errors;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
let missing3;
if((data11.property === undefined) && (missing3 = "property")){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/then/required",keyword:"required",params:{missingProperty: missing3},message:"must have required property '"+missing3+"'"}];
return false;
}
else {
if(data11.property !== undefined){
let data13 = data11.property;
const _errs31 = errors;
if(errors === _errs31){
if(typeof data13 === "string"){
if(!pattern8.test(data13)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/property",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/then/properties/property/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{1,2400}$"},message:"must match pattern \""+"^[\\s\\S]{1,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/property",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/then/properties/property/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid9 = _errs31 === errors;
}
else {
var valid9 = true;
}
if(valid9){
if(data11.fillIndex !== undefined){
var valid9 = false;
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/then/properties/fillIndex/false schema",keyword:"false schema",params:{},message:"boolean schema is false"}];
return false;
}
else {
var valid9 = true;
}
}
}
}
var _valid0 = _errs30 === errors;
valid7 = _valid0;
if(valid7){
var props0 = {};
props0.property = true;
props0.fillIndex = true;
props0.kind = true;
}
ifClause0 = "then";
}
else {
const _errs33 = errors;
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
let missing4;
if((data11.fillIndex === undefined) && (missing4 = "fillIndex")){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/else/required",keyword:"required",params:{missingProperty: missing4},message:"must have required property '"+missing4+"'"}];
return false;
}
else {
if(data11.fillIndex !== undefined){
let data15 = data11.fillIndex;
const _errs34 = errors;
if(!(((typeof data15 == "number") && (!(data15 % 1) && !isNaN(data15))) && (isFinite(data15)))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/else/properties/fillIndex/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
if(errors === _errs34){
if((typeof data15 == "number") && (isFinite(data15))){
if(data15 > 10000 || isNaN(data15)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/else/properties/fillIndex/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"}];
return false;
}
else {
if(data15 < 0 || isNaN(data15)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/else/properties/fillIndex/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
}
}
var valid10 = _errs34 === errors;
}
else {
var valid10 = true;
}
if(valid10){
if(data11.property !== undefined){
var valid10 = false;
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/property",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/else/properties/property/false schema",keyword:"false schema",params:{},message:"boolean schema is false"}];
return false;
}
else {
var valid10 = true;
}
}
}
}
var _valid0 = _errs33 === errors;
valid7 = _valid0;
if(valid7){
if(props0 !== true){
props0 = props0 || {};
props0.fillIndex = true;
props0.property = true;
}
}
ifClause0 = "else";
}
if(!valid7){
const err1 = {instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/allOf/0/if",keyword:"if",params:{failingKeyword: ifClause0},message:"must match \""+ifClause0+"\" schema"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
validate20.errors = vErrors;
return false;
}
if(errors === _errs24){
if(data11 && typeof data11 == "object" && !Array.isArray(data11)){
let missing5;
if(((data11.key === undefined) && (missing5 = "key")) || ((data11.kind === undefined) && (missing5 = "kind"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/required",keyword:"required",params:{missingProperty: missing5},message:"must have required property '"+missing5+"'"}];
return false;
}
else {
const _errs36 = errors;
for(const key3 in data11){
if(!((((key3 === "key") || (key3 === "kind")) || (key3 === "property")) || (key3 === "fillIndex"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs36 === errors){
if(data11.key !== undefined){
let data17 = data11.key;
const _errs37 = errors;
if(errors === _errs37){
if(typeof data17 === "string"){
if(!pattern5.test(data17)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/key",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/key/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]{0,119}$"},message:"must match pattern \""+"^[a-z][a-z0-9-]{0,119}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/key",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/key/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid11 = _errs37 === errors;
}
else {
var valid11 = true;
}
if(valid11){
if(data11.kind !== undefined){
let data18 = data11.kind;
const _errs39 = errors;
if(!((data18 === "text-property") || (data18 === "image-fill"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/kind",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/kind/enum",keyword:"enum",params:{allowedValues: schema31.properties.groups.items.properties.sources.items.properties.slots.items.properties.kind.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid11 = _errs39 === errors;
}
else {
var valid11 = true;
}
if(valid11){
if(data11.property !== undefined){
let data19 = data11.property;
const _errs40 = errors;
if(errors === _errs40){
if(typeof data19 === "string"){
if(!pattern8.test(data19)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/property",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/property/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{1,2400}$"},message:"must match pattern \""+"^[\\s\\S]{1,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/property",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/property/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid11 = _errs40 === errors;
}
else {
var valid11 = true;
}
if(valid11){
if(data11.fillIndex !== undefined){
let data20 = data11.fillIndex;
const _errs42 = errors;
if(!(((typeof data20 == "number") && (!(data20 % 1) && !isNaN(data20))) && (isFinite(data20)))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/fillIndex/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
if(errors === _errs42){
if((typeof data20 == "number") && (isFinite(data20))){
if(data20 > 10000 || isNaN(data20)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/fillIndex/maximum",keyword:"maximum",params:{comparison: "<=", limit: 10000},message:"must be <= 10000"}];
return false;
}
else {
if(data20 < 0 || isNaN(data20)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2+"/fillIndex",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/properties/fillIndex/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
}
}
var valid11 = _errs42 === errors;
}
else {
var valid11 = true;
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots/" + i2,schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid5 = _errs24 === errors;
if(!valid5){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/slots",schemaPath:"#/properties/groups/items/properties/sources/items/properties/slots/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid4 = _errs22 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data7.exceptions !== undefined){
let data21 = data7.exceptions;
const _errs44 = errors;
if(errors === _errs44){
if(Array.isArray(data21)){
if(data21.length > 100){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
if(data21.length < 0){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/minItems",keyword:"minItems",params:{limit: 0},message:"must NOT have fewer than 0 items"}];
return false;
}
else {
var valid12 = true;
const len3 = data21.length;
for(let i3=0; i3<len3; i3++){
let data22 = data21[i3];
const _errs46 = errors;
if(errors === _errs46){
if(data22 && typeof data22 == "object" && !Array.isArray(data22)){
let missing6;
if(((data22.slotKey === undefined) && (missing6 = "slotKey")) || ((data22.reason === undefined) && (missing6 = "reason"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3,schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/required",keyword:"required",params:{missingProperty: missing6},message:"must have required property '"+missing6+"'"}];
return false;
}
else {
const _errs48 = errors;
for(const key4 in data22){
if(!((key4 === "slotKey") || (key4 === "reason"))){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3,schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs48 === errors){
if(data22.slotKey !== undefined){
let data23 = data22.slotKey;
const _errs49 = errors;
if(errors === _errs49){
if(typeof data23 === "string"){
if(!pattern5.test(data23)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3+"/slotKey",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/properties/slotKey/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]{0,119}$"},message:"must match pattern \""+"^[a-z][a-z0-9-]{0,119}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3+"/slotKey",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/properties/slotKey/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid13 = _errs49 === errors;
}
else {
var valid13 = true;
}
if(valid13){
if(data22.reason !== undefined){
let data24 = data22.reason;
const _errs51 = errors;
if(errors === _errs51){
if(typeof data24 === "string"){
if(!pattern8.test(data24)){
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3+"/reason",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/properties/reason/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{1,2400}$"},message:"must match pattern \""+"^[\\s\\S]{1,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3+"/reason",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid13 = _errs51 === errors;
}
else {
var valid13 = true;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions/" + i3,schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid12 = _errs46 === errors;
if(!valid12){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1+"/exceptions",schemaPath:"#/properties/groups/items/properties/sources/items/properties/exceptions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid4 = _errs44 === errors;
}
else {
var valid4 = true;
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources/" + i1,schemaPath:"#/properties/groups/items/properties/sources/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid3 = _errs15 === errors;
if(!valid3){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0+"/sources",schemaPath:"#/properties/groups/items/properties/sources/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid2 = _errs13 === errors;
}
else {
var valid2 = true;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups/" + i0,schemaPath:"#/properties/groups/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid1 = _errs8 === errors;
if(!valid1){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/groups",schemaPath:"#/properties/groups/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs6 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};
