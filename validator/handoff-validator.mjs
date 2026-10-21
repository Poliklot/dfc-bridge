// Generated from handoff.schema.json; do not edit.
"use strict";
export const validate = validate20;
export default validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://poliklot.github.io/bridge-design-methodology/schema/handoff.schema.json","title":"DFC Bridge read-only developer snapshot","type":"object","additionalProperties":false,"required":["format","schemaVersion","revision","generator","source","scope","nodes","dependencies","preflight","coverage"],"properties":{"format":{"const":"dfc-bridge-handoff"},"schemaVersion":{"const":1},"revision":{"type":"string","pattern":"^[a-f0-9]{64}$"},"generator":{"type":"object","additionalProperties":false,"required":["pluginVersion","validatorVersion"],"properties":{"pluginVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"},"validatorVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"}}},"source":{"type":"object","additionalProperties":false,"required":["fileKey","figmaPageId","figmaPageName"],"properties":{"fileKey":{"anyOf":[{"type":"null"},{"type":"string","pattern":"^[A-Za-z0-9]{6,100}$"}]},"figmaPageId":{"$ref":"#/$defs/nodeId"},"figmaPageName":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"scope":{"type":"object","additionalProperties":false,"required":["kind","completeness","rootIds","pageId"],"properties":{"kind":{"enum":["page","section"]},"completeness":{"enum":["full","partial"]},"rootIds":{"type":"array","minItems":1,"maxItems":1000,"items":{"$ref":"#/$defs/nodeId"}},"pageId":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"nodes":{"type":"array","minItems":1,"maxItems":10000,"items":{"$ref":"#/$defs/node"}},"dependencies":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/node"}},"preflight":{"type":"object","required":["mode","scope","status","issues","summary"],"properties":{"mode":{"enum":["page","section"]},"scope":{"enum":["page","selection"]},"status":{"enum":["ready","review","not-ready","partial","blocked"]},"issues":{"type":"array","maxItems":10000,"items":{"type":"object","required":["ruleId","severity","nodeId"],"properties":{"ruleId":{"type":"string","pattern":"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},"severity":{"enum":["error","warning","todo"]},"nodeId":{"type":"string"}}}},"summary":{"type":"object"}}},"coverage":{"type":"object","additionalProperties":false,"required":["instanceInteriors","content","runtime","componentVariants","unavailable"],"properties":{"instanceInteriors":{"const":"atomic"},"content":{"const":"not-checked"},"runtime":{"const":"not-checked"},"componentVariants":{"const":"not-exported"},"unavailable":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["nodeId","field","reason"],"properties":{"nodeId":{"$ref":"#/$defs/nodeId"},"field":{"type":"string"},"reason":{"type":"string"}}}}}}},"$defs":{"nodeId":{"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},"nullableNodeId":{"anyOf":[{"type":"null"},{"$ref":"#/$defs/nodeId"}]},"node":{"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}},"native":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"}}}}};
const schema32 = {"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"};
const func1 = Object.prototype.hasOwnProperty;
const pattern4 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern5 = new RegExp("^[0-9]+\\.[0-9]+\\.[0-9]+$", "u");
const pattern7 = new RegExp("^[A-Za-z0-9]{6,100}$", "u");
const pattern8 = new RegExp("^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$", "u");
const pattern9 = new RegExp("^[\\s\\S]{0,2400}$", "u");
const pattern18 = new RegExp("^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$", "u");
const schema34 = {"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}};
const schema39 = {"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"}}};
const pattern13 = new RegExp("^[A-Z_]{1,80}$", "u");
const schema36 = {"anyOf":[{"type":"null"},{"$ref":"#/$defs/nodeId"}]};

