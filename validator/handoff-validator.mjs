// Generated from handoff.schema.json; do not edit.
"use strict";
export const validate = validate20;
export default validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://poliklot.github.io/bridge-design-methodology/schema/handoff.schema.json","title":"DFC Bridge read-only developer snapshot","type":"object","additionalProperties":false,"required":["format","schemaVersion","revision","generator","source","scope","nodes","dependencies","preflight","coverage"],"properties":{"format":{"const":"dfc-bridge-handoff"},"schemaVersion":{"enum":[1,2]},"revision":{"type":"string","pattern":"^[a-f0-9]{64}$"},"generator":{"type":"object","additionalProperties":false,"required":["pluginVersion","validatorVersion"],"properties":{"pluginVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"},"validatorVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"}}},"source":{"type":"object","additionalProperties":false,"required":["fileKey","figmaPageId","figmaPageName"],"properties":{"fileKey":{"anyOf":[{"type":"null"},{"type":"string","pattern":"^[A-Za-z0-9]{6,100}$"}]},"figmaPageId":{"$ref":"#/$defs/nodeId"},"figmaPageName":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"scope":{"type":"object","additionalProperties":false,"required":["kind","completeness","rootIds","pageId"],"properties":{"kind":{"enum":["page","section"]},"completeness":{"enum":["full","partial"]},"rootIds":{"type":"array","minItems":1,"maxItems":1000,"items":{"$ref":"#/$defs/nodeId"}},"pageId":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"nodes":{"type":"array","minItems":1,"maxItems":10000,"items":{"$ref":"#/$defs/node"}},"dependencies":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/node"}},"preflight":{"type":"object","required":["mode","scope","status","issues","summary"],"properties":{"mode":{"enum":["page","section"]},"scope":{"enum":["page","selection"]},"status":{"enum":["ready","review","not-ready","partial","blocked"]},"issues":{"type":"array","maxItems":10000,"items":{"type":"object","required":["ruleId","severity","nodeId"],"properties":{"ruleId":{"type":"string","pattern":"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},"severity":{"enum":["error","warning","todo"]},"nodeId":{"type":"string"}}}},"summary":{"type":"object"}}},"coverage":{"type":"object","additionalProperties":false,"required":["instanceInteriors","content","runtime","componentVariants","unavailable"],"properties":{"instanceInteriors":{"const":"atomic"},"content":{"const":"not-checked"},"runtime":{"const":"not-checked"},"componentVariants":{"enum":["not-exported","inspected"]},"unavailable":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["nodeId","field","reason"],"properties":{"nodeId":{"$ref":"#/$defs/nodeId"},"field":{"type":"string"},"reason":{"type":"string"}}}}}},"componentInspection":{"$ref":"#/$defs/componentInspection"}},"$defs":{"nodeId":{"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},"nullableNodeId":{"anyOf":[{"type":"null"},{"$ref":"#/$defs/nodeId"}]},"node":{"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}},"native":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"}}},"inspectionNode":{"type":"object","additionalProperties":false,"required":["id","path","type","name","native","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"path":{"type":"string"},"type":{"type":"string"},"name":{"type":"string"},"native":{"$ref":"#/$defs/native"},"styles":{"type":"array","maxItems":10000,"items":{"type":"object"}},"variables":{"type":"array","maxItems":10000,"items":{"type":"object"}}}},"componentVariant":{"type":"object","additionalProperties":false,"required":["id","name","properties","nodes"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"properties":{"anyOf":[{"type":"object","additionalProperties":{"type":"string"}},{"type":"null"}]},"nodes":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/inspectionNode"}}}},"componentFamily":{"type":"object","additionalProperties":false,"required":["id","name","key","propertyDefinitions","axes","variants","remote","sourceFileKey","figmaPageId"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"key":{"anyOf":[{"type":"string"},{"type":"null"}]},"propertyDefinitions":{"anyOf":[{"type":"object"},{"type":"null"}]},"axes":{"anyOf":[{"type":"object"},{"type":"null"}]},"variants":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentVariant"}},"remote":{"type":["boolean","null"]},"sourceFileKey":{"type":["string","null"]},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"}}},"componentInspection":{"type":"object","additionalProperties":false,"required":["families","instances"],"properties":{"families":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentFamily"}},"instances":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["node","mainComponentId","familyId"],"properties":{"node":{"$ref":"#/$defs/inspectionNode"},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"familyId":{"$ref":"#/$defs/nullableNodeId"}}}}}}},"allOf":[{"if":{"properties":{"schemaVersion":{"const":2}}},"then":{"required":["componentInspection"],"properties":{"coverage":{"properties":{"componentVariants":{"const":"inspected"}},"type":"object"},"componentInspection":{"$ref":"#/$defs/componentInspection"}}},"else":{"properties":{"coverage":{"properties":{"componentVariants":{"const":"not-exported"}},"type":"object"},"componentInspection":false}}}]};
const schema34 = {"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"};
const schema32 = {"type":"object","additionalProperties":false,"required":["families","instances"],"properties":{"families":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentFamily"}},"instances":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["node","mainComponentId","familyId"],"properties":{"node":{"$ref":"#/$defs/inspectionNode"},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"familyId":{"$ref":"#/$defs/nullableNodeId"}}}}}};
const schema33 = {"type":"object","additionalProperties":false,"required":["id","name","key","propertyDefinitions","axes","variants","remote","sourceFileKey","figmaPageId"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"key":{"anyOf":[{"type":"string"},{"type":"null"}]},"propertyDefinitions":{"anyOf":[{"type":"object"},{"type":"null"}]},"axes":{"anyOf":[{"type":"object"},{"type":"null"}]},"variants":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentVariant"}},"remote":{"type":["boolean","null"]},"sourceFileKey":{"type":["string","null"]},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"}}};
const func1 = Object.prototype.hasOwnProperty;
const pattern4 = new RegExp("^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$", "u");
const schema35 = {"type":"object","additionalProperties":false,"required":["id","name","properties","nodes"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"properties":{"anyOf":[{"type":"object","additionalProperties":{"type":"string"}},{"type":"null"}]},"nodes":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/inspectionNode"}}}};
const schema37 = {"type":"object","additionalProperties":false,"required":["id","path","type","name","native","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"path":{"type":"string"},"type":{"type":"string"},"name":{"type":"string"},"native":{"$ref":"#/$defs/native"},"styles":{"type":"array","maxItems":10000,"items":{"type":"object"}},"variables":{"type":"array","maxItems":10000,"items":{"type":"object"}}}};
const schema39 = {"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"}}};

function validate24(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate24.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((((((data.id === undefined) && (missing0 = "id")) || ((data.path === undefined) && (missing0 = "path"))) || ((data.type === undefined) && (missing0 = "type"))) || ((data.name === undefined) && (missing0 = "name"))) || ((data.native === undefined) && (missing0 = "native"))) || ((data.styles === undefined) && (missing0 = "styles"))) || ((data.variables === undefined) && (missing0 = "variables"))){
validate24.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(((((((key0 === "id") || (key0 === "path")) || (key0 === "type")) || (key0 === "name")) || (key0 === "native")) || (key0 === "styles")) || (key0 === "variables"))){
validate24.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
if(!pattern4.test(data0)){
validate24.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate24.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.path !== undefined){
const _errs5 = errors;
if(typeof data.path !== "string"){
validate24.errors = [{instancePath:instancePath+"/path",schemaPath:"#/properties/path/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.type !== undefined){
const _errs7 = errors;
if(typeof data.type !== "string"){
validate24.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs7 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.name !== undefined){
const _errs9 = errors;
if(typeof data.name !== "string"){
validate24.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs9 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.native !== undefined){
let data4 = data.native;
const _errs11 = errors;
const _errs12 = errors;
if(errors === _errs12){
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
const _errs14 = errors;
for(const key1 in data4){
if(!(func1.call(schema39.properties, key1))){
validate24.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs14 === errors){
if(data4.x !== undefined){
let data5 = data4.x;
const _errs15 = errors;
if(!((typeof data5 == "number") && (isFinite(data5)))){
validate24.errors = [{instancePath:instancePath+"/native/x",schemaPath:"#/$defs/native/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs15 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.y !== undefined){
let data6 = data4.y;
const _errs17 = errors;
if(!((typeof data6 == "number") && (isFinite(data6)))){
validate24.errors = [{instancePath:instancePath+"/native/y",schemaPath:"#/$defs/native/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs17 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.width !== undefined){
let data7 = data4.width;
const _errs19 = errors;
if(errors === _errs19){
if((typeof data7 == "number") && (isFinite(data7))){
if(data7 < 0 || isNaN(data7)){
validate24.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate24.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid3 = _errs19 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.height !== undefined){
let data8 = data4.height;
const _errs21 = errors;
if(errors === _errs21){
if((typeof data8 == "number") && (isFinite(data8))){
if(data8 < 0 || isNaN(data8)){
validate24.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate24.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid3 = _errs21 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.visible !== undefined){
const _errs23 = errors;
if(typeof data4.visible !== "boolean"){
validate24.errors = [{instancePath:instancePath+"/native/visible",schemaPath:"#/$defs/native/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid3 = _errs23 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.isMask !== undefined){
const _errs25 = errors;
if(typeof data4.isMask !== "boolean"){
validate24.errors = [{instancePath:instancePath+"/native/isMask",schemaPath:"#/$defs/native/properties/isMask/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid3 = _errs25 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.opacity !== undefined){
let data11 = data4.opacity;
const _errs27 = errors;
if(!((typeof data11 == "number") && (isFinite(data11)))){
validate24.errors = [{instancePath:instancePath+"/native/opacity",schemaPath:"#/$defs/native/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs27 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutMode !== undefined){
let data12 = data4.layoutMode;
const _errs29 = errors;
if(!((((data12 === "NONE") || (data12 === "HORIZONTAL")) || (data12 === "VERTICAL")) || (data12 === "GRID"))){
validate24.errors = [{instancePath:instancePath+"/native/layoutMode",schemaPath:"#/$defs/native/properties/layoutMode/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutMode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid3 = _errs29 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutPositioning !== undefined){
let data13 = data4.layoutPositioning;
const _errs30 = errors;
if(!((data13 === "AUTO") || (data13 === "ABSOLUTE"))){
validate24.errors = [{instancePath:instancePath+"/native/layoutPositioning",schemaPath:"#/$defs/native/properties/layoutPositioning/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutPositioning.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid3 = _errs30 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutSizingHorizontal !== undefined){
const _errs31 = errors;
if(typeof data4.layoutSizingHorizontal !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/layoutSizingHorizontal",schemaPath:"#/$defs/native/properties/layoutSizingHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs31 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutSizingVertical !== undefined){
const _errs33 = errors;
if(typeof data4.layoutSizingVertical !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/layoutSizingVertical",schemaPath:"#/$defs/native/properties/layoutSizingVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs33 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.primaryAxisSizingMode !== undefined){
const _errs35 = errors;
if(typeof data4.primaryAxisSizingMode !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/primaryAxisSizingMode",schemaPath:"#/$defs/native/properties/primaryAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs35 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.counterAxisSizingMode !== undefined){
const _errs37 = errors;
if(typeof data4.counterAxisSizingMode !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/counterAxisSizingMode",schemaPath:"#/$defs/native/properties/counterAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs37 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.primaryAxisAlignItems !== undefined){
const _errs39 = errors;
if(typeof data4.primaryAxisAlignItems !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/primaryAxisAlignItems",schemaPath:"#/$defs/native/properties/primaryAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs39 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.counterAxisAlignItems !== undefined){
const _errs41 = errors;
if(typeof data4.counterAxisAlignItems !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/counterAxisAlignItems",schemaPath:"#/$defs/native/properties/counterAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs41 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutWrap !== undefined){
const _errs43 = errors;
if(typeof data4.layoutWrap !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/layoutWrap",schemaPath:"#/$defs/native/properties/layoutWrap/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs43 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paddingTop !== undefined){
let data21 = data4.paddingTop;
const _errs45 = errors;
if(!((typeof data21 == "number") && (isFinite(data21)))){
validate24.errors = [{instancePath:instancePath+"/native/paddingTop",schemaPath:"#/$defs/native/properties/paddingTop/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs45 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paddingRight !== undefined){
let data22 = data4.paddingRight;
const _errs47 = errors;
if(!((typeof data22 == "number") && (isFinite(data22)))){
validate24.errors = [{instancePath:instancePath+"/native/paddingRight",schemaPath:"#/$defs/native/properties/paddingRight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs47 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paddingBottom !== undefined){
let data23 = data4.paddingBottom;
const _errs49 = errors;
if(!((typeof data23 == "number") && (isFinite(data23)))){
validate24.errors = [{instancePath:instancePath+"/native/paddingBottom",schemaPath:"#/$defs/native/properties/paddingBottom/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs49 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paddingLeft !== undefined){
let data24 = data4.paddingLeft;
const _errs51 = errors;
if(!((typeof data24 == "number") && (isFinite(data24)))){
validate24.errors = [{instancePath:instancePath+"/native/paddingLeft",schemaPath:"#/$defs/native/properties/paddingLeft/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs51 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.itemSpacing !== undefined){
let data25 = data4.itemSpacing;
const _errs53 = errors;
if(!((typeof data25 == "number") && (isFinite(data25)))){
validate24.errors = [{instancePath:instancePath+"/native/itemSpacing",schemaPath:"#/$defs/native/properties/itemSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs53 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.characters !== undefined){
const _errs55 = errors;
if(typeof data4.characters !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/characters",schemaPath:"#/$defs/native/properties/characters/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs55 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.fontName !== undefined){
let data27 = data4.fontName;
const _errs57 = errors;
if(!(data27 && typeof data27 == "object" && !Array.isArray(data27))){
validate24.errors = [{instancePath:instancePath+"/native/fontName",schemaPath:"#/$defs/native/properties/fontName/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs57 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.fontSize !== undefined){
let data28 = data4.fontSize;
const _errs59 = errors;
if(!((typeof data28 == "number") && (isFinite(data28)))){
validate24.errors = [{instancePath:instancePath+"/native/fontSize",schemaPath:"#/$defs/native/properties/fontSize/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs59 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.fontWeight !== undefined){
let data29 = data4.fontWeight;
const _errs61 = errors;
if(!((typeof data29 == "number") && (isFinite(data29)))){
validate24.errors = [{instancePath:instancePath+"/native/fontWeight",schemaPath:"#/$defs/native/properties/fontWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs61 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.lineHeight !== undefined){
let data30 = data4.lineHeight;
const _errs63 = errors;
if(!(data30 && typeof data30 == "object" && !Array.isArray(data30))){
validate24.errors = [{instancePath:instancePath+"/native/lineHeight",schemaPath:"#/$defs/native/properties/lineHeight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs63 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.letterSpacing !== undefined){
let data31 = data4.letterSpacing;
const _errs65 = errors;
if(!(data31 && typeof data31 == "object" && !Array.isArray(data31))){
validate24.errors = [{instancePath:instancePath+"/native/letterSpacing",schemaPath:"#/$defs/native/properties/letterSpacing/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs65 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textAlignHorizontal !== undefined){
const _errs67 = errors;
if(typeof data4.textAlignHorizontal !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textAlignHorizontal",schemaPath:"#/$defs/native/properties/textAlignHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs67 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textAlignVertical !== undefined){
const _errs69 = errors;
if(typeof data4.textAlignVertical !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textAlignVertical",schemaPath:"#/$defs/native/properties/textAlignVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs69 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textAutoResize !== undefined){
const _errs71 = errors;
if(typeof data4.textAutoResize !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textAutoResize",schemaPath:"#/$defs/native/properties/textAutoResize/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs71 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.fills !== undefined){
const _errs73 = errors;
if(!(Array.isArray(data4.fills))){
validate24.errors = [{instancePath:instancePath+"/native/fills",schemaPath:"#/$defs/native/properties/fills/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs73 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.strokes !== undefined){
const _errs75 = errors;
if(!(Array.isArray(data4.strokes))){
validate24.errors = [{instancePath:instancePath+"/native/strokes",schemaPath:"#/$defs/native/properties/strokes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs75 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.strokeWeight !== undefined){
let data37 = data4.strokeWeight;
const _errs77 = errors;
if(!((typeof data37 == "number") && (isFinite(data37)))){
validate24.errors = [{instancePath:instancePath+"/native/strokeWeight",schemaPath:"#/$defs/native/properties/strokeWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs77 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.strokeAlign !== undefined){
const _errs79 = errors;
if(typeof data4.strokeAlign !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/strokeAlign",schemaPath:"#/$defs/native/properties/strokeAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs79 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.effects !== undefined){
const _errs81 = errors;
if(!(Array.isArray(data4.effects))){
validate24.errors = [{instancePath:instancePath+"/native/effects",schemaPath:"#/$defs/native/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs81 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.cornerRadius !== undefined){
let data40 = data4.cornerRadius;
const _errs83 = errors;
if(!((typeof data40 == "number") && (isFinite(data40)))){
validate24.errors = [{instancePath:instancePath+"/native/cornerRadius",schemaPath:"#/$defs/native/properties/cornerRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs83 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.topLeftRadius !== undefined){
let data41 = data4.topLeftRadius;
const _errs85 = errors;
if(!((typeof data41 == "number") && (isFinite(data41)))){
validate24.errors = [{instancePath:instancePath+"/native/topLeftRadius",schemaPath:"#/$defs/native/properties/topLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs85 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.topRightRadius !== undefined){
let data42 = data4.topRightRadius;
const _errs87 = errors;
if(!((typeof data42 == "number") && (isFinite(data42)))){
validate24.errors = [{instancePath:instancePath+"/native/topRightRadius",schemaPath:"#/$defs/native/properties/topRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs87 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.bottomLeftRadius !== undefined){
let data43 = data4.bottomLeftRadius;
const _errs89 = errors;
if(!((typeof data43 == "number") && (isFinite(data43)))){
validate24.errors = [{instancePath:instancePath+"/native/bottomLeftRadius",schemaPath:"#/$defs/native/properties/bottomLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs89 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.bottomRightRadius !== undefined){
let data44 = data4.bottomRightRadius;
const _errs91 = errors;
if(!((typeof data44 == "number") && (isFinite(data44)))){
validate24.errors = [{instancePath:instancePath+"/native/bottomRightRadius",schemaPath:"#/$defs/native/properties/bottomRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs91 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.fillStyleId !== undefined){
const _errs93 = errors;
if(typeof data4.fillStyleId !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/fillStyleId",schemaPath:"#/$defs/native/properties/fillStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs93 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.strokeStyleId !== undefined){
const _errs95 = errors;
if(typeof data4.strokeStyleId !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/strokeStyleId",schemaPath:"#/$defs/native/properties/strokeStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs95 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textStyleId !== undefined){
const _errs97 = errors;
if(typeof data4.textStyleId !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textStyleId",schemaPath:"#/$defs/native/properties/textStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs97 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.effectStyleId !== undefined){
const _errs99 = errors;
if(typeof data4.effectStyleId !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/effectStyleId",schemaPath:"#/$defs/native/properties/effectStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs99 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.boundVariables !== undefined){
let data49 = data4.boundVariables;
const _errs101 = errors;
if(!(data49 && typeof data49 == "object" && !Array.isArray(data49))){
validate24.errors = [{instancePath:instancePath+"/native/boundVariables",schemaPath:"#/$defs/native/properties/boundVariables/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs101 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.explicitVariableModes !== undefined){
let data50 = data4.explicitVariableModes;
const _errs103 = errors;
if(!(data50 && typeof data50 == "object" && !Array.isArray(data50))){
validate24.errors = [{instancePath:instancePath+"/native/explicitVariableModes",schemaPath:"#/$defs/native/properties/explicitVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs103 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.resolvedVariableModes !== undefined){
let data51 = data4.resolvedVariableModes;
const _errs105 = errors;
if(!(data51 && typeof data51 == "object" && !Array.isArray(data51))){
validate24.errors = [{instancePath:instancePath+"/native/resolvedVariableModes",schemaPath:"#/$defs/native/properties/resolvedVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs105 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.componentProperties !== undefined){
let data52 = data4.componentProperties;
const _errs107 = errors;
if(!(data52 && typeof data52 == "object" && !Array.isArray(data52))){
validate24.errors = [{instancePath:instancePath+"/native/componentProperties",schemaPath:"#/$defs/native/properties/componentProperties/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs107 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.overrides !== undefined){
const _errs109 = errors;
if(!(Array.isArray(data4.overrides))){
validate24.errors = [{instancePath:instancePath+"/native/overrides",schemaPath:"#/$defs/native/properties/overrides/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs109 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.reactions !== undefined){
const _errs111 = errors;
if(!(Array.isArray(data4.reactions))){
validate24.errors = [{instancePath:instancePath+"/native/reactions",schemaPath:"#/$defs/native/properties/reactions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs111 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.exportSettings !== undefined){
const _errs113 = errors;
if(!(Array.isArray(data4.exportSettings))){
validate24.errors = [{instancePath:instancePath+"/native/exportSettings",schemaPath:"#/$defs/native/properties/exportSettings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs113 === errors;
}
else {
var valid3 = true;
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
validate24.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs11 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.styles !== undefined){
let data56 = data.styles;
const _errs115 = errors;
if(errors === _errs115){
if(Array.isArray(data56)){
if(data56.length > 10000){
validate24.errors = [{instancePath:instancePath+"/styles",schemaPath:"#/properties/styles/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid4 = true;
const len0 = data56.length;
for(let i0=0; i0<len0; i0++){
let data57 = data56[i0];
const _errs117 = errors;
if(!(data57 && typeof data57 == "object" && !Array.isArray(data57))){
validate24.errors = [{instancePath:instancePath+"/styles/" + i0,schemaPath:"#/properties/styles/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid4 = _errs117 === errors;
if(!valid4){
break;
}
}
}
}
else {
validate24.errors = [{instancePath:instancePath+"/styles",schemaPath:"#/properties/styles/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs115 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.variables !== undefined){
let data58 = data.variables;
const _errs119 = errors;
if(errors === _errs119){
if(Array.isArray(data58)){
if(data58.length > 10000){
validate24.errors = [{instancePath:instancePath+"/variables",schemaPath:"#/properties/variables/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid5 = true;
const len1 = data58.length;
for(let i1=0; i1<len1; i1++){
let data59 = data58[i1];
const _errs121 = errors;
if(!(data59 && typeof data59 == "object" && !Array.isArray(data59))){
validate24.errors = [{instancePath:instancePath+"/variables/" + i1,schemaPath:"#/properties/variables/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs121 === errors;
if(!valid5){
break;
}
}
}
}
else {
validate24.errors = [{instancePath:instancePath+"/variables",schemaPath:"#/properties/variables/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs119 === errors;
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
else {
validate24.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate24.errors = vErrors;
return errors === 0;
}
validate24.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


function validate23(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate23.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((((data.id === undefined) && (missing0 = "id")) || ((data.name === undefined) && (missing0 = "name"))) || ((data.properties === undefined) && (missing0 = "properties"))) || ((data.nodes === undefined) && (missing0 = "nodes"))){
validate23.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!((((key0 === "id") || (key0 === "name")) || (key0 === "properties")) || (key0 === "nodes"))){
validate23.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
if(!pattern4.test(data0)){
validate23.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate23.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.name !== undefined){
const _errs5 = errors;
if(typeof data.name !== "string"){
validate23.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.properties !== undefined){
let data2 = data.properties;
const _errs7 = errors;
const _errs8 = errors;
let valid2 = false;
const _errs9 = errors;
if(errors === _errs9){
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
for(const key1 in data2){
const _errs12 = errors;
if(typeof data2[key1] !== "string"){
const err0 = {instancePath:instancePath+"/properties/" + key1.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/properties/anyOf/0/additionalProperties/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
var valid3 = _errs12 === errors;
if(!valid3){
break;
}
}
}
else {
const err1 = {instancePath:instancePath+"/properties",schemaPath:"#/properties/properties/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
var _valid0 = _errs9 === errors;
valid2 = valid2 || _valid0;
const _errs14 = errors;
if(data2 !== null){
const err2 = {instancePath:instancePath+"/properties",schemaPath:"#/properties/properties/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs14 === errors;
valid2 = valid2 || _valid0;
if(!valid2){
const err3 = {instancePath:instancePath+"/properties",schemaPath:"#/properties/properties/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate23.errors = vErrors;
return false;
}
else {
errors = _errs8;
if(vErrors !== null){
if(_errs8){
vErrors.length = _errs8;
}
else {
vErrors = null;
}
}
}
var valid0 = _errs7 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.nodes !== undefined){
let data4 = data.nodes;
const _errs16 = errors;
if(errors === _errs16){
if(Array.isArray(data4)){
if(data4.length > 10000){
validate23.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid4 = true;
const len0 = data4.length;
for(let i0=0; i0<len0; i0++){
const _errs18 = errors;
if(!(validate24(data4[i0], {instancePath:instancePath+"/nodes/" + i0,parentData:data4,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
var valid4 = _errs18 === errors;
if(!valid4){
break;
}
}
}
}
else {
validate23.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs16 === errors;
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
validate23.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate23.errors = vErrors;
return errors === 0;
}
validate23.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema40 = {"anyOf":[{"type":"null"},{"$ref":"#/$defs/nodeId"}]};

function validate27(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate27.evaluated;
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
if(!pattern4.test(data)){
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
validate27.errors = vErrors;
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
validate27.errors = vErrors;
return errors === 0;
}
validate27.evaluated = {"dynamicProps":false,"dynamicItems":false};


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
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((((((((data.id === undefined) && (missing0 = "id")) || ((data.name === undefined) && (missing0 = "name"))) || ((data.key === undefined) && (missing0 = "key"))) || ((data.propertyDefinitions === undefined) && (missing0 = "propertyDefinitions"))) || ((data.axes === undefined) && (missing0 = "axes"))) || ((data.variants === undefined) && (missing0 = "variants"))) || ((data.remote === undefined) && (missing0 = "remote"))) || ((data.sourceFileKey === undefined) && (missing0 = "sourceFileKey"))) || ((data.figmaPageId === undefined) && (missing0 = "figmaPageId"))){
validate22.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(func1.call(schema33.properties, key0))){
validate22.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
if(!pattern4.test(data0)){
validate22.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate22.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.name !== undefined){
const _errs5 = errors;
if(typeof data.name !== "string"){
validate22.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.key !== undefined){
let data2 = data.key;
const _errs7 = errors;
const _errs8 = errors;
let valid2 = false;
const _errs9 = errors;
if(typeof data2 !== "string"){
const err0 = {instancePath:instancePath+"/key",schemaPath:"#/properties/key/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err0];
}
else {
vErrors.push(err0);
}
errors++;
}
var _valid0 = _errs9 === errors;
valid2 = valid2 || _valid0;
const _errs11 = errors;
if(data2 !== null){
const err1 = {instancePath:instancePath+"/key",schemaPath:"#/properties/key/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
var _valid0 = _errs11 === errors;
valid2 = valid2 || _valid0;
if(!valid2){
const err2 = {instancePath:instancePath+"/key",schemaPath:"#/properties/key/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
validate22.errors = vErrors;
return false;
}
else {
errors = _errs8;
if(vErrors !== null){
if(_errs8){
vErrors.length = _errs8;
}
else {
vErrors = null;
}
}
}
var valid0 = _errs7 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.propertyDefinitions !== undefined){
let data3 = data.propertyDefinitions;
const _errs13 = errors;
const _errs14 = errors;
let valid3 = false;
const _errs15 = errors;
if(!(data3 && typeof data3 == "object" && !Array.isArray(data3))){
const err3 = {instancePath:instancePath+"/propertyDefinitions",schemaPath:"#/properties/propertyDefinitions/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
var _valid1 = _errs15 === errors;
valid3 = valid3 || _valid1;
const _errs17 = errors;
if(data3 !== null){
const err4 = {instancePath:instancePath+"/propertyDefinitions",schemaPath:"#/properties/propertyDefinitions/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
var _valid1 = _errs17 === errors;
valid3 = valid3 || _valid1;
if(!valid3){
const err5 = {instancePath:instancePath+"/propertyDefinitions",schemaPath:"#/properties/propertyDefinitions/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
validate22.errors = vErrors;
return false;
}
else {
errors = _errs14;
if(vErrors !== null){
if(_errs14){
vErrors.length = _errs14;
}
else {
vErrors = null;
}
}
}
var valid0 = _errs13 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.axes !== undefined){
let data4 = data.axes;
const _errs19 = errors;
const _errs20 = errors;
let valid4 = false;
const _errs21 = errors;
if(!(data4 && typeof data4 == "object" && !Array.isArray(data4))){
const err6 = {instancePath:instancePath+"/axes",schemaPath:"#/properties/axes/anyOf/0/type",keyword:"type",params:{type: "object"},message:"must be object"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var _valid2 = _errs21 === errors;
valid4 = valid4 || _valid2;
const _errs23 = errors;
if(data4 !== null){
const err7 = {instancePath:instancePath+"/axes",schemaPath:"#/properties/axes/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
var _valid2 = _errs23 === errors;
valid4 = valid4 || _valid2;
if(!valid4){
const err8 = {instancePath:instancePath+"/axes",schemaPath:"#/properties/axes/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
validate22.errors = vErrors;
return false;
}
else {
errors = _errs20;
if(vErrors !== null){
if(_errs20){
vErrors.length = _errs20;
}
else {
vErrors = null;
}
}
}
var valid0 = _errs19 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.variants !== undefined){
let data5 = data.variants;
const _errs25 = errors;
if(errors === _errs25){
if(Array.isArray(data5)){
if(data5.length > 10000){
validate22.errors = [{instancePath:instancePath+"/variants",schemaPath:"#/properties/variants/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid5 = true;
const len0 = data5.length;
for(let i0=0; i0<len0; i0++){
const _errs27 = errors;
if(!(validate23(data5[i0], {instancePath:instancePath+"/variants/" + i0,parentData:data5,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
errors = vErrors.length;
}
var valid5 = _errs27 === errors;
if(!valid5){
break;
}
}
}
}
else {
validate22.errors = [{instancePath:instancePath+"/variants",schemaPath:"#/properties/variants/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs25 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.remote !== undefined){
let data7 = data.remote;
const _errs28 = errors;
if((typeof data7 !== "boolean") && (data7 !== null)){
validate22.errors = [{instancePath:instancePath+"/remote",schemaPath:"#/properties/remote/type",keyword:"type",params:{type: schema33.properties.remote.type},message:"must be boolean,null"}];
return false;
}
var valid0 = _errs28 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.sourceFileKey !== undefined){
let data8 = data.sourceFileKey;
const _errs30 = errors;
if((typeof data8 !== "string") && (data8 !== null)){
validate22.errors = [{instancePath:instancePath+"/sourceFileKey",schemaPath:"#/properties/sourceFileKey/type",keyword:"type",params:{type: schema33.properties.sourceFileKey.type},message:"must be string,null"}];
return false;
}
var valid0 = _errs30 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.figmaPageId !== undefined){
const _errs32 = errors;
if(!(validate27(data.figmaPageId, {instancePath:instancePath+"/figmaPageId",parentData:data,parentDataProperty:"figmaPageId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
errors = vErrors.length;
}
var valid0 = _errs32 === errors;
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
else {
validate22.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate22.errors = vErrors;
return errors === 0;
}
validate22.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};


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
if(((data.families === undefined) && (missing0 = "families")) || ((data.instances === undefined) && (missing0 = "instances"))){
validate21.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!((key0 === "families") || (key0 === "instances"))){
validate21.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.families !== undefined){
let data0 = data.families;
const _errs2 = errors;
if(errors === _errs2){
if(Array.isArray(data0)){
if(data0.length > 10000){
validate21.errors = [{instancePath:instancePath+"/families",schemaPath:"#/properties/families/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid1 = true;
const len0 = data0.length;
for(let i0=0; i0<len0; i0++){
const _errs4 = errors;
if(!(validate22(data0[i0], {instancePath:instancePath+"/families/" + i0,parentData:data0,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
errors = vErrors.length;
}
var valid1 = _errs4 === errors;
if(!valid1){
break;
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/families",schemaPath:"#/properties/families/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.instances !== undefined){
let data2 = data.instances;
const _errs5 = errors;
if(errors === _errs5){
if(Array.isArray(data2)){
if(data2.length > 10000){
validate21.errors = [{instancePath:instancePath+"/instances",schemaPath:"#/properties/instances/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid2 = true;
const len1 = data2.length;
for(let i1=0; i1<len1; i1++){
let data3 = data2[i1];
const _errs7 = errors;
if(errors === _errs7){
if(data3 && typeof data3 == "object" && !Array.isArray(data3)){
let missing1;
if((((data3.node === undefined) && (missing1 = "node")) || ((data3.mainComponentId === undefined) && (missing1 = "mainComponentId"))) || ((data3.familyId === undefined) && (missing1 = "familyId"))){
validate21.errors = [{instancePath:instancePath+"/instances/" + i1,schemaPath:"#/properties/instances/items/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs9 = errors;
for(const key1 in data3){
if(!(((key1 === "node") || (key1 === "mainComponentId")) || (key1 === "familyId"))){
validate21.errors = [{instancePath:instancePath+"/instances/" + i1,schemaPath:"#/properties/instances/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs9 === errors){
if(data3.node !== undefined){
const _errs10 = errors;
if(!(validate24(data3.node, {instancePath:instancePath+"/instances/" + i1+"/node",parentData:data3,parentDataProperty:"node",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
errors = vErrors.length;
}
var valid3 = _errs10 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data3.mainComponentId !== undefined){
const _errs11 = errors;
if(!(validate27(data3.mainComponentId, {instancePath:instancePath+"/instances/" + i1+"/mainComponentId",parentData:data3,parentDataProperty:"mainComponentId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
errors = vErrors.length;
}
var valid3 = _errs11 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data3.familyId !== undefined){
const _errs12 = errors;
if(!(validate27(data3.familyId, {instancePath:instancePath+"/instances/" + i1+"/familyId",parentData:data3,parentDataProperty:"familyId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
errors = vErrors.length;
}
var valid3 = _errs12 === errors;
}
else {
var valid3 = true;
}
}
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/instances/" + i1,schemaPath:"#/properties/instances/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid2 = _errs7 === errors;
if(!valid2){
break;
}
}
}
}
else {
validate21.errors = [{instancePath:instancePath+"/instances",schemaPath:"#/properties/instances/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
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

const schema44 = {"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}};
const pattern17 = new RegExp("^[A-Z_]{1,80}$", "u");
const pattern13 = new RegExp("^[\\s\\S]{0,2400}$", "u");

function validate34(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate34.evaluated;
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
validate34.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(func1.call(schema44.properties, key0))){
validate34.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
if(!pattern4.test(data0)){
validate34.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
if(!pattern17.test(data1)){
validate34.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/pattern",keyword:"pattern",params:{pattern: "^[A-Z_]{1,80}$"},message:"must match pattern \""+"^[A-Z_]{1,80}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
if(!pattern13.test(data2)){
validate34.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
if(!(validate27(data.parentId, {instancePath:instancePath+"/parentId",parentData:data,parentDataProperty:"parentId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
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
validate34.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
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
if(!pattern4.test(data5)){
validate34.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
if(!(validate27(data.mainComponentId, {instancePath:instancePath+"/mainComponentId",parentData:data,parentDataProperty:"mainComponentId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
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
if(!(validate27(data.figmaPageId, {instancePath:instancePath+"/figmaPageId",parentData:data,parentDataProperty:"figmaPageId",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
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
validate34.errors = [{instancePath:instancePath+"/identity",schemaPath:"#/properties/identity/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs22 === errors){
if(data9.x !== undefined){
let data10 = data9.x;
const _errs23 = errors;
if(!((typeof data10 == "number") && (isFinite(data10)))){
validate34.errors = [{instancePath:instancePath+"/native/x",schemaPath:"#/$defs/native/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/y",schemaPath:"#/$defs/native/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/visible",schemaPath:"#/$defs/native/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
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
validate34.errors = [{instancePath:instancePath+"/native/isMask",schemaPath:"#/$defs/native/properties/isMask/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
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
validate34.errors = [{instancePath:instancePath+"/native/opacity",schemaPath:"#/$defs/native/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/layoutMode",schemaPath:"#/$defs/native/properties/layoutMode/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutMode.enum},message:"must be equal to one of the allowed values"}];
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
validate34.errors = [{instancePath:instancePath+"/native/layoutPositioning",schemaPath:"#/$defs/native/properties/layoutPositioning/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutPositioning.enum},message:"must be equal to one of the allowed values"}];
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
validate34.errors = [{instancePath:instancePath+"/native/layoutSizingHorizontal",schemaPath:"#/$defs/native/properties/layoutSizingHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/layoutSizingVertical",schemaPath:"#/$defs/native/properties/layoutSizingVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/primaryAxisSizingMode",schemaPath:"#/$defs/native/properties/primaryAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/counterAxisSizingMode",schemaPath:"#/$defs/native/properties/counterAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/primaryAxisAlignItems",schemaPath:"#/$defs/native/properties/primaryAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/counterAxisAlignItems",schemaPath:"#/$defs/native/properties/counterAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/layoutWrap",schemaPath:"#/$defs/native/properties/layoutWrap/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/paddingTop",schemaPath:"#/$defs/native/properties/paddingTop/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/paddingRight",schemaPath:"#/$defs/native/properties/paddingRight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/paddingBottom",schemaPath:"#/$defs/native/properties/paddingBottom/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/paddingLeft",schemaPath:"#/$defs/native/properties/paddingLeft/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/itemSpacing",schemaPath:"#/$defs/native/properties/itemSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/characters",schemaPath:"#/$defs/native/properties/characters/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/fontName",schemaPath:"#/$defs/native/properties/fontName/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/fontSize",schemaPath:"#/$defs/native/properties/fontSize/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/fontWeight",schemaPath:"#/$defs/native/properties/fontWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/lineHeight",schemaPath:"#/$defs/native/properties/lineHeight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/letterSpacing",schemaPath:"#/$defs/native/properties/letterSpacing/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/textAlignHorizontal",schemaPath:"#/$defs/native/properties/textAlignHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/textAlignVertical",schemaPath:"#/$defs/native/properties/textAlignVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/textAutoResize",schemaPath:"#/$defs/native/properties/textAutoResize/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/fills",schemaPath:"#/$defs/native/properties/fills/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native/strokes",schemaPath:"#/$defs/native/properties/strokes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native/strokeWeight",schemaPath:"#/$defs/native/properties/strokeWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/strokeAlign",schemaPath:"#/$defs/native/properties/strokeAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/effects",schemaPath:"#/$defs/native/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native/cornerRadius",schemaPath:"#/$defs/native/properties/cornerRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/topLeftRadius",schemaPath:"#/$defs/native/properties/topLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/topRightRadius",schemaPath:"#/$defs/native/properties/topRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/bottomLeftRadius",schemaPath:"#/$defs/native/properties/bottomLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/bottomRightRadius",schemaPath:"#/$defs/native/properties/bottomRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate34.errors = [{instancePath:instancePath+"/native/fillStyleId",schemaPath:"#/$defs/native/properties/fillStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/strokeStyleId",schemaPath:"#/$defs/native/properties/strokeStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/textStyleId",schemaPath:"#/$defs/native/properties/textStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/effectStyleId",schemaPath:"#/$defs/native/properties/effectStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate34.errors = [{instancePath:instancePath+"/native/boundVariables",schemaPath:"#/$defs/native/properties/boundVariables/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/explicitVariableModes",schemaPath:"#/$defs/native/properties/explicitVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/resolvedVariableModes",schemaPath:"#/$defs/native/properties/resolvedVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/componentProperties",schemaPath:"#/$defs/native/properties/componentProperties/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/native/overrides",schemaPath:"#/$defs/native/properties/overrides/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native/reactions",schemaPath:"#/$defs/native/properties/reactions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native/exportSettings",schemaPath:"#/$defs/native/properties/exportSettings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/maxProperties",keyword:"maxProperties",params:{limit: 100},message:"must NOT have more than 100 properties"}];
return false;
}
else {
for(const key2 in data61){
let data62 = data61[key2];
const _errs126 = errors;
if(errors === _errs126){
if(Array.isArray(data62)){
if(data62.length > 100){
validate34.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
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
if(!pattern13.test(data63)){
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
validate34.errors = vErrors;
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
validate34.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate34.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate34.errors = [{instancePath:instancePath+"/supportsChildren",schemaPath:"#/properties/supportsChildren/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
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
validate34.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate34.errors = vErrors;
return errors === 0;
}
validate34.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const pattern8 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern9 = new RegExp("^[0-9]+\\.[0-9]+\\.[0-9]+$", "u");
const pattern11 = new RegExp("^[A-Za-z0-9]{6,100}$", "u");
const pattern21 = new RegExp("^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$", "u");

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
const _errs2 = errors;
let valid1 = true;
const _errs3 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schemaVersion !== undefined){
if(2 !== data.schemaVersion){
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
var _valid0 = _errs3 === errors;
errors = _errs2;
if(vErrors !== null){
if(_errs2){
vErrors.length = _errs2;
}
else {
vErrors = null;
}
}
let ifClause0;
if(_valid0){
const _errs5 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((data.componentInspection === undefined) && (missing0 = "componentInspection")){
validate20.errors = [{instancePath,schemaPath:"#/allOf/0/then/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.coverage !== undefined){
let data1 = data.coverage;
const _errs6 = errors;
if(errors === _errs6){
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
if(data1.componentVariants !== undefined){
if("inspected" !== data1.componentVariants){
validate20.errors = [{instancePath:instancePath+"/coverage/componentVariants",schemaPath:"#/allOf/0/then/properties/coverage/properties/componentVariants/const",keyword:"const",params:{allowedValue: "inspected"},message:"must be equal to constant"}];
return false;
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/allOf/0/then/properties/coverage/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid3 = _errs6 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data.componentInspection !== undefined){
const _errs9 = errors;
if(!(validate21(data.componentInspection, {instancePath:instancePath+"/componentInspection",parentData:data,parentDataProperty:"componentInspection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var valid3 = _errs9 === errors;
}
else {
var valid3 = true;
}
}
}
}
var _valid0 = _errs5 === errors;
valid1 = _valid0;
if(valid1){
var props0 = {};
props0.coverage = true;
props0.componentInspection = true;
props0.schemaVersion = true;
}
ifClause0 = "then";
}
else {
const _errs10 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.coverage !== undefined){
let data4 = data.coverage;
const _errs11 = errors;
if(errors === _errs11){
if(data4 && typeof data4 == "object" && !Array.isArray(data4)){
if(data4.componentVariants !== undefined){
if("not-exported" !== data4.componentVariants){
validate20.errors = [{instancePath:instancePath+"/coverage/componentVariants",schemaPath:"#/allOf/0/else/properties/coverage/properties/componentVariants/const",keyword:"const",params:{allowedValue: "not-exported"},message:"must be equal to constant"}];
return false;
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/allOf/0/else/properties/coverage/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid5 = _errs11 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data.componentInspection !== undefined){
var valid5 = false;
validate20.errors = [{instancePath:instancePath+"/componentInspection",schemaPath:"#/allOf/0/else/properties/componentInspection/false schema",keyword:"false schema",params:{},message:"boolean schema is false"}];
return false;
}
else {
var valid5 = true;
}
}
}
var _valid0 = _errs10 === errors;
valid1 = _valid0;
if(valid1){
if(props0 !== true){
props0 = props0 || {};
props0.coverage = true;
props0.componentInspection = true;
}
}
ifClause0 = "else";
}
if(!valid1){
const err1 = {instancePath,schemaPath:"#/allOf/0/if",keyword:"if",params:{failingKeyword: ifClause0},message:"must match \""+ifClause0+"\" schema"};
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
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing1;
if(((((((((((data.format === undefined) && (missing1 = "format")) || ((data.schemaVersion === undefined) && (missing1 = "schemaVersion"))) || ((data.revision === undefined) && (missing1 = "revision"))) || ((data.generator === undefined) && (missing1 = "generator"))) || ((data.source === undefined) && (missing1 = "source"))) || ((data.scope === undefined) && (missing1 = "scope"))) || ((data.nodes === undefined) && (missing1 = "nodes"))) || ((data.dependencies === undefined) && (missing1 = "dependencies"))) || ((data.preflight === undefined) && (missing1 = "preflight"))) || ((data.coverage === undefined) && (missing1 = "coverage"))){
validate20.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs14 = errors;
for(const key0 in data){
if(!(func1.call(schema31.properties, key0))){
validate20.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs14 === errors){
if(data.format !== undefined){
const _errs15 = errors;
if("dfc-bridge-handoff" !== data.format){
validate20.errors = [{instancePath:instancePath+"/format",schemaPath:"#/properties/format/const",keyword:"const",params:{allowedValue: "dfc-bridge-handoff"},message:"must be equal to constant"}];
return false;
}
var valid7 = _errs15 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.schemaVersion !== undefined){
let data8 = data.schemaVersion;
const _errs16 = errors;
if(!((data8 === 1) || (data8 === 2))){
validate20.errors = [{instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/enum",keyword:"enum",params:{allowedValues: schema31.properties.schemaVersion.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid7 = _errs16 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.revision !== undefined){
let data9 = data.revision;
const _errs17 = errors;
if(errors === _errs17){
if(typeof data9 === "string"){
if(!pattern8.test(data9)){
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid7 = _errs17 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.generator !== undefined){
let data10 = data.generator;
const _errs19 = errors;
if(errors === _errs19){
if(data10 && typeof data10 == "object" && !Array.isArray(data10)){
let missing2;
if(((data10.pluginVersion === undefined) && (missing2 = "pluginVersion")) || ((data10.validatorVersion === undefined) && (missing2 = "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
const _errs21 = errors;
for(const key1 in data10){
if(!((key1 === "pluginVersion") || (key1 === "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs21 === errors){
if(data10.pluginVersion !== undefined){
let data11 = data10.pluginVersion;
const _errs22 = errors;
if(errors === _errs22){
if(typeof data11 === "string"){
if(!pattern9.test(data11)){
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid8 = _errs22 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data10.validatorVersion !== undefined){
let data12 = data10.validatorVersion;
const _errs24 = errors;
if(errors === _errs24){
if(typeof data12 === "string"){
if(!pattern9.test(data12)){
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid8 = _errs24 === errors;
}
else {
var valid8 = true;
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
var valid7 = _errs19 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.source !== undefined){
let data13 = data.source;
const _errs26 = errors;
if(errors === _errs26){
if(data13 && typeof data13 == "object" && !Array.isArray(data13)){
let missing3;
if((((data13.fileKey === undefined) && (missing3 = "fileKey")) || ((data13.figmaPageId === undefined) && (missing3 = "figmaPageId"))) || ((data13.figmaPageName === undefined) && (missing3 = "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/required",keyword:"required",params:{missingProperty: missing3},message:"must have required property '"+missing3+"'"}];
return false;
}
else {
const _errs28 = errors;
for(const key2 in data13){
if(!(((key2 === "fileKey") || (key2 === "figmaPageId")) || (key2 === "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs28 === errors){
if(data13.fileKey !== undefined){
let data14 = data13.fileKey;
const _errs29 = errors;
const _errs30 = errors;
let valid10 = false;
const _errs31 = errors;
if(data14 !== null){
const err2 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid1 = _errs31 === errors;
valid10 = valid10 || _valid1;
const _errs33 = errors;
if(errors === _errs33){
if(typeof data14 === "string"){
if(!pattern11.test(data14)){
const err3 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9]{6,100}$"},message:"must match pattern \""+"^[A-Za-z0-9]{6,100}$"+"\""};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
}
}
else {
const err4 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
var _valid1 = _errs33 === errors;
valid10 = valid10 || _valid1;
if(!valid10){
const err5 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
validate20.errors = vErrors;
return false;
}
else {
errors = _errs30;
if(vErrors !== null){
if(_errs30){
vErrors.length = _errs30;
}
else {
vErrors = null;
}
}
}
var valid9 = _errs29 === errors;
}
else {
var valid9 = true;
}
if(valid9){
if(data13.figmaPageId !== undefined){
let data15 = data13.figmaPageId;
const _errs35 = errors;
const _errs36 = errors;
if(errors === _errs36){
if(typeof data15 === "string"){
if(!pattern4.test(data15)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid9 = _errs35 === errors;
}
else {
var valid9 = true;
}
if(valid9){
if(data13.figmaPageName !== undefined){
let data16 = data13.figmaPageName;
const _errs38 = errors;
if(errors === _errs38){
if(typeof data16 === "string"){
if(!pattern13.test(data16)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid9 = _errs38 === errors;
}
else {
var valid9 = true;
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
var valid7 = _errs26 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.scope !== undefined){
let data17 = data.scope;
const _errs40 = errors;
if(errors === _errs40){
if(data17 && typeof data17 == "object" && !Array.isArray(data17)){
let missing4;
if(((((data17.kind === undefined) && (missing4 = "kind")) || ((data17.completeness === undefined) && (missing4 = "completeness"))) || ((data17.rootIds === undefined) && (missing4 = "rootIds"))) || ((data17.pageId === undefined) && (missing4 = "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/required",keyword:"required",params:{missingProperty: missing4},message:"must have required property '"+missing4+"'"}];
return false;
}
else {
const _errs42 = errors;
for(const key3 in data17){
if(!((((key3 === "kind") || (key3 === "completeness")) || (key3 === "rootIds")) || (key3 === "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs42 === errors){
if(data17.kind !== undefined){
let data18 = data17.kind;
const _errs43 = errors;
if(!((data18 === "page") || (data18 === "section"))){
validate20.errors = [{instancePath:instancePath+"/scope/kind",schemaPath:"#/properties/scope/properties/kind/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.kind.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid12 = _errs43 === errors;
}
else {
var valid12 = true;
}
if(valid12){
if(data17.completeness !== undefined){
let data19 = data17.completeness;
const _errs44 = errors;
if(!((data19 === "full") || (data19 === "partial"))){
validate20.errors = [{instancePath:instancePath+"/scope/completeness",schemaPath:"#/properties/scope/properties/completeness/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.completeness.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid12 = _errs44 === errors;
}
else {
var valid12 = true;
}
if(valid12){
if(data17.rootIds !== undefined){
let data20 = data17.rootIds;
const _errs45 = errors;
if(errors === _errs45){
if(Array.isArray(data20)){
if(data20.length > 1000){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/maxItems",keyword:"maxItems",params:{limit: 1000},message:"must NOT have more than 1000 items"}];
return false;
}
else {
if(data20.length < 1){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid13 = true;
const len0 = data20.length;
for(let i0=0; i0<len0; i0++){
let data21 = data20[i0];
const _errs47 = errors;
const _errs48 = errors;
if(errors === _errs48){
if(typeof data21 === "string"){
if(!pattern4.test(data21)){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i0,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i0,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid13 = _errs47 === errors;
if(!valid13){
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
var valid12 = _errs45 === errors;
}
else {
var valid12 = true;
}
if(valid12){
if(data17.pageId !== undefined){
let data22 = data17.pageId;
const _errs50 = errors;
if(errors === _errs50){
if(typeof data22 === "string"){
if(!pattern13.test(data22)){
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid12 = _errs50 === errors;
}
else {
var valid12 = true;
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
var valid7 = _errs40 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.nodes !== undefined){
let data23 = data.nodes;
const _errs52 = errors;
if(errors === _errs52){
if(Array.isArray(data23)){
if(data23.length > 10000){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
if(data23.length < 1){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid15 = true;
const len1 = data23.length;
for(let i1=0; i1<len1; i1++){
const _errs54 = errors;
if(!(validate34(data23[i1], {instancePath:instancePath+"/nodes/" + i1,parentData:data23,parentDataProperty:i1,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
errors = vErrors.length;
}
var valid15 = _errs54 === errors;
if(!valid15){
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
var valid7 = _errs52 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.dependencies !== undefined){
let data25 = data.dependencies;
const _errs55 = errors;
if(errors === _errs55){
if(Array.isArray(data25)){
if(data25.length > 10000){
validate20.errors = [{instancePath:instancePath+"/dependencies",schemaPath:"#/properties/dependencies/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid16 = true;
const len2 = data25.length;
for(let i2=0; i2<len2; i2++){
const _errs57 = errors;
if(!(validate34(data25[i2], {instancePath:instancePath+"/dependencies/" + i2,parentData:data25,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
errors = vErrors.length;
}
var valid16 = _errs57 === errors;
if(!valid16){
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
var valid7 = _errs55 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.preflight !== undefined){
let data27 = data.preflight;
const _errs58 = errors;
if(errors === _errs58){
if(data27 && typeof data27 == "object" && !Array.isArray(data27)){
let missing5;
if((((((data27.mode === undefined) && (missing5 = "mode")) || ((data27.scope === undefined) && (missing5 = "scope"))) || ((data27.status === undefined) && (missing5 = "status"))) || ((data27.issues === undefined) && (missing5 = "issues"))) || ((data27.summary === undefined) && (missing5 = "summary"))){
validate20.errors = [{instancePath:instancePath+"/preflight",schemaPath:"#/properties/preflight/required",keyword:"required",params:{missingProperty: missing5},message:"must have required property '"+missing5+"'"}];
return false;
}
else {
if(data27.mode !== undefined){
let data28 = data27.mode;
const _errs60 = errors;
if(!((data28 === "page") || (data28 === "section"))){
validate20.errors = [{instancePath:instancePath+"/preflight/mode",schemaPath:"#/properties/preflight/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.mode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid17 = _errs60 === errors;
}
else {
var valid17 = true;
}
if(valid17){
if(data27.scope !== undefined){
let data29 = data27.scope;
const _errs61 = errors;
if(!((data29 === "page") || (data29 === "selection"))){
validate20.errors = [{instancePath:instancePath+"/preflight/scope",schemaPath:"#/properties/preflight/properties/scope/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.scope.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid17 = _errs61 === errors;
}
else {
var valid17 = true;
}
if(valid17){
if(data27.status !== undefined){
let data30 = data27.status;
const _errs62 = errors;
if(!(((((data30 === "ready") || (data30 === "review")) || (data30 === "not-ready")) || (data30 === "partial")) || (data30 === "blocked"))){
validate20.errors = [{instancePath:instancePath+"/preflight/status",schemaPath:"#/properties/preflight/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid17 = _errs62 === errors;
}
else {
var valid17 = true;
}
if(valid17){
if(data27.issues !== undefined){
let data31 = data27.issues;
const _errs63 = errors;
if(errors === _errs63){
if(Array.isArray(data31)){
if(data31.length > 10000){
validate20.errors = [{instancePath:instancePath+"/preflight/issues",schemaPath:"#/properties/preflight/properties/issues/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid18 = true;
const len3 = data31.length;
for(let i3=0; i3<len3; i3++){
let data32 = data31[i3];
const _errs65 = errors;
if(errors === _errs65){
if(data32 && typeof data32 == "object" && !Array.isArray(data32)){
let missing6;
if((((data32.ruleId === undefined) && (missing6 = "ruleId")) || ((data32.severity === undefined) && (missing6 = "severity"))) || ((data32.nodeId === undefined) && (missing6 = "nodeId"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3,schemaPath:"#/properties/preflight/properties/issues/items/required",keyword:"required",params:{missingProperty: missing6},message:"must have required property '"+missing6+"'"}];
return false;
}
else {
if(data32.ruleId !== undefined){
let data33 = data32.ruleId;
const _errs67 = errors;
if(errors === _errs67){
if(typeof data33 === "string"){
if(!pattern21.test(data33)){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid19 = _errs67 === errors;
}
else {
var valid19 = true;
}
if(valid19){
if(data32.severity !== undefined){
let data34 = data32.severity;
const _errs69 = errors;
if(!(((data34 === "error") || (data34 === "warning")) || (data34 === "todo"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/severity",schemaPath:"#/properties/preflight/properties/issues/items/properties/severity/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.issues.items.properties.severity.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid19 = _errs69 === errors;
}
else {
var valid19 = true;
}
if(valid19){
if(data32.nodeId !== undefined){
const _errs70 = errors;
if(typeof data32.nodeId !== "string"){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i3+"/nodeId",schemaPath:"#/properties/preflight/properties/issues/items/properties/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid19 = _errs70 === errors;
}
else {
var valid19 = true;
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
var valid18 = _errs65 === errors;
if(!valid18){
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
var valid17 = _errs63 === errors;
}
else {
var valid17 = true;
}
if(valid17){
if(data27.summary !== undefined){
let data36 = data27.summary;
const _errs72 = errors;
if(!(data36 && typeof data36 == "object" && !Array.isArray(data36))){
validate20.errors = [{instancePath:instancePath+"/preflight/summary",schemaPath:"#/properties/preflight/properties/summary/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid17 = _errs72 === errors;
}
else {
var valid17 = true;
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
var valid7 = _errs58 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.coverage !== undefined){
let data37 = data.coverage;
const _errs74 = errors;
if(errors === _errs74){
if(data37 && typeof data37 == "object" && !Array.isArray(data37)){
let missing7;
if((((((data37.instanceInteriors === undefined) && (missing7 = "instanceInteriors")) || ((data37.content === undefined) && (missing7 = "content"))) || ((data37.runtime === undefined) && (missing7 = "runtime"))) || ((data37.componentVariants === undefined) && (missing7 = "componentVariants"))) || ((data37.unavailable === undefined) && (missing7 = "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/required",keyword:"required",params:{missingProperty: missing7},message:"must have required property '"+missing7+"'"}];
return false;
}
else {
const _errs76 = errors;
for(const key4 in data37){
if(!(((((key4 === "instanceInteriors") || (key4 === "content")) || (key4 === "runtime")) || (key4 === "componentVariants")) || (key4 === "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs76 === errors){
if(data37.instanceInteriors !== undefined){
const _errs77 = errors;
if("atomic" !== data37.instanceInteriors){
validate20.errors = [{instancePath:instancePath+"/coverage/instanceInteriors",schemaPath:"#/properties/coverage/properties/instanceInteriors/const",keyword:"const",params:{allowedValue: "atomic"},message:"must be equal to constant"}];
return false;
}
var valid20 = _errs77 === errors;
}
else {
var valid20 = true;
}
if(valid20){
if(data37.content !== undefined){
const _errs78 = errors;
if("not-checked" !== data37.content){
validate20.errors = [{instancePath:instancePath+"/coverage/content",schemaPath:"#/properties/coverage/properties/content/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid20 = _errs78 === errors;
}
else {
var valid20 = true;
}
if(valid20){
if(data37.runtime !== undefined){
const _errs79 = errors;
if("not-checked" !== data37.runtime){
validate20.errors = [{instancePath:instancePath+"/coverage/runtime",schemaPath:"#/properties/coverage/properties/runtime/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid20 = _errs79 === errors;
}
else {
var valid20 = true;
}
if(valid20){
if(data37.componentVariants !== undefined){
let data41 = data37.componentVariants;
const _errs80 = errors;
if(!((data41 === "not-exported") || (data41 === "inspected"))){
validate20.errors = [{instancePath:instancePath+"/coverage/componentVariants",schemaPath:"#/properties/coverage/properties/componentVariants/enum",keyword:"enum",params:{allowedValues: schema31.properties.coverage.properties.componentVariants.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid20 = _errs80 === errors;
}
else {
var valid20 = true;
}
if(valid20){
if(data37.unavailable !== undefined){
let data42 = data37.unavailable;
const _errs81 = errors;
if(errors === _errs81){
if(Array.isArray(data42)){
if(data42.length > 10000){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable",schemaPath:"#/properties/coverage/properties/unavailable/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid21 = true;
const len4 = data42.length;
for(let i4=0; i4<len4; i4++){
let data43 = data42[i4];
const _errs83 = errors;
if(errors === _errs83){
if(data43 && typeof data43 == "object" && !Array.isArray(data43)){
let missing8;
if((((data43.nodeId === undefined) && (missing8 = "nodeId")) || ((data43.field === undefined) && (missing8 = "field"))) || ((data43.reason === undefined) && (missing8 = "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4,schemaPath:"#/properties/coverage/properties/unavailable/items/required",keyword:"required",params:{missingProperty: missing8},message:"must have required property '"+missing8+"'"}];
return false;
}
else {
const _errs85 = errors;
for(const key5 in data43){
if(!(((key5 === "nodeId") || (key5 === "field")) || (key5 === "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4,schemaPath:"#/properties/coverage/properties/unavailable/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs85 === errors){
if(data43.nodeId !== undefined){
let data44 = data43.nodeId;
const _errs86 = errors;
const _errs87 = errors;
if(errors === _errs87){
if(typeof data44 === "string"){
if(!pattern4.test(data44)){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/nodeId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/nodeId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid22 = _errs86 === errors;
}
else {
var valid22 = true;
}
if(valid22){
if(data43.field !== undefined){
const _errs89 = errors;
if(typeof data43.field !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/field",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/field/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid22 = _errs89 === errors;
}
else {
var valid22 = true;
}
if(valid22){
if(data43.reason !== undefined){
const _errs91 = errors;
if(typeof data43.reason !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i4+"/reason",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid22 = _errs91 === errors;
}
else {
var valid22 = true;
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
var valid21 = _errs83 === errors;
if(!valid21){
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
var valid20 = _errs81 === errors;
}
else {
var valid20 = true;
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
var valid7 = _errs74 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data.componentInspection !== undefined){
const _errs93 = errors;
if(!(validate21(data.componentInspection, {instancePath:instancePath+"/componentInspection",parentData:data,parentDataProperty:"componentInspection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var valid7 = _errs93 === errors;
}
else {
var valid7 = true;
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
validate20.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};