function validate22(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate22.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
const _errs0 = errors;
let valid0 = false;
const _errs1 = errors;
if(data !== null){
const err0 = {instancePath,schemaPath:"#/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
var _valid0 = _errs1 === errors;
valid0 = valid0 || _valid0;
const _errs3 = errors;
const _errs4 = errors;
if(errors === _errs4){
if(typeof data === "string"){
if(!pattern8.test(data)){
const err1 = {instancePath,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
else {
const err2 = {instancePath,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
var _valid0 = _errs3 === errors;
valid0 = valid0 || _valid0;
if(!valid0){
const err3 = {instancePath,schemaPath:"#/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate22.errors = vErrors;
return false;
}
else {
errors = _errs0;
if(vErrors !== null){
if(_errs0){
vErrors.length = _errs0;
}
else {
vErrors = null;
}
}
}
validate22.errors = vErrors;
return errors === 0;
}
validate22.evaluated = {"dynamicProps":false,"dynamicItems":false};


function validate21(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate21.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((((((((((data.id === undefined) && (missing0 = "id")) || ((data.type === undefined) && (missing0 = "type"))) || ((data.name === undefined) && (missing0 = "name"))) || ((data.parentId === undefined) && (missing0 = "parentId"))) || ((data.children === undefined) && (missing0 = "children"))) || ((data.mainComponentId === undefined) && (missing0 = "mainComponentId"))) || ((data.figmaPageId === undefined) && (missing0 = "figmaPageId"))) || ((data.identity === undefined) && (missing0 = "identity"))) || ((data.native === undefined) && (missing0 = "native"))) || ((data.tags === undefined) && (missing0 = "tags"))) || ((data.supportsChildren === undefined) && (missing0 = "supportsChildren"))){
validate21.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(func1.call(schema34.properties, key0))){
validate21.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.id !== undefined){
let data0 = data.id;
const _errs2 = errors;
const _errs3 = errors;
if(errors === _errs3){
if(typeof data0 === "string"){
if(!pattern8.test(data0)){
validate21.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.type !== undefined){
let data1 = data.type;
const _errs5 = errors;
if(errors === _errs5){
if(typeof data1 === "string"){
if(!pattern13.test(data1)){
validate21.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/pattern",keyword:"pattern",params:{pattern: "^[A-Z_]{1,80}$"},message:"must match pattern \""+"^[A-Z_]{1,80}$"+"\""}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.name !== undefined){
let data2 = data.name;
const _errs7 = errors;
if(errors === _errs7){
if(typeof data2 === "string"){
if(!pattern9.test(data2)){
validate21.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs7 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.parentId !== undefined){
const _errs9 = errors;
if(!(validate22(data.parentId, {instancePath:instancePath+"/parentId",parentData:data,parentDataProperty:"parentId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
errors = vErrors.length;
}
var valid0 = _errs9 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.children !== undefined){
let data4 = data.children;
const _errs10 = errors;
if(errors === _errs10){
if(Array.isArray(data4)){
if(data4.length > 10000){
validate21.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid2 = true;
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
let data5 = data4[i0];
const _errs12 = errors;
const _errs13 = errors;
if(errors === _errs13){
if(typeof data5 === "string"){
if(!pattern8.test(data5)){
validate21.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs12 === errors;
if(!valid2){
break;
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs10 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.mainComponentId !== undefined){
const _errs15 = errors;
if(!(validate22(data.mainComponentId, {instancePath:instancePath+"/mainComponentId",parentData:data,parentDataProperty:"mainComponentId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
errors = vErrors.length;
}
var valid0 = _errs15 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.figmaPageId !== undefined){
const _errs16 = errors;
if(!(validate22(data.figmaPageId, {instancePath:instancePath+"/figmaPageId",parentData:data,parentDataProperty:"figmaPageId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
errors = vErrors.length;
}
var valid0 = _errs16 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.identity !== undefined){
const _errs17 = errors;
if(typeof data.identity !== "string"){
validate21.errors = [{instancePath:instancePath+"/identity",schemaPath:"#/properties/identity/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs17 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.native !== undefined){
let data9 = data.native;
const _errs19 = errors;
const _errs20 = errors;
if(errors === _errs20){
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
const _errs22 = errors;
for(const key1 in data9){
if(!(func1.call(schema39.properties, key1))){
validate21.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs22 === errors){
if(data9.x !== undefined){
let data10 = data9.x;
const _errs23 = errors;
if(!((typeof data10 == "number") && (isFinite(data10)))){
validate21.errors = [{instancePath:instancePath+"/native/x",schemaPath:"#/$defs/native/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs23 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.y !== undefined){
let data11 = data9.y;
const _errs25 = errors;
if(!((typeof data11 == "number") && (isFinite(data11)))){
validate21.errors = [{instancePath:instancePath+"/native/y",schemaPath:"#/$defs/native/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs25 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.width !== undefined){
let data12 = data9.width;
const _errs27 = errors;
if(errors === _errs27){
if((typeof data12 == "number") && (isFinite(data12))){
if(data12 < 0 || isNaN(data12)){
validate21.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid5 = _errs27 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.height !== undefined){
let data13 = data9.height;
const _errs29 = errors;
if(errors === _errs29){
if((typeof data13 == "number") && (isFinite(data13))){
if(data13 < 0 || isNaN(data13)){
validate21.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate21.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid5 = _errs29 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.visible !== undefined){
const _errs31 = errors;
if(typeof data9.visible !== "boolean"){
validate21.errors = [{instancePath:instancePath+"/native/visible",schemaPath:"#/$defs/native/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid5 = _errs31 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.isMask !== undefined){
const _errs33 = errors;
if(typeof data9.isMask !== "boolean"){
validate21.errors = [{instancePath:instancePath+"/native/isMask",schemaPath:"#/$defs/native/properties/isMask/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid5 = _errs33 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.opacity !== undefined){
let data16 = data9.opacity;
const _errs35 = errors;
if(!((typeof data16 == "number") && (isFinite(data16)))){
validate21.errors = [{instancePath:instancePath+"/native/opacity",schemaPath:"#/$defs/native/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs35 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutMode !== undefined){
let data17 = data9.layoutMode;
const _errs37 = errors;
if(!((((data17 === "NONE") || (data17 === "HORIZONTAL")) || (data17 === "VERTICAL")) || (data17 === "GRID"))){
validate21.errors = [{instancePath:instancePath+"/native/layoutMode",schemaPath:"#/$defs/native/properties/layoutMode/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutMode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid5 = _errs37 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutPositioning !== undefined){
let data18 = data9.layoutPositioning;
const _errs38 = errors;
if(!((data18 === "AUTO") || (data18 === "ABSOLUTE"))){
validate21.errors = [{instancePath:instancePath+"/native/layoutPositioning",schemaPath:"#/$defs/native/properties/layoutPositioning/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutPositioning.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid5 = _errs38 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutSizingHorizontal !== undefined){
const _errs39 = errors;
if(typeof data9.layoutSizingHorizontal !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/layoutSizingHorizontal",schemaPath:"#/$defs/native/properties/layoutSizingHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs39 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutSizingVertical !== undefined){
const _errs41 = errors;
if(typeof data9.layoutSizingVertical !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/layoutSizingVertical",schemaPath:"#/$defs/native/properties/layoutSizingVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs41 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.primaryAxisSizingMode !== undefined){
const _errs43 = errors;
if(typeof data9.primaryAxisSizingMode !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/primaryAxisSizingMode",schemaPath:"#/$defs/native/properties/primaryAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs43 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.counterAxisSizingMode !== undefined){
const _errs45 = errors;
if(typeof data9.counterAxisSizingMode !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/counterAxisSizingMode",schemaPath:"#/$defs/native/properties/counterAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs45 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.primaryAxisAlignItems !== undefined){
const _errs47 = errors;
if(typeof data9.primaryAxisAlignItems !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/primaryAxisAlignItems",schemaPath:"#/$defs/native/properties/primaryAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs47 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.counterAxisAlignItems !== undefined){
const _errs49 = errors;
if(typeof data9.counterAxisAlignItems !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/counterAxisAlignItems",schemaPath:"#/$defs/native/properties/counterAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs49 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutWrap !== undefined){
const _errs51 = errors;
if(typeof data9.layoutWrap !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/layoutWrap",schemaPath:"#/$defs/native/properties/layoutWrap/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs51 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paddingTop !== undefined){
let data26 = data9.paddingTop;
const _errs53 = errors;
if(!((typeof data26 == "number") && (isFinite(data26)))){
validate21.errors = [{instancePath:instancePath+"/native/paddingTop",schemaPath:"#/$defs/native/properties/paddingTop/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs53 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paddingRight !== undefined){
let data27 = data9.paddingRight;
const _errs55 = errors;
if(!((typeof data27 == "number") && (isFinite(data27)))){
validate21.errors = [{instancePath:instancePath+"/native/paddingRight",schemaPath:"#/$defs/native/properties/paddingRight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs55 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paddingBottom !== undefined){
let data28 = data9.paddingBottom;
const _errs57 = errors;
if(!((typeof data28 == "number") && (isFinite(data28)))){
validate21.errors = [{instancePath:instancePath+"/native/paddingBottom",schemaPath:"#/$defs/native/properties/paddingBottom/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs57 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paddingLeft !== undefined){
let data29 = data9.paddingLeft;
const _errs59 = errors;
if(!((typeof data29 == "number") && (isFinite(data29)))){
validate21.errors = [{instancePath:instancePath+"/native/paddingLeft",schemaPath:"#/$defs/native/properties/paddingLeft/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs59 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.itemSpacing !== undefined){
let data30 = data9.itemSpacing;
const _errs61 = errors;
if(!((typeof data30 == "number") && (isFinite(data30)))){
validate21.errors = [{instancePath:instancePath+"/native/itemSpacing",schemaPath:"#/$defs/native/properties/itemSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs61 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.characters !== undefined){
const _errs63 = errors;
if(typeof data9.characters !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/characters",schemaPath:"#/$defs/native/properties/characters/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs63 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.fontName !== undefined){
let data32 = data9.fontName;
const _errs65 = errors;
if(!(data32 && typeof data32 == "object" && !Array.isArray(data32))){
validate21.errors = [{instancePath:instancePath+"/native/fontName",schemaPath:"#/$defs/native/properties/fontName/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs65 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.fontSize !== undefined){
let data33 = data9.fontSize;
const _errs67 = errors;
if(!((typeof data33 == "number") && (isFinite(data33)))){
validate21.errors = [{instancePath:instancePath+"/native/fontSize",schemaPath:"#/$defs/native/properties/fontSize/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs67 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.fontWeight !== undefined){
let data34 = data9.fontWeight;
const _errs69 = errors;
if(!((typeof data34 == "number") && (isFinite(data34)))){
validate21.errors = [{instancePath:instancePath+"/native/fontWeight",schemaPath:"#/$defs/native/properties/fontWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs69 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.lineHeight !== undefined){
let data35 = data9.lineHeight;
const _errs71 = errors;
if(!(data35 && typeof data35 == "object" && !Array.isArray(data35))){
validate21.errors = [{instancePath:instancePath+"/native/lineHeight",schemaPath:"#/$defs/native/properties/lineHeight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs71 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.letterSpacing !== undefined){
let data36 = data9.letterSpacing;
const _errs73 = errors;
if(!(data36 && typeof data36 == "object" && !Array.isArray(data36))){
validate21.errors = [{instancePath:instancePath+"/native/letterSpacing",schemaPath:"#/$defs/native/properties/letterSpacing/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs73 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textAlignHorizontal !== undefined){
const _errs75 = errors;
if(typeof data9.textAlignHorizontal !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/textAlignHorizontal",schemaPath:"#/$defs/native/properties/textAlignHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs75 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textAlignVertical !== undefined){
const _errs77 = errors;
if(typeof data9.textAlignVertical !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/textAlignVertical",schemaPath:"#/$defs/native/properties/textAlignVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs77 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textAutoResize !== undefined){
const _errs79 = errors;
if(typeof data9.textAutoResize !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/textAutoResize",schemaPath:"#/$defs/native/properties/textAutoResize/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs79 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.fills !== undefined){
const _errs81 = errors;
if(!(Array.isArray(data9.fills))){
validate21.errors = [{instancePath:instancePath+"/native/fills",schemaPath:"#/$defs/native/properties/fills/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs81 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.strokes !== undefined){
const _errs83 = errors;
if(!(Array.isArray(data9.strokes))){
validate21.errors = [{instancePath:instancePath+"/native/strokes",schemaPath:"#/$defs/native/properties/strokes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs83 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.strokeWeight !== undefined){
let data42 = data9.strokeWeight;
const _errs85 = errors;
if(!((typeof data42 == "number") && (isFinite(data42)))){
validate21.errors = [{instancePath:instancePath+"/native/strokeWeight",schemaPath:"#/$defs/native/properties/strokeWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs85 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.strokeAlign !== undefined){
const _errs87 = errors;
if(typeof data9.strokeAlign !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/strokeAlign",schemaPath:"#/$defs/native/properties/strokeAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs87 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.effects !== undefined){
const _errs89 = errors;
if(!(Array.isArray(data9.effects))){
validate21.errors = [{instancePath:instancePath+"/native/effects",schemaPath:"#/$defs/native/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs89 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.cornerRadius !== undefined){
let data45 = data9.cornerRadius;
const _errs91 = errors;
if(!((typeof data45 == "number") && (isFinite(data45)))){
validate21.errors = [{instancePath:instancePath+"/native/cornerRadius",schemaPath:"#/$defs/native/properties/cornerRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs91 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.topLeftRadius !== undefined){
let data46 = data9.topLeftRadius;
const _errs93 = errors;
if(!((typeof data46 == "number") && (isFinite(data46)))){
validate21.errors = [{instancePath:instancePath+"/native/topLeftRadius",schemaPath:"#/$defs/native/properties/topLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs93 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.topRightRadius !== undefined){
let data47 = data9.topRightRadius;
const _errs95 = errors;
if(!((typeof data47 == "number") && (isFinite(data47)))){
validate21.errors = [{instancePath:instancePath+"/native/topRightRadius",schemaPath:"#/$defs/native/properties/topRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs95 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.bottomLeftRadius !== undefined){
let data48 = data9.bottomLeftRadius;
const _errs97 = errors;
if(!((typeof data48 == "number") && (isFinite(data48)))){
validate21.errors = [{instancePath:instancePath+"/native/bottomLeftRadius",schemaPath:"#/$defs/native/properties/bottomLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs97 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.bottomRightRadius !== undefined){
let data49 = data9.bottomRightRadius;
const _errs99 = errors;
if(!((typeof data49 == "number") && (isFinite(data49)))){
validate21.errors = [{instancePath:instancePath+"/native/bottomRightRadius",schemaPath:"#/$defs/native/properties/bottomRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs99 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.fillStyleId !== undefined){
const _errs101 = errors;
if(typeof data9.fillStyleId !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/fillStyleId",schemaPath:"#/$defs/native/properties/fillStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs101 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.strokeStyleId !== undefined){
const _errs103 = errors;
if(typeof data9.strokeStyleId !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/strokeStyleId",schemaPath:"#/$defs/native/properties/strokeStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs103 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textStyleId !== undefined){
const _errs105 = errors;
if(typeof data9.textStyleId !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/textStyleId",schemaPath:"#/$defs/native/properties/textStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs105 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.effectStyleId !== undefined){
const _errs107 = errors;
if(typeof data9.effectStyleId !== "string"){
validate21.errors = [{instancePath:instancePath+"/native/effectStyleId",schemaPath:"#/$defs/native/properties/effectStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs107 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.boundVariables !== undefined){
let data54 = data9.boundVariables;
const _errs109 = errors;
if(!(data54 && typeof data54 == "object" && !Array.isArray(data54))){
validate21.errors = [{instancePath:instancePath+"/native/boundVariables",schemaPath:"#/$defs/native/properties/boundVariables/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs109 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.explicitVariableModes !== undefined){
let data55 = data9.explicitVariableModes;
const _errs111 = errors;
if(!(data55 && typeof data55 == "object" && !Array.isArray(data55))){
validate21.errors = [{instancePath:instancePath+"/native/explicitVariableModes",schemaPath:"#/$defs/native/properties/explicitVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs111 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.resolvedVariableModes !== undefined){
let data56 = data9.resolvedVariableModes;
const _errs113 = errors;
if(!(data56 && typeof data56 == "object" && !Array.isArray(data56))){
validate21.errors = [{instancePath:instancePath+"/native/resolvedVariableModes",schemaPath:"#/$defs/native/properties/resolvedVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs113 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.componentProperties !== undefined){
let data57 = data9.componentProperties;
const _errs115 = errors;
if(!(data57 && typeof data57 == "object" && !Array.isArray(data57))){
validate21.errors = [{instancePath:instancePath+"/native/componentProperties",schemaPath:"#/$defs/native/properties/componentProperties/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs115 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.overrides !== undefined){
const _errs117 = errors;
if(!(Array.isArray(data9.overrides))){
validate21.errors = [{instancePath:instancePath+"/native/overrides",schemaPath:"#/$defs/native/properties/overrides/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs117 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.reactions !== undefined){
const _errs119 = errors;
if(!(Array.isArray(data9.reactions))){
validate21.errors = [{instancePath:instancePath+"/native/reactions",schemaPath:"#/$defs/native/properties/reactions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs119 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.exportSettings !== undefined){
const _errs121 = errors;
if(!(Array.isArray(data9.exportSettings))){
validate21.errors = [{instancePath:instancePath+"/native/exportSettings",schemaPath:"#/$defs/native/properties/exportSettings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs121 === errors;
}
else {
var valid5 = true;
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
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs19 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.tags !== undefined){
let data61 = data.tags;
const _errs123 = errors;
if(errors === _errs123){
if(data61 && typeof data61 == "object" && !Array.isArray(data61)){
if(Object.keys(data61).length > 100){
validate21.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/maxProperties",keyword:"maxProperties",params:{limit: 100},message:"must NOT have more than 100 properties"}];
return false;
}
else {
for(const key2 in data61){
let data62 = data61[key2];
const _errs126 = errors;
if(errors === _errs126){
if(Array.isArray(data62)){
if(data62.length > 100){
validate21.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
var valid7 = true;
const len1 = data62.length;
for(let i1=0; i1<len1; i1++){
let data63 = data62[i1];
const _errs128 = errors;
const _errs129 = errors;
let valid8 = false;
const _errs130 = errors;
if(errors === _errs130){
if(typeof data63 === "string"){
if(!pattern9.test(data63)){
const err0 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
}
else {
const err1 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
var _valid0 = _errs130 === errors;
valid8 = valid8 || _valid0;
const _errs132 = errors;
if(true !== data63){
const err2 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/1/const",keyword:"const",params:{allowedValue: true},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs132 === errors;
valid8 = valid8 || _valid0;
if(!valid8){
const err3 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate21.errors = vErrors;
return false;
}
else {
errors = _errs129;
if(vErrors !== null){
if(_errs129){
vErrors.length = _errs129;
}
else {
vErrors = null;
}
}
}
var valid7 = _errs128 === errors;
if(!valid7){
break;
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid6 = _errs126 === errors;
if(!valid6){
break;
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs123 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.supportsChildren !== undefined){
const _errs133 = errors;
if(typeof data.supportsChildren !== "boolean"){
validate21.errors = [{instancePath:instancePath+"/supportsChildren",schemaPath:"#/properties/supportsChildren/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid0 = _errs133 === errors;
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
}
}
}
}
}
}
}
else {
validate21.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate21.errors = vErrors;
return errors === 0;
}
validate21.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate20(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
/*# sourceURL="https://poliklot.github.io/bridge-design-methodology/schema/handoff.schema.json" */;
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
if(((((((((((data.format === undefined) && (missing0 = "format")) || ((data.schemaVersion === undefined) && (missing0 = "schemaVersion"))) || ((data.revision === undefined) && (missing0 = "revision"))) || ((data.generator === undefined) && (missing0 = "generator"))) || ((data.source === undefined) && (missing0 = "source"))) || ((data.scope === undefined) && (missing0 = "scope"))) || ((data.nodes === undefined) && (missing0 = "nodes"))) || ((data.dependencies === undefined) && (missing0 = "dependencies"))) || ((data.preflight === undefined) && (missing0 = "preflight"))) || ((data.coverage === undefined) && (missing0 = "coverage"))){
validate20.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(func1.call(schema31.properties, key0))){
validate20.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.format !== undefined){
const _errs2 = errors;
if("dfc-bridge-handoff" !== data.format){
validate20.errors = [{instancePath:instancePath+"/format",schemaPath:"#/properties/format/const",keyword:"const",params:{allowedValue: "dfc-bridge-handoff"},message:"must be equal to constant"}];
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
if(data.revision !== undefined){
let data2 = data.revision;
const _errs4 = errors;
if(errors === _errs4){
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs4 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.generator !== undefined){
let data3 = data.generator;
const _errs6 = errors;
if(errors === _errs6){
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
let missing1;
if(((data3.pluginVersion === undefined) && (missing1 = "pluginVersion")) || ((data3.validatorVersion === undefined) && (missing1 = "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs8 = errors;
for(const key1 in data3){
if(!((key1 === "pluginVersion") || (key1 === "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs8 === errors){
if(data3.pluginVersion !== undefined){
let data4 = data3.pluginVersion;
const _errs9 = errors;
if(errors === _errs9){
if(typeof data4 === "string"){
if(!pattern5.test(data4)){
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid1 = _errs9 === errors;
}
else {
var valid1 = true;
}
if(valid1){
if(data3.validatorVersion !== undefined){
let data5 = data3.validatorVersion;
const _errs11 = errors;
if(errors === _errs11){
if(typeof data5 === "string"){
if(!pattern5.test(data5)){
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid1 = _errs11 === errors;
}
else {
var valid1 = true;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs6 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.source !== undefined){
let data6 = data.source;
const _errs13 = errors;
if(errors === _errs13){
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
let missing2;
if((((data6.fileKey === undefined) && (missing2 = "fileKey")) || ((data6.figmaPageId === undefined) && (missing2 = "figmaPageId"))) || ((data6.figmaPageName === undefined) && (missing2 = "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
const _errs15 = errors;
for(const key2 in data6){
if(!(((key2 === "fileKey") || (key2 === "figmaPageId")) || (key2 === "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs15 === errors){
if(data6.fileKey !== undefined){
let data7 = data6.fileKey;
const _errs16 = errors;
const _errs17 = errors;
let valid3 = false;
const _errs18 = errors;
if(data7 !== null){
const err0 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
var _valid0 = _errs18 === errors;
valid3 = valid3 || _valid0;
const _errs20 = errors;
if(errors === _errs20){
if(typeof data7 === "string"){
if(!pattern7.test(data7)){
const err1 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9]{6,100}$"},message:"must match pattern \""+"^[A-Za-z0-9]{6,100}$"+"\""};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
else {
const err2 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
var _valid0 = _errs20 === errors;
valid3 = valid3 || _valid0;
if(!valid3){
const err3 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate20.errors = vErrors;
return false;
}
else {
errors = _errs17;
if(vErrors !== null){
if(_errs17){
vErrors.length = _errs17;
}
else {
vErrors = null;
}
}
}
var valid2 = _errs16 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data6.figmaPageId !== undefined){
let data8 = data6.figmaPageId;
const _errs22 = errors;
const _errs23 = errors;
if(errors === _errs23){
if(typeof data8 === "string"){
if(!pattern8.test(data8)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs22 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data6.figmaPageName !== undefined){
let data9 = data6.figmaPageName;
const _errs25 = errors;
if(errors === _errs25){
if(typeof data9 === "string"){
if(!pattern9.test(data9)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs25 === errors;
}
else {
var valid2 = true;
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs13 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.scope !== undefined){
let data10 = data.scope;
const _errs27 = errors;
if(errors === _errs27){
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
let missing3;
if(((((data10.kind === undefined) && (missing3 = "kind")) || ((data10.completeness === undefined) && (missing3 = "completeness"))) || ((data10.rootIds === undefined) && (missing3 = "rootIds"))) || ((data10.pageId === undefined) && (missing3 = "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/required",keyword:"required",params:{missingProperty: missing3},message:"must have required property '"+missing3+"'"}];
return false;
}
else {
const _errs29 = errors;
for(const key3 in data10){
if(!((((key3 === "kind") || (key3 === "completeness")) || (key3 === "rootIds")) || (key3 === "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs29 === errors){
if(data10.kind !== undefined){
let data11 = data10.kind;
const _errs30 = errors;
if(!((data11 === "page") || (data11 === "section"))){
validate20.errors = [{instancePath:instancePath+"/scope/kind",schemaPath:"#/properties/scope/properties/kind/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.kind.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid5 = _errs30 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data10.completeness !== undefined){
let data12 = data10.completeness;
const _errs31 = errors;
if(!((data12 === "full") || (data12 === "partial"))){
validate20.errors = [{instancePath:instancePath+"/scope/completeness",schemaPath:"#/properties/scope/properties/completeness/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.completeness.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid5 = _errs31 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data10.rootIds !== undefined){
let data13 = data10.rootIds;
const _errs32 = errors;
if(errors === _errs32){
if(Array.isArray(data13)){
if(data13.length > 1000){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/maxItems",keyword:"maxItems",params:{limit: 1000},message:"must NOT have more than 1000 items"}];
return false;
}
else {
if(data13.length < 1){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid6 = true;
const len0 = data13.length;
for(let i0=0; i0<len0; i0++){
let data14 = data13[i0];
const _errs34 = errors;
const _errs35 = errors;
if(errors === _errs35){
if(typeof data14 === "string"){
if(!pattern8.test(data14)){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i0,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i0,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid6 = _errs34 === errors;
if(!valid6){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid5 = _errs32 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data10.pageId !== undefined){
let data15 = data10.pageId;
const _errs37 = errors;
if(errors === _errs37){
if(typeof data15 === "string"){
if(!pattern9.test(data15)){
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid5 = _errs37 === errors;
}
else {
var valid5 = true;
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs27 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.nodes !== undefined){
let data16 = data.nodes;
const _errs39 = errors;
if(errors === _errs39){
if(Array.isArray(data16)){
if(data16.length > 10000){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
if(data16.length < 1){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid8 = true;
const len1 = data16.length;
for(let i1=0; i1<len1; i1++){
const _errs41 = errors;
if(!(validate21(data16[i1], {instancePath:instancePath+"/nodes/" + i1,parentData:data16,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var valid8 = _errs41 === errors;
if(!valid8){
break;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs39 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.dependencies !== undefined){
let data18 = data.dependencies;
const _errs42 = errors;
if(errors === _errs42){
if(Array.isArray(data18)){
if(data18.length > 10000){
validate20.errors = [{instancePath:instancePath+"/dependencies",schemaPath:"#/properties/dependencies/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid9 = true;
const len2 = data18.length;
for(let i2=0; i2<len2; i2++){
const _errs44 = errors;
if(!(validate21(data18[i2], {instancePath:instancePath+"/dependencies/" + i2,parentData:data18,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var valid9 = _errs44 === errors;
if(!valid9){
break;
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/dependencies",schemaPath:"#/properties/dependencies/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs42 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.preflight !== undefined){
let data20 = data.preflight;
const _errs45 = errors;
if(errors === _errs45){
if(data20 && typeof data20 == "object" && !Array.isArray(data20)){
let missing4;
if((((((data20.mode === undefined) && (missing4 = "mode")) || ((data20.scope === undefined) && (missing4 = "scope"))) || ((data20.status === undefined) && (missing4 = "status"))) || ((data20.issues === undefined) && (missing4 = "issues"))) || ((data20.summary === undefined) && (missing4 = "summary"))){
validate20.errors = [{instancePath:instancePath+"/preflight",schemaPath:"#/properties/preflight/required",keyword:"required",params:{missingProperty: missing4},message:"must have required property '"+missing4+"'"}];
return false;
}
else {
if(data20.mode !== undefined){
let data21 = data20.mode;
const _errs47 = errors;
if(!((data21 === "page") || (data21 === "section"))){
validate20.errors = [{instancePath:instancePath+"/preflight/mode",schemaPath:"#/properties/preflight/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.mode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid10 = _errs47 === errors;
}
else {
var valid10 = true;
}
if(valid10){
if(data20.scope !== undefined){
let data22 = data20.scope;
const _errs48 = errors;
if(!((data22 === "page") || (data22 === "selection"))){
validate20.errors = [{instancePath:instancePath+"/preflight/scope",schemaPath:"#/properties/preflight/properties/scope/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.scope.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid10 = _errs48 === errors;
}
else {
var valid10 = true;
}
if(valid10){
if(data20.status !== undefined){
let data23 = data20.status;
const _errs49 = errors;
if(!(((((data23 === "ready") || (data23 === "review")) || (data23 === "not-ready")) || (data23 === "partial")) || (data23 === "blocked"))){
validate20.errors = [{instancePath:instancePath+"/preflight/status",schemaPath:"#/properties/preflight/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid10 = _errs49 === errors;
}
else {
var valid10 = true;
}
if(valid10){
if(data20.issues !== undefined){
let data24 = data20.issues;
const _errs50 = errors;
if(errors === _errs50){
if(Array.isArray(data24)){
if(data24.length > 10000){
validate20.errors = [{instancePath:instancePath+"/preflight/issues",schemaPath:"#/properties/preflight/properties/issues/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid11 = true;
const len3 = data24.length;
for(let i3=0; i3<len3; i3++){
let data25 = data24[i3];
const _errs52 = errors;
if(errors === _errs52){
if(data25 && typeof data25 == "object" && !Array.isArray(data25)){
let missing5;
if((((data25.ruleId === undefined) && (missing5 = "ruleId")) || ((data25.severity === undefined) && (missing5 = "severity"))) || ((data25.nodeId === undefined) && (missing5 = "nodeId"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3,schemaPath:"#/properties/preflight/properties/issues/items/required",keyword:"required",params:{missingProperty: missing5},message:"must have required property '"+missing5+"'"}];
return false;
}
else {
if(data25.ruleId !== undefined){
let data26 = data25.ruleId;
const _errs54 = errors;
if(errors === _errs54){
if(typeof data26 === "string"){
if(!pattern18.test(data26)){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid12 = _errs54 === errors;
}
else {
var valid12 = true;
}
if(valid12){
if(data25.severity !== undefined){
let data27 = data25.severity;
const _errs56 = errors;
if(!(((data27 === "error") || (data27 === "warning")) || (data27 === "todo"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/severity",schemaPath:"#/properties/preflight/properties/issues/items/properties/severity/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.issues.items.properties.severity.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid12 = _errs56 === errors;
}
else {
var valid12 = true;
}
if(valid12){
if(data25.nodeId !== undefined){
const _errs57 = errors;
if(typeof data25.nodeId !== "string"){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/nodeId",schemaPath:"#/properties/preflight/properties/issues/items/properties/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid12 = _errs57 === errors;
}
else {
var valid12 = true;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3,schemaPath:"#/properties/preflight/properties/issues/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid11 = _errs52 === errors;
if(!valid11){
break;
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues",schemaPath:"#/properties/preflight/properties/issues/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid10 = _errs50 === errors;
}
else {
var valid10 = true;
}
if(valid10){
if(data20.summary !== undefined){
let data29 = data20.summary;
const _errs59 = errors;
if(!(data29 && typeof data29 == "object" && !Array.isArray(data29))){
validate20.errors = [{instancePath:instancePath+"/preflight/summary",schemaPath:"#/properties/preflight/properties/summary/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid10 = _errs59 === errors;
}
else {
var valid10 = true;
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight",schemaPath:"#/properties/preflight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs45 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.coverage !== undefined){
let data30 = data.coverage;
const _errs61 = errors;
if(errors === _errs61){
if(data30 && typeof data30 == "object" && !Array.isArray(data30)){
let missing6;
if((((((data30.instanceInteriors === undefined) && (missing6 = "instanceInteriors")) || ((data30.content === undefined) && (missing6 = "content"))) || ((data30.runtime === undefined) && (missing6 = "runtime"))) || ((data30.componentVariants === undefined) && (missing6 = "componentVariants"))) || ((data30.unavailable === undefined) && (missing6 = "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/required",keyword:"required",params:{missingProperty: missing6},message:"must have required property '"+missing6+"'"}];
return false;
}
else {
const _errs63 = errors;
for(const key4 in data30){
if(!(((((key4 === "instanceInteriors") || (key4 === "content")) || (key4 === "runtime")) || (key4 === "componentVariants")) || (key4 === "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs63 === errors){
if(data30.instanceInteriors !== undefined){
const _errs64 = errors;
if("atomic" !== data30.instanceInteriors){
validate20.errors = [{instancePath:instancePath+"/coverage/instanceInteriors",schemaPath:"#/properties/coverage/properties/instanceInteriors/const",keyword:"const",params:{allowedValue: "atomic"},message:"must be equal to constant"}];
return false;
}
var valid13 = _errs64 === errors;
}
else {
var valid13 = true;
}
if(valid13){
if(data30.content !== undefined){
const _errs65 = errors;
if("not-checked" !== data30.content){
validate20.errors = [{instancePath:instancePath+"/coverage/content",schemaPath:"#/properties/coverage/properties/content/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid13 = _errs65 === errors;
}
else {
var valid13 = true;
}
if(valid13){
if(data30.runtime !== undefined){
const _errs66 = errors;
if("not-checked" !== data30.runtime){
validate20.errors = [{instancePath:instancePath+"/coverage/runtime",schemaPath:"#/properties/coverage/properties/runtime/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid13 = _errs66 === errors;
}
else {
var valid13 = true;
}
if(valid13){
if(data30.componentVariants !== undefined){
const _errs67 = errors;
if("not-exported" !== data30.componentVariants){
validate20.errors = [{instancePath:instancePath+"/coverage/componentVariants",schemaPath:"#/properties/coverage/properties/componentVariants/const",keyword:"const",params:{allowedValue: "not-exported"},message:"must be equal to constant"}];
return false;
}
var valid13 = _errs67 === errors;
}
else {
var valid13 = true;
}
if(valid13){
if(data30.unavailable !== undefined){
let data35 = data30.unavailable;
const _errs68 = errors;
if(errors === _errs68){
if(Array.isArray(data35)){
if(data35.length > 10000){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable",schemaPath:"#/properties/coverage/properties/unavailable/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid14 = true;
const len4 = data35.length;
for(let i4=0; i4<len4; i4++){
let data36 = data35[i4];
const _errs70 = errors;
if(errors === _errs70){
if(data36 && typeof data36 == "object" && !Array.isArray(data36)){
let missing7;
if((((data36.nodeId === undefined) && (missing7 = "nodeId")) || ((data36.field === undefined) && (missing7 = "field"))) || ((data36.reason === undefined) && (missing7 = "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4,schemaPath:"#/properties/coverage/properties/unavailable/items/required",keyword:"required",params:{missingProperty: missing7},message:"must have required property '"+missing7+"'"}];
return false;
}
else {
const _errs72 = errors;
for(const key5 in data36){
if(!(((key5 === "nodeId") || (key5 === "field")) || (key5 === "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4,schemaPath:"#/properties/coverage/properties/unavailable/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs72 === errors){
if(data36.nodeId !== undefined){
let data37 = data36.nodeId;
const _errs73 = errors;
const _errs74 = errors;
if(errors === _errs74){
if(typeof data37 === "string"){
if(!pattern8.test(data37)){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/nodeId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/nodeId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid15 = _errs73 === errors;
}
else {
var valid15 = true;
}
if(valid15){
if(data36.field !== undefined){
const _errs76 = errors;
if(typeof data36.field !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/field",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/field/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid15 = _errs76 === errors;
}
else {
var valid15 = true;
}
if(valid15){
if(data36.reason !== undefined){
const _errs78 = errors;
if(typeof data36.reason !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/reason",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid15 = _errs78 === errors;
}
else {
var valid15 = true;
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4,schemaPath:"#/properties/coverage/properties/unavailable/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid14 = _errs70 === errors;
if(!valid14){
break;
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable",schemaPath:"#/properties/coverage/properties/unavailable/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid13 = _errs68 === errors;
}
else {
var valid13 = true;
}
}
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs61 === errors;
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
