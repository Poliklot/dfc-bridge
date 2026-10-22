// Generated from handoff.schema.json; do not edit.
"use strict";
export const validate = validate20;
export default validate20;
const schema31 = {"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"https://poliklot.github.io/bridge-design-methodology/schema/handoff.schema.json","title":"DFC Bridge read-only developer snapshot","type":"object","additionalProperties":false,"required":["format","schemaVersion","revision","generator","source","scope","nodes","dependencies","preflight","coverage"],"properties":{"format":{"const":"dfc-bridge-handoff"},"schemaVersion":{"enum":[1,2,3,4]},"revision":{"type":"string","pattern":"^[a-f0-9]{64}$"},"generator":{"type":"object","additionalProperties":false,"required":["pluginVersion","validatorVersion"],"properties":{"pluginVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"},"validatorVersion":{"type":"string","pattern":"^[0-9]+\\.[0-9]+\\.[0-9]+$"}}},"source":{"type":"object","additionalProperties":false,"required":["fileKey","figmaPageId","figmaPageName"],"properties":{"fileKey":{"anyOf":[{"type":"null"},{"type":"string","pattern":"^[A-Za-z0-9]{6,100}$"}]},"figmaPageId":{"$ref":"#/$defs/nodeId"},"figmaPageName":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"scope":{"type":"object","additionalProperties":false,"required":["kind","completeness","rootIds","pageId"],"properties":{"kind":{"enum":["page","section"]},"completeness":{"enum":["full","partial"]},"rootIds":{"type":"array","minItems":1,"maxItems":1000,"items":{"$ref":"#/$defs/nodeId"}},"pageId":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"}}},"nodes":{"type":"array","minItems":1,"maxItems":10000,"items":{"$ref":"#/$defs/node"}},"dependencies":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/node"}},"preflight":{"type":"object","required":["mode","scope","status","issues","summary"],"properties":{"mode":{"enum":["page","section"]},"scope":{"enum":["page","selection"]},"status":{"enum":["ready","review","not-ready","partial","blocked"]},"issues":{"type":"array","maxItems":10000,"items":{"type":"object","required":["ruleId","severity","nodeId"],"properties":{"ruleId":{"type":"string","pattern":"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},"severity":{"enum":["error","warning","todo"]},"nodeId":{"type":"string"}}}},"summary":{"type":"object"}}},"coverage":{"type":"object","additionalProperties":false,"required":["instanceInteriors","content","runtime","componentVariants","unavailable"],"properties":{"instanceInteriors":{"const":"atomic"},"content":{"const":"not-checked"},"runtime":{"const":"not-checked"},"componentVariants":{"enum":["not-exported","inspected"]},"unavailable":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["nodeId","field","reason"],"properties":{"nodeId":{"$ref":"#/$defs/nodeId"},"field":{"type":"string"},"reason":{"type":"string"}}}}}},"componentInspection":{"$ref":"#/$defs/componentInspection"},"visualInspection":{"$ref":"#/$defs/visualInspection"},"sourceBindings":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/sourceBinding"}}},"$defs":{"nodeId":{"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},"nullableNodeId":{"anyOf":[{"type":"null"},{"$ref":"#/$defs/nodeId"}]},"node":{"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}},"native":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"},"blendMode":{"type":"string"},"clipsContent":{"type":"boolean"},"relativeTransform":{"type":"array"},"absoluteTransform":{"type":"array"},"rotation":{"type":"number"},"minWidth":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"maxWidth":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"minHeight":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"maxHeight":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"layoutGrow":{"type":"number"},"counterAxisSpacing":{"type":"number"},"paragraphIndent":{"type":"number"},"paragraphSpacing":{"type":"number"},"listSpacing":{"type":"number"},"layoutAlign":{"type":"string"},"textCase":{"type":"string"},"textDecoration":{"type":"string"},"constraints":{"type":"object"}}},"inspectionNode":{"type":"object","additionalProperties":false,"required":["id","path","type","name","native","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"path":{"type":"string"},"type":{"type":"string"},"name":{"type":"string"},"native":{"$ref":"#/$defs/native"},"styles":{"type":"array","maxItems":10000,"items":{"type":"object"}},"variables":{"type":"array","maxItems":10000,"items":{"type":"object"}}}},"componentVariant":{"type":"object","additionalProperties":false,"required":["id","name","properties","nodes"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"properties":{"anyOf":[{"type":"object","additionalProperties":{"type":"string"}},{"type":"null"}]},"nodes":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/inspectionNode"}}}},"componentFamily":{"type":"object","additionalProperties":false,"required":["id","name","key","propertyDefinitions","axes","variants","remote","sourceFileKey","figmaPageId"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"key":{"anyOf":[{"type":"string"},{"type":"null"}]},"propertyDefinitions":{"anyOf":[{"type":"object"},{"type":"null"}]},"axes":{"anyOf":[{"type":"object"},{"type":"null"}]},"variants":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentVariant"}},"remote":{"type":["boolean","null"]},"sourceFileKey":{"type":["string","null"]},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"}}},"componentInspection":{"type":"object","additionalProperties":false,"required":["families","instances"],"properties":{"families":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentFamily"}},"instances":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["node","mainComponentId","familyId"],"properties":{"node":{"$ref":"#/$defs/inspectionNode"},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"familyId":{"$ref":"#/$defs/nullableNodeId"}}}}}},"visualInspection":{"type":"object","additionalProperties":false,"required":["nodes","images"],"properties":{"nodes":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["id","rootId","parentId","childIndex","native","children"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"rootId":{"$ref":"#/$defs/nodeId"},"parentId":{"anyOf":[{"$ref":"#/$defs/nodeId"},{"type":"null"}]},"childIndex":{"type":"integer","minimum":0},"native":{"$ref":"#/$defs/native"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}}}}},"images":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["imageHash","width","height","reason"],"properties":{"imageHash":{"type":"string","pattern":"^[a-f0-9]{40}$"},"width":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}]},"height":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}]},"reason":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{1,2400}$"},{"type":"null"}]}}}}}},"sourceBinding":{"type":"object","additionalProperties":false,"required":["id","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"styles":{"type":"array","maxItems":4,"items":{"$ref":"#/$defs/resolvedSourceStyle"}},"variables":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/resolvedSourceVariable"}}}},"resolvedSourceStyle":{"type":"object","additionalProperties":false,"required":["field","id","name","type","value"],"properties":{"field":{"enum":["fillStyleId","strokeStyleId","textStyleId","effectStyleId"]},"id":{"type":"string"},"name":{"type":"string"},"type":{"type":"string"},"value":{"type":"object"}}},"resolvedSourceVariable":{"type":"object","additionalProperties":false,"required":["path","id","name","collectionId","collectionName","modes","valuesByMode","resolved"],"properties":{"path":{"type":"string"},"id":{"type":"string"},"name":{"type":"string"},"collectionId":{"type":"string"},"collectionName":{"type":"string"},"modes":{"type":"array","items":{"type":"object"}},"valuesByMode":{"type":"object"},"resolved":{"type":"object"}}}},"allOf":[{"if":{"properties":{"schemaVersion":{"enum":[2,3,4]}}},"then":{"required":["componentInspection"],"properties":{"coverage":{"properties":{"componentVariants":{"const":"inspected"}},"type":"object"},"componentInspection":{"$ref":"#/$defs/componentInspection"}}},"else":{"properties":{"coverage":{"properties":{"componentVariants":{"const":"not-exported"}},"type":"object"},"componentInspection":false}}},{"if":{"properties":{"schemaVersion":{"enum":[3,4]}}},"then":{"required":["visualInspection"],"properties":{"visualInspection":{"$ref":"#/$defs/visualInspection"}}},"else":{"properties":{"visualInspection":false}}},{"if":{"properties":{"schemaVersion":{"const":4}}},"then":{"required":["sourceBindings"],"properties":{"sourceBindings":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/sourceBinding"}}}},"else":{"properties":{"sourceBindings":false}}}]};
const schema34 = {"type":"string","pattern":"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"};
const schema32 = {"type":"object","additionalProperties":false,"required":["families","instances"],"properties":{"families":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentFamily"}},"instances":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["node","mainComponentId","familyId"],"properties":{"node":{"$ref":"#/$defs/inspectionNode"},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"familyId":{"$ref":"#/$defs/nullableNodeId"}}}}}};
const schema33 = {"type":"object","additionalProperties":false,"required":["id","name","key","propertyDefinitions","axes","variants","remote","sourceFileKey","figmaPageId"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"key":{"anyOf":[{"type":"string"},{"type":"null"}]},"propertyDefinitions":{"anyOf":[{"type":"object"},{"type":"null"}]},"axes":{"anyOf":[{"type":"object"},{"type":"null"}]},"variants":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/componentVariant"}},"remote":{"type":["boolean","null"]},"sourceFileKey":{"type":["string","null"]},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"}}};
const func1 = Object.prototype.hasOwnProperty;
const pattern4 = new RegExp("^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$", "u");
const schema35 = {"type":"object","additionalProperties":false,"required":["id","name","properties","nodes"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"name":{"type":"string"},"properties":{"anyOf":[{"type":"object","additionalProperties":{"type":"string"}},{"type":"null"}]},"nodes":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/inspectionNode"}}}};
const schema37 = {"type":"object","additionalProperties":false,"required":["id","path","type","name","native","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"path":{"type":"string"},"type":{"type":"string"},"name":{"type":"string"},"native":{"$ref":"#/$defs/native"},"styles":{"type":"array","maxItems":10000,"items":{"type":"object"}},"variables":{"type":"array","maxItems":10000,"items":{"type":"object"}}}};
const schema39 = {"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"},"width":{"type":"number","minimum":0},"height":{"type":"number","minimum":0},"visible":{"type":"boolean"},"isMask":{"type":"boolean"},"opacity":{"type":"number"},"layoutMode":{"enum":["NONE","HORIZONTAL","VERTICAL","GRID"]},"layoutPositioning":{"enum":["AUTO","ABSOLUTE"]},"layoutSizingHorizontal":{"type":"string"},"layoutSizingVertical":{"type":"string"},"primaryAxisSizingMode":{"type":"string"},"counterAxisSizingMode":{"type":"string"},"primaryAxisAlignItems":{"type":"string"},"counterAxisAlignItems":{"type":"string"},"layoutWrap":{"type":"string"},"paddingTop":{"type":"number"},"paddingRight":{"type":"number"},"paddingBottom":{"type":"number"},"paddingLeft":{"type":"number"},"itemSpacing":{"type":"number"},"characters":{"type":"string"},"fontName":{"type":"object"},"fontSize":{"type":"number"},"fontWeight":{"type":"number"},"lineHeight":{"type":"object"},"letterSpacing":{"type":"object"},"textAlignHorizontal":{"type":"string"},"textAlignVertical":{"type":"string"},"textAutoResize":{"type":"string"},"fills":{"type":"array"},"strokes":{"type":"array"},"strokeWeight":{"type":"number"},"strokeAlign":{"type":"string"},"effects":{"type":"array"},"cornerRadius":{"type":"number"},"topLeftRadius":{"type":"number"},"topRightRadius":{"type":"number"},"bottomLeftRadius":{"type":"number"},"bottomRightRadius":{"type":"number"},"fillStyleId":{"type":"string"},"strokeStyleId":{"type":"string"},"textStyleId":{"type":"string"},"effectStyleId":{"type":"string"},"boundVariables":{"type":"object"},"explicitVariableModes":{"type":"object"},"resolvedVariableModes":{"type":"object"},"componentProperties":{"type":"object"},"overrides":{"type":"array"},"reactions":{"type":"array"},"exportSettings":{"type":"array"},"blendMode":{"type":"string"},"clipsContent":{"type":"boolean"},"relativeTransform":{"type":"array"},"absoluteTransform":{"type":"array"},"rotation":{"type":"number"},"minWidth":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"maxWidth":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"minHeight":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"maxHeight":{"anyOf":[{"type":"number","minimum":0},{"type":"null"}]},"layoutGrow":{"type":"number"},"counterAxisSpacing":{"type":"number"},"paragraphIndent":{"type":"number"},"paragraphSpacing":{"type":"number"},"listSpacing":{"type":"number"},"layoutAlign":{"type":"string"},"textCase":{"type":"string"},"textDecoration":{"type":"string"},"constraints":{"type":"object"}}};

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
if(valid3){
if(data4.blendMode !== undefined){
const _errs115 = errors;
if(typeof data4.blendMode !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/blendMode",schemaPath:"#/$defs/native/properties/blendMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs115 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.clipsContent !== undefined){
const _errs117 = errors;
if(typeof data4.clipsContent !== "boolean"){
validate24.errors = [{instancePath:instancePath+"/native/clipsContent",schemaPath:"#/$defs/native/properties/clipsContent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid3 = _errs117 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.relativeTransform !== undefined){
const _errs119 = errors;
if(!(Array.isArray(data4.relativeTransform))){
validate24.errors = [{instancePath:instancePath+"/native/relativeTransform",schemaPath:"#/$defs/native/properties/relativeTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs119 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.absoluteTransform !== undefined){
const _errs121 = errors;
if(!(Array.isArray(data4.absoluteTransform))){
validate24.errors = [{instancePath:instancePath+"/native/absoluteTransform",schemaPath:"#/$defs/native/properties/absoluteTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid3 = _errs121 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.rotation !== undefined){
let data60 = data4.rotation;
const _errs123 = errors;
if(!((typeof data60 == "number") && (isFinite(data60)))){
validate24.errors = [{instancePath:instancePath+"/native/rotation",schemaPath:"#/$defs/native/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs123 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.minWidth !== undefined){
let data61 = data4.minWidth;
const _errs125 = errors;
const _errs126 = errors;
let valid4 = false;
const _errs127 = errors;
if(errors === _errs127){
if((typeof data61 == "number") && (isFinite(data61))){
if(data61 < 0 || isNaN(data61)){
const err0 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err1 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
var _valid0 = _errs127 === errors;
valid4 = valid4 || _valid0;
const _errs129 = errors;
if(data61 !== null){
const err2 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs129 === errors;
valid4 = valid4 || _valid0;
if(!valid4){
const err3 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate24.errors = vErrors;
return false;
}
else {
errors = _errs126;
if(vErrors !== null){
if(_errs126){
vErrors.length = _errs126;
}
else {
vErrors = null;
}
}
}
var valid3 = _errs125 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.maxWidth !== undefined){
let data62 = data4.maxWidth;
const _errs131 = errors;
const _errs132 = errors;
let valid5 = false;
const _errs133 = errors;
if(errors === _errs133){
if((typeof data62 == "number") && (isFinite(data62))){
if(data62 < 0 || isNaN(data62)){
const err4 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
var _valid1 = _errs133 === errors;
valid5 = valid5 || _valid1;
const _errs135 = errors;
if(data62 !== null){
const err6 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var _valid1 = _errs135 === errors;
valid5 = valid5 || _valid1;
if(!valid5){
const err7 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
validate24.errors = vErrors;
return false;
}
else {
errors = _errs132;
if(vErrors !== null){
if(_errs132){
vErrors.length = _errs132;
}
else {
vErrors = null;
}
}
}
var valid3 = _errs131 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.minHeight !== undefined){
let data63 = data4.minHeight;
const _errs137 = errors;
const _errs138 = errors;
let valid6 = false;
const _errs139 = errors;
if(errors === _errs139){
if((typeof data63 == "number") && (isFinite(data63))){
if(data63 < 0 || isNaN(data63)){
const err8 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
var _valid2 = _errs139 === errors;
valid6 = valid6 || _valid2;
const _errs141 = errors;
if(data63 !== null){
const err10 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
var _valid2 = _errs141 === errors;
valid6 = valid6 || _valid2;
if(!valid6){
const err11 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
validate24.errors = vErrors;
return false;
}
else {
errors = _errs138;
if(vErrors !== null){
if(_errs138){
vErrors.length = _errs138;
}
else {
vErrors = null;
}
}
}
var valid3 = _errs137 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.maxHeight !== undefined){
let data64 = data4.maxHeight;
const _errs143 = errors;
const _errs144 = errors;
let valid7 = false;
const _errs145 = errors;
if(errors === _errs145){
if((typeof data64 == "number") && (isFinite(data64))){
if(data64 < 0 || isNaN(data64)){
const err12 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
var _valid3 = _errs145 === errors;
valid7 = valid7 || _valid3;
const _errs147 = errors;
if(data64 !== null){
const err14 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var _valid3 = _errs147 === errors;
valid7 = valid7 || _valid3;
if(!valid7){
const err15 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
validate24.errors = vErrors;
return false;
}
else {
errors = _errs144;
if(vErrors !== null){
if(_errs144){
vErrors.length = _errs144;
}
else {
vErrors = null;
}
}
}
var valid3 = _errs143 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutGrow !== undefined){
let data65 = data4.layoutGrow;
const _errs149 = errors;
if(!((typeof data65 == "number") && (isFinite(data65)))){
validate24.errors = [{instancePath:instancePath+"/native/layoutGrow",schemaPath:"#/$defs/native/properties/layoutGrow/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs149 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.counterAxisSpacing !== undefined){
let data66 = data4.counterAxisSpacing;
const _errs151 = errors;
if(!((typeof data66 == "number") && (isFinite(data66)))){
validate24.errors = [{instancePath:instancePath+"/native/counterAxisSpacing",schemaPath:"#/$defs/native/properties/counterAxisSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs151 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paragraphIndent !== undefined){
let data67 = data4.paragraphIndent;
const _errs153 = errors;
if(!((typeof data67 == "number") && (isFinite(data67)))){
validate24.errors = [{instancePath:instancePath+"/native/paragraphIndent",schemaPath:"#/$defs/native/properties/paragraphIndent/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs153 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.paragraphSpacing !== undefined){
let data68 = data4.paragraphSpacing;
const _errs155 = errors;
if(!((typeof data68 == "number") && (isFinite(data68)))){
validate24.errors = [{instancePath:instancePath+"/native/paragraphSpacing",schemaPath:"#/$defs/native/properties/paragraphSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs155 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.listSpacing !== undefined){
let data69 = data4.listSpacing;
const _errs157 = errors;
if(!((typeof data69 == "number") && (isFinite(data69)))){
validate24.errors = [{instancePath:instancePath+"/native/listSpacing",schemaPath:"#/$defs/native/properties/listSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid3 = _errs157 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.layoutAlign !== undefined){
const _errs159 = errors;
if(typeof data4.layoutAlign !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/layoutAlign",schemaPath:"#/$defs/native/properties/layoutAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs159 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textCase !== undefined){
const _errs161 = errors;
if(typeof data4.textCase !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textCase",schemaPath:"#/$defs/native/properties/textCase/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs161 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.textDecoration !== undefined){
const _errs163 = errors;
if(typeof data4.textDecoration !== "string"){
validate24.errors = [{instancePath:instancePath+"/native/textDecoration",schemaPath:"#/$defs/native/properties/textDecoration/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid3 = _errs163 === errors;
}
else {
var valid3 = true;
}
if(valid3){
if(data4.constraints !== undefined){
let data73 = data4.constraints;
const _errs165 = errors;
if(!(data73 && typeof data73 == "object" && !Array.isArray(data73))){
validate24.errors = [{instancePath:instancePath+"/native/constraints",schemaPath:"#/$defs/native/properties/constraints/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid3 = _errs165 === errors;
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
let data74 = data.styles;
const _errs167 = errors;
if(errors === _errs167){
if(Array.isArray(data74)){
if(data74.length > 10000){
validate24.errors = [{instancePath:instancePath+"/styles",schemaPath:"#/properties/styles/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid8 = true;
const len0 = data74.length;
for(let i0=0; i0<len0; i0++){
let data75 = data74[i0];
const _errs169 = errors;
if(!(data75 && typeof data75 == "object" && !Array.isArray(data75))){
validate24.errors = [{instancePath:instancePath+"/styles/" + i0,schemaPath:"#/properties/styles/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs169 === errors;
if(!valid8){
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
var valid0 = _errs167 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.variables !== undefined){
let data76 = data.variables;
const _errs171 = errors;
if(errors === _errs171){
if(Array.isArray(data76)){
if(data76.length > 10000){
validate24.errors = [{instancePath:instancePath+"/variables",schemaPath:"#/properties/variables/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid9 = true;
const len1 = data76.length;
for(let i1=0; i1<len1; i1++){
let data77 = data76[i1];
const _errs173 = errors;
if(!(data77 && typeof data77 == "object" && !Array.isArray(data77))){
validate24.errors = [{instancePath:instancePath+"/variables/" + i1,schemaPath:"#/properties/variables/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid9 = _errs173 === errors;
if(!valid9){
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
var valid0 = _errs171 === errors;
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

const schema42 = {"type":"object","additionalProperties":false,"required":["nodes","images"],"properties":{"nodes":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["id","rootId","parentId","childIndex","native","children"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"rootId":{"$ref":"#/$defs/nodeId"},"parentId":{"anyOf":[{"$ref":"#/$defs/nodeId"},{"type":"null"}]},"childIndex":{"type":"integer","minimum":0},"native":{"$ref":"#/$defs/native"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}}}}},"images":{"type":"array","maxItems":10000,"items":{"type":"object","additionalProperties":false,"required":["imageHash","width","height","reason"],"properties":{"imageHash":{"type":"string","pattern":"^[a-f0-9]{40}$"},"width":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}]},"height":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}]},"reason":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{1,2400}$"},{"type":"null"}]}}}}}};
const pattern12 = new RegExp("^[a-f0-9]{40}$", "u");
const pattern13 = new RegExp("^[\\s\\S]{1,2400}$", "u");

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
if(((data.nodes === undefined) && (missing0 = "nodes")) || ((data.images === undefined) && (missing0 = "images"))){
validate34.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!((key0 === "nodes") || (key0 === "images"))){
validate34.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.nodes !== undefined){
let data0 = data.nodes;
const _errs2 = errors;
if(errors === _errs2){
if(Array.isArray(data0)){
if(data0.length > 10000){
validate34.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid1 = true;
const len0 = data0.length;
for(let i0=0; i0<len0; i0++){
let data1 = data0[i0];
const _errs4 = errors;
if(errors === _errs4){
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
let missing1;
if(((((((data1.id === undefined) && (missing1 = "id")) || ((data1.rootId === undefined) && (missing1 = "rootId"))) || ((data1.parentId === undefined) && (missing1 = "parentId"))) || ((data1.childIndex === undefined) && (missing1 = "childIndex"))) || ((data1.native === undefined) && (missing1 = "native"))) || ((data1.children === undefined) && (missing1 = "children"))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0,schemaPath:"#/properties/nodes/items/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs6 = errors;
for(const key1 in data1){
if(!((((((key1 === "id") || (key1 === "rootId")) || (key1 === "parentId")) || (key1 === "childIndex")) || (key1 === "native")) || (key1 === "children"))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0,schemaPath:"#/properties/nodes/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs6 === errors){
if(data1.id !== undefined){
let data2 = data1.id;
const _errs7 = errors;
const _errs8 = errors;
if(errors === _errs8){
if(typeof data2 === "string"){
if(!pattern4.test(data2)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs7 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.rootId !== undefined){
let data3 = data1.rootId;
const _errs10 = errors;
const _errs11 = errors;
if(errors === _errs11){
if(typeof data3 === "string"){
if(!pattern4.test(data3)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/rootId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/rootId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid2 = _errs10 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.parentId !== undefined){
let data4 = data1.parentId;
const _errs13 = errors;
const _errs14 = errors;
let valid5 = false;
const _errs15 = errors;
const _errs16 = errors;
if(errors === _errs16){
if(typeof data4 === "string"){
if(!pattern4.test(data4)){
const err0 = {instancePath:instancePath+"/nodes/" + i0+"/parentId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""};
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
const err1 = {instancePath:instancePath+"/nodes/" + i0+"/parentId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
var _valid0 = _errs15 === errors;
valid5 = valid5 || _valid0;
const _errs18 = errors;
if(data4 !== null){
const err2 = {instancePath:instancePath+"/nodes/" + i0+"/parentId",schemaPath:"#/properties/nodes/items/properties/parentId/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs18 === errors;
valid5 = valid5 || _valid0;
if(!valid5){
const err3 = {instancePath:instancePath+"/nodes/" + i0+"/parentId",schemaPath:"#/properties/nodes/items/properties/parentId/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
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
var valid2 = _errs13 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.childIndex !== undefined){
let data5 = data1.childIndex;
const _errs20 = errors;
if(!(((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5))) && (isFinite(data5)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/childIndex",schemaPath:"#/properties/nodes/items/properties/childIndex/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
if(errors === _errs20){
if((typeof data5 == "number") && (isFinite(data5))){
if(data5 < 0 || isNaN(data5)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/childIndex",schemaPath:"#/properties/nodes/items/properties/childIndex/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
}
var valid2 = _errs20 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.native !== undefined){
let data6 = data1.native;
const _errs22 = errors;
const _errs23 = errors;
if(errors === _errs23){
if(data6 && typeof data6 == "object" && !Array.isArray(data6)){
const _errs25 = errors;
for(const key2 in data6){
if(!(func1.call(schema39.properties, key2))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native",schemaPath:"#/$defs/native/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs25 === errors){
if(data6.x !== undefined){
let data7 = data6.x;
const _errs26 = errors;
if(!((typeof data7 == "number") && (isFinite(data7)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/x",schemaPath:"#/$defs/native/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs26 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.y !== undefined){
let data8 = data6.y;
const _errs28 = errors;
if(!((typeof data8 == "number") && (isFinite(data8)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/y",schemaPath:"#/$defs/native/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs28 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.width !== undefined){
let data9 = data6.width;
const _errs30 = errors;
if(errors === _errs30){
if((typeof data9 == "number") && (isFinite(data9))){
if(data9 < 0 || isNaN(data9)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/width",schemaPath:"#/$defs/native/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/width",schemaPath:"#/$defs/native/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid8 = _errs30 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.height !== undefined){
let data10 = data6.height;
const _errs32 = errors;
if(errors === _errs32){
if((typeof data10 == "number") && (isFinite(data10))){
if(data10 < 0 || isNaN(data10)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/height",schemaPath:"#/$defs/native/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/height",schemaPath:"#/$defs/native/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
}
var valid8 = _errs32 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.visible !== undefined){
const _errs34 = errors;
if(typeof data6.visible !== "boolean"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/visible",schemaPath:"#/$defs/native/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid8 = _errs34 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.isMask !== undefined){
const _errs36 = errors;
if(typeof data6.isMask !== "boolean"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/isMask",schemaPath:"#/$defs/native/properties/isMask/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid8 = _errs36 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.opacity !== undefined){
let data13 = data6.opacity;
const _errs38 = errors;
if(!((typeof data13 == "number") && (isFinite(data13)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/opacity",schemaPath:"#/$defs/native/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs38 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutMode !== undefined){
let data14 = data6.layoutMode;
const _errs40 = errors;
if(!((((data14 === "NONE") || (data14 === "HORIZONTAL")) || (data14 === "VERTICAL")) || (data14 === "GRID"))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutMode",schemaPath:"#/$defs/native/properties/layoutMode/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutMode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid8 = _errs40 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutPositioning !== undefined){
let data15 = data6.layoutPositioning;
const _errs41 = errors;
if(!((data15 === "AUTO") || (data15 === "ABSOLUTE"))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutPositioning",schemaPath:"#/$defs/native/properties/layoutPositioning/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutPositioning.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid8 = _errs41 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutSizingHorizontal !== undefined){
const _errs42 = errors;
if(typeof data6.layoutSizingHorizontal !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutSizingHorizontal",schemaPath:"#/$defs/native/properties/layoutSizingHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs42 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutSizingVertical !== undefined){
const _errs44 = errors;
if(typeof data6.layoutSizingVertical !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutSizingVertical",schemaPath:"#/$defs/native/properties/layoutSizingVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs44 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.primaryAxisSizingMode !== undefined){
const _errs46 = errors;
if(typeof data6.primaryAxisSizingMode !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/primaryAxisSizingMode",schemaPath:"#/$defs/native/properties/primaryAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs46 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.counterAxisSizingMode !== undefined){
const _errs48 = errors;
if(typeof data6.counterAxisSizingMode !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/counterAxisSizingMode",schemaPath:"#/$defs/native/properties/counterAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs48 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.primaryAxisAlignItems !== undefined){
const _errs50 = errors;
if(typeof data6.primaryAxisAlignItems !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/primaryAxisAlignItems",schemaPath:"#/$defs/native/properties/primaryAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs50 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.counterAxisAlignItems !== undefined){
const _errs52 = errors;
if(typeof data6.counterAxisAlignItems !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/counterAxisAlignItems",schemaPath:"#/$defs/native/properties/counterAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs52 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutWrap !== undefined){
const _errs54 = errors;
if(typeof data6.layoutWrap !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutWrap",schemaPath:"#/$defs/native/properties/layoutWrap/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs54 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paddingTop !== undefined){
let data23 = data6.paddingTop;
const _errs56 = errors;
if(!((typeof data23 == "number") && (isFinite(data23)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paddingTop",schemaPath:"#/$defs/native/properties/paddingTop/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs56 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paddingRight !== undefined){
let data24 = data6.paddingRight;
const _errs58 = errors;
if(!((typeof data24 == "number") && (isFinite(data24)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paddingRight",schemaPath:"#/$defs/native/properties/paddingRight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs58 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paddingBottom !== undefined){
let data25 = data6.paddingBottom;
const _errs60 = errors;
if(!((typeof data25 == "number") && (isFinite(data25)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paddingBottom",schemaPath:"#/$defs/native/properties/paddingBottom/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs60 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paddingLeft !== undefined){
let data26 = data6.paddingLeft;
const _errs62 = errors;
if(!((typeof data26 == "number") && (isFinite(data26)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paddingLeft",schemaPath:"#/$defs/native/properties/paddingLeft/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs62 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.itemSpacing !== undefined){
let data27 = data6.itemSpacing;
const _errs64 = errors;
if(!((typeof data27 == "number") && (isFinite(data27)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/itemSpacing",schemaPath:"#/$defs/native/properties/itemSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs64 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.characters !== undefined){
const _errs66 = errors;
if(typeof data6.characters !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/characters",schemaPath:"#/$defs/native/properties/characters/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs66 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.fontName !== undefined){
let data29 = data6.fontName;
const _errs68 = errors;
if(!(data29 && typeof data29 == "object" && !Array.isArray(data29))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/fontName",schemaPath:"#/$defs/native/properties/fontName/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs68 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.fontSize !== undefined){
let data30 = data6.fontSize;
const _errs70 = errors;
if(!((typeof data30 == "number") && (isFinite(data30)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/fontSize",schemaPath:"#/$defs/native/properties/fontSize/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs70 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.fontWeight !== undefined){
let data31 = data6.fontWeight;
const _errs72 = errors;
if(!((typeof data31 == "number") && (isFinite(data31)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/fontWeight",schemaPath:"#/$defs/native/properties/fontWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs72 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.lineHeight !== undefined){
let data32 = data6.lineHeight;
const _errs74 = errors;
if(!(data32 && typeof data32 == "object" && !Array.isArray(data32))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/lineHeight",schemaPath:"#/$defs/native/properties/lineHeight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs74 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.letterSpacing !== undefined){
let data33 = data6.letterSpacing;
const _errs76 = errors;
if(!(data33 && typeof data33 == "object" && !Array.isArray(data33))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/letterSpacing",schemaPath:"#/$defs/native/properties/letterSpacing/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs76 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textAlignHorizontal !== undefined){
const _errs78 = errors;
if(typeof data6.textAlignHorizontal !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textAlignHorizontal",schemaPath:"#/$defs/native/properties/textAlignHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs78 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textAlignVertical !== undefined){
const _errs80 = errors;
if(typeof data6.textAlignVertical !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textAlignVertical",schemaPath:"#/$defs/native/properties/textAlignVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs80 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textAutoResize !== undefined){
const _errs82 = errors;
if(typeof data6.textAutoResize !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textAutoResize",schemaPath:"#/$defs/native/properties/textAutoResize/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs82 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.fills !== undefined){
const _errs84 = errors;
if(!(Array.isArray(data6.fills))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/fills",schemaPath:"#/$defs/native/properties/fills/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs84 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.strokes !== undefined){
const _errs86 = errors;
if(!(Array.isArray(data6.strokes))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/strokes",schemaPath:"#/$defs/native/properties/strokes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs86 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.strokeWeight !== undefined){
let data39 = data6.strokeWeight;
const _errs88 = errors;
if(!((typeof data39 == "number") && (isFinite(data39)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/strokeWeight",schemaPath:"#/$defs/native/properties/strokeWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs88 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.strokeAlign !== undefined){
const _errs90 = errors;
if(typeof data6.strokeAlign !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/strokeAlign",schemaPath:"#/$defs/native/properties/strokeAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs90 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.effects !== undefined){
const _errs92 = errors;
if(!(Array.isArray(data6.effects))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/effects",schemaPath:"#/$defs/native/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs92 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.cornerRadius !== undefined){
let data42 = data6.cornerRadius;
const _errs94 = errors;
if(!((typeof data42 == "number") && (isFinite(data42)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/cornerRadius",schemaPath:"#/$defs/native/properties/cornerRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs94 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.topLeftRadius !== undefined){
let data43 = data6.topLeftRadius;
const _errs96 = errors;
if(!((typeof data43 == "number") && (isFinite(data43)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/topLeftRadius",schemaPath:"#/$defs/native/properties/topLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs96 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.topRightRadius !== undefined){
let data44 = data6.topRightRadius;
const _errs98 = errors;
if(!((typeof data44 == "number") && (isFinite(data44)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/topRightRadius",schemaPath:"#/$defs/native/properties/topRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs98 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.bottomLeftRadius !== undefined){
let data45 = data6.bottomLeftRadius;
const _errs100 = errors;
if(!((typeof data45 == "number") && (isFinite(data45)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/bottomLeftRadius",schemaPath:"#/$defs/native/properties/bottomLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs100 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.bottomRightRadius !== undefined){
let data46 = data6.bottomRightRadius;
const _errs102 = errors;
if(!((typeof data46 == "number") && (isFinite(data46)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/bottomRightRadius",schemaPath:"#/$defs/native/properties/bottomRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs102 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.fillStyleId !== undefined){
const _errs104 = errors;
if(typeof data6.fillStyleId !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/fillStyleId",schemaPath:"#/$defs/native/properties/fillStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs104 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.strokeStyleId !== undefined){
const _errs106 = errors;
if(typeof data6.strokeStyleId !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/strokeStyleId",schemaPath:"#/$defs/native/properties/strokeStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs106 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textStyleId !== undefined){
const _errs108 = errors;
if(typeof data6.textStyleId !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textStyleId",schemaPath:"#/$defs/native/properties/textStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs108 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.effectStyleId !== undefined){
const _errs110 = errors;
if(typeof data6.effectStyleId !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/effectStyleId",schemaPath:"#/$defs/native/properties/effectStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs110 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.boundVariables !== undefined){
let data51 = data6.boundVariables;
const _errs112 = errors;
if(!(data51 && typeof data51 == "object" && !Array.isArray(data51))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/boundVariables",schemaPath:"#/$defs/native/properties/boundVariables/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs112 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.explicitVariableModes !== undefined){
let data52 = data6.explicitVariableModes;
const _errs114 = errors;
if(!(data52 && typeof data52 == "object" && !Array.isArray(data52))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/explicitVariableModes",schemaPath:"#/$defs/native/properties/explicitVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs114 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.resolvedVariableModes !== undefined){
let data53 = data6.resolvedVariableModes;
const _errs116 = errors;
if(!(data53 && typeof data53 == "object" && !Array.isArray(data53))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/resolvedVariableModes",schemaPath:"#/$defs/native/properties/resolvedVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs116 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.componentProperties !== undefined){
let data54 = data6.componentProperties;
const _errs118 = errors;
if(!(data54 && typeof data54 == "object" && !Array.isArray(data54))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/componentProperties",schemaPath:"#/$defs/native/properties/componentProperties/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs118 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.overrides !== undefined){
const _errs120 = errors;
if(!(Array.isArray(data6.overrides))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/overrides",schemaPath:"#/$defs/native/properties/overrides/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs120 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.reactions !== undefined){
const _errs122 = errors;
if(!(Array.isArray(data6.reactions))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/reactions",schemaPath:"#/$defs/native/properties/reactions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs122 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.exportSettings !== undefined){
const _errs124 = errors;
if(!(Array.isArray(data6.exportSettings))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/exportSettings",schemaPath:"#/$defs/native/properties/exportSettings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs124 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.blendMode !== undefined){
const _errs126 = errors;
if(typeof data6.blendMode !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/blendMode",schemaPath:"#/$defs/native/properties/blendMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs126 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.clipsContent !== undefined){
const _errs128 = errors;
if(typeof data6.clipsContent !== "boolean"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/clipsContent",schemaPath:"#/$defs/native/properties/clipsContent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid8 = _errs128 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.relativeTransform !== undefined){
const _errs130 = errors;
if(!(Array.isArray(data6.relativeTransform))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/relativeTransform",schemaPath:"#/$defs/native/properties/relativeTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs130 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.absoluteTransform !== undefined){
const _errs132 = errors;
if(!(Array.isArray(data6.absoluteTransform))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/absoluteTransform",schemaPath:"#/$defs/native/properties/absoluteTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid8 = _errs132 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.rotation !== undefined){
let data62 = data6.rotation;
const _errs134 = errors;
if(!((typeof data62 == "number") && (isFinite(data62)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/rotation",schemaPath:"#/$defs/native/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs134 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.minWidth !== undefined){
let data63 = data6.minWidth;
const _errs136 = errors;
const _errs137 = errors;
let valid9 = false;
const _errs138 = errors;
if(errors === _errs138){
if((typeof data63 == "number") && (isFinite(data63))){
if(data63 < 0 || isNaN(data63)){
const err4 = {instancePath:instancePath+"/nodes/" + i0+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/nodes/" + i0+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
var _valid1 = _errs138 === errors;
valid9 = valid9 || _valid1;
const _errs140 = errors;
if(data63 !== null){
const err6 = {instancePath:instancePath+"/nodes/" + i0+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var _valid1 = _errs140 === errors;
valid9 = valid9 || _valid1;
if(!valid9){
const err7 = {instancePath:instancePath+"/nodes/" + i0+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs137;
if(vErrors !== null){
if(_errs137){
vErrors.length = _errs137;
}
else {
vErrors = null;
}
}
}
var valid8 = _errs136 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.maxWidth !== undefined){
let data64 = data6.maxWidth;
const _errs142 = errors;
const _errs143 = errors;
let valid10 = false;
const _errs144 = errors;
if(errors === _errs144){
if((typeof data64 == "number") && (isFinite(data64))){
if(data64 < 0 || isNaN(data64)){
const err8 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
var _valid2 = _errs144 === errors;
valid10 = valid10 || _valid2;
const _errs146 = errors;
if(data64 !== null){
const err10 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
var _valid2 = _errs146 === errors;
valid10 = valid10 || _valid2;
if(!valid10){
const err11 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs143;
if(vErrors !== null){
if(_errs143){
vErrors.length = _errs143;
}
else {
vErrors = null;
}
}
}
var valid8 = _errs142 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.minHeight !== undefined){
let data65 = data6.minHeight;
const _errs148 = errors;
const _errs149 = errors;
let valid11 = false;
const _errs150 = errors;
if(errors === _errs150){
if((typeof data65 == "number") && (isFinite(data65))){
if(data65 < 0 || isNaN(data65)){
const err12 = {instancePath:instancePath+"/nodes/" + i0+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/nodes/" + i0+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
var _valid3 = _errs150 === errors;
valid11 = valid11 || _valid3;
const _errs152 = errors;
if(data65 !== null){
const err14 = {instancePath:instancePath+"/nodes/" + i0+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var _valid3 = _errs152 === errors;
valid11 = valid11 || _valid3;
if(!valid11){
const err15 = {instancePath:instancePath+"/nodes/" + i0+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs149;
if(vErrors !== null){
if(_errs149){
vErrors.length = _errs149;
}
else {
vErrors = null;
}
}
}
var valid8 = _errs148 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.maxHeight !== undefined){
let data66 = data6.maxHeight;
const _errs154 = errors;
const _errs155 = errors;
let valid12 = false;
const _errs156 = errors;
if(errors === _errs156){
if((typeof data66 == "number") && (isFinite(data66))){
if(data66 < 0 || isNaN(data66)){
const err16 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
var _valid4 = _errs156 === errors;
valid12 = valid12 || _valid4;
const _errs158 = errors;
if(data66 !== null){
const err18 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid4 = _errs158 === errors;
valid12 = valid12 || _valid4;
if(!valid12){
const err19 = {instancePath:instancePath+"/nodes/" + i0+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs155;
if(vErrors !== null){
if(_errs155){
vErrors.length = _errs155;
}
else {
vErrors = null;
}
}
}
var valid8 = _errs154 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutGrow !== undefined){
let data67 = data6.layoutGrow;
const _errs160 = errors;
if(!((typeof data67 == "number") && (isFinite(data67)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutGrow",schemaPath:"#/$defs/native/properties/layoutGrow/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs160 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.counterAxisSpacing !== undefined){
let data68 = data6.counterAxisSpacing;
const _errs162 = errors;
if(!((typeof data68 == "number") && (isFinite(data68)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/counterAxisSpacing",schemaPath:"#/$defs/native/properties/counterAxisSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs162 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paragraphIndent !== undefined){
let data69 = data6.paragraphIndent;
const _errs164 = errors;
if(!((typeof data69 == "number") && (isFinite(data69)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paragraphIndent",schemaPath:"#/$defs/native/properties/paragraphIndent/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs164 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.paragraphSpacing !== undefined){
let data70 = data6.paragraphSpacing;
const _errs166 = errors;
if(!((typeof data70 == "number") && (isFinite(data70)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/paragraphSpacing",schemaPath:"#/$defs/native/properties/paragraphSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs166 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.listSpacing !== undefined){
let data71 = data6.listSpacing;
const _errs168 = errors;
if(!((typeof data71 == "number") && (isFinite(data71)))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/listSpacing",schemaPath:"#/$defs/native/properties/listSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid8 = _errs168 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.layoutAlign !== undefined){
const _errs170 = errors;
if(typeof data6.layoutAlign !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/layoutAlign",schemaPath:"#/$defs/native/properties/layoutAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs170 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textCase !== undefined){
const _errs172 = errors;
if(typeof data6.textCase !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textCase",schemaPath:"#/$defs/native/properties/textCase/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs172 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.textDecoration !== undefined){
const _errs174 = errors;
if(typeof data6.textDecoration !== "string"){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/textDecoration",schemaPath:"#/$defs/native/properties/textDecoration/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid8 = _errs174 === errors;
}
else {
var valid8 = true;
}
if(valid8){
if(data6.constraints !== undefined){
let data75 = data6.constraints;
const _errs176 = errors;
if(!(data75 && typeof data75 == "object" && !Array.isArray(data75))){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native/constraints",schemaPath:"#/$defs/native/properties/constraints/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs176 === errors;
}
else {
var valid8 = true;
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
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/native",schemaPath:"#/$defs/native/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid2 = _errs22 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.children !== undefined){
let data76 = data1.children;
const _errs178 = errors;
if(errors === _errs178){
if(Array.isArray(data76)){
if(data76.length > 10000){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/children",schemaPath:"#/properties/nodes/items/properties/children/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid13 = true;
const len1 = data76.length;
for(let i1=0; i1<len1; i1++){
let data77 = data76[i1];
const _errs180 = errors;
const _errs181 = errors;
if(errors === _errs181){
if(typeof data77 === "string"){
if(!pattern4.test(data77)){
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/children/" + i1,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/children/" + i1,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid13 = _errs180 === errors;
if(!valid13){
break;
}
}
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0+"/children",schemaPath:"#/properties/nodes/items/properties/children/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid2 = _errs178 === errors;
}
else {
var valid2 = true;
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
validate34.errors = [{instancePath:instancePath+"/nodes/" + i0,schemaPath:"#/properties/nodes/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid1 = _errs4 === errors;
if(!valid1){
break;
}
}
}
}
else {
validate34.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.images !== undefined){
let data78 = data.images;
const _errs183 = errors;
if(errors === _errs183){
if(Array.isArray(data78)){
if(data78.length > 10000){
validate34.errors = [{instancePath:instancePath+"/images",schemaPath:"#/properties/images/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid15 = true;
const len2 = data78.length;
for(let i2=0; i2<len2; i2++){
let data79 = data78[i2];
const _errs185 = errors;
if(errors === _errs185){
if(data79 && typeof data79 == "object" && !Array.isArray(data79)){
let missing2;
if(((((data79.imageHash === undefined) && (missing2 = "imageHash")) || ((data79.width === undefined) && (missing2 = "width"))) || ((data79.height === undefined) && (missing2 = "height"))) || ((data79.reason === undefined) && (missing2 = "reason"))){
validate34.errors = [{instancePath:instancePath+"/images/" + i2,schemaPath:"#/properties/images/items/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
const _errs187 = errors;
for(const key3 in data79){
if(!((((key3 === "imageHash") || (key3 === "width")) || (key3 === "height")) || (key3 === "reason"))){
validate34.errors = [{instancePath:instancePath+"/images/" + i2,schemaPath:"#/properties/images/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs187 === errors){
if(data79.imageHash !== undefined){
let data80 = data79.imageHash;
const _errs188 = errors;
if(errors === _errs188){
if(typeof data80 === "string"){
if(!pattern12.test(data80)){
validate34.errors = [{instancePath:instancePath+"/images/" + i2+"/imageHash",schemaPath:"#/properties/images/items/properties/imageHash/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{40}$"},message:"must match pattern \""+"^[a-f0-9]{40}$"+"\""}];
return false;
}
}
else {
validate34.errors = [{instancePath:instancePath+"/images/" + i2+"/imageHash",schemaPath:"#/properties/images/items/properties/imageHash/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid16 = _errs188 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data79.width !== undefined){
let data81 = data79.width;
const _errs190 = errors;
const _errs191 = errors;
let valid17 = false;
const _errs192 = errors;
if(!(((typeof data81 == "number") && (!(data81 % 1) && !isNaN(data81))) && (isFinite(data81)))){
const err20 = {instancePath:instancePath+"/images/" + i2+"/width",schemaPath:"#/properties/images/items/properties/width/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err20];
}
else {
vErrors.push(err20);
}
errors++;
}
if(errors === _errs192){
if((typeof data81 == "number") && (isFinite(data81))){
if(data81 < 1 || isNaN(data81)){
const err21 = {instancePath:instancePath+"/images/" + i2+"/width",schemaPath:"#/properties/images/items/properties/width/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err21];
}
else {
vErrors.push(err21);
}
errors++;
}
}
}
var _valid5 = _errs192 === errors;
valid17 = valid17 || _valid5;
const _errs194 = errors;
if(data81 !== null){
const err22 = {instancePath:instancePath+"/images/" + i2+"/width",schemaPath:"#/properties/images/items/properties/width/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err22];
}
else {
vErrors.push(err22);
}
errors++;
}
var _valid5 = _errs194 === errors;
valid17 = valid17 || _valid5;
if(!valid17){
const err23 = {instancePath:instancePath+"/images/" + i2+"/width",schemaPath:"#/properties/images/items/properties/width/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err23];
}
else {
vErrors.push(err23);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs191;
if(vErrors !== null){
if(_errs191){
vErrors.length = _errs191;
}
else {
vErrors = null;
}
}
}
var valid16 = _errs190 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data79.height !== undefined){
let data82 = data79.height;
const _errs196 = errors;
const _errs197 = errors;
let valid18 = false;
const _errs198 = errors;
if(!(((typeof data82 == "number") && (!(data82 % 1) && !isNaN(data82))) && (isFinite(data82)))){
const err24 = {instancePath:instancePath+"/images/" + i2+"/height",schemaPath:"#/properties/images/items/properties/height/anyOf/0/type",keyword:"type",params:{type: "integer"},message:"must be integer"};
if(vErrors === null){
vErrors = [err24];
}
else {
vErrors.push(err24);
}
errors++;
}
if(errors === _errs198){
if((typeof data82 == "number") && (isFinite(data82))){
if(data82 < 1 || isNaN(data82)){
const err25 = {instancePath:instancePath+"/images/" + i2+"/height",schemaPath:"#/properties/images/items/properties/height/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 1},message:"must be >= 1"};
if(vErrors === null){
vErrors = [err25];
}
else {
vErrors.push(err25);
}
errors++;
}
}
}
var _valid6 = _errs198 === errors;
valid18 = valid18 || _valid6;
const _errs200 = errors;
if(data82 !== null){
const err26 = {instancePath:instancePath+"/images/" + i2+"/height",schemaPath:"#/properties/images/items/properties/height/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err26];
}
else {
vErrors.push(err26);
}
errors++;
}
var _valid6 = _errs200 === errors;
valid18 = valid18 || _valid6;
if(!valid18){
const err27 = {instancePath:instancePath+"/images/" + i2+"/height",schemaPath:"#/properties/images/items/properties/height/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err27];
}
else {
vErrors.push(err27);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs197;
if(vErrors !== null){
if(_errs197){
vErrors.length = _errs197;
}
else {
vErrors = null;
}
}
}
var valid16 = _errs196 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data79.reason !== undefined){
let data83 = data79.reason;
const _errs202 = errors;
const _errs203 = errors;
let valid19 = false;
const _errs204 = errors;
if(errors === _errs204){
if(typeof data83 === "string"){
if(!pattern13.test(data83)){
const err28 = {instancePath:instancePath+"/images/" + i2+"/reason",schemaPath:"#/properties/images/items/properties/reason/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{1,2400}$"},message:"must match pattern \""+"^[\\s\\S]{1,2400}$"+"\""};
if(vErrors === null){
vErrors = [err28];
}
else {
vErrors.push(err28);
}
errors++;
}
}
else {
const err29 = {instancePath:instancePath+"/images/" + i2+"/reason",schemaPath:"#/properties/images/items/properties/reason/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err29];
}
else {
vErrors.push(err29);
}
errors++;
}
}
var _valid7 = _errs204 === errors;
valid19 = valid19 || _valid7;
const _errs206 = errors;
if(data83 !== null){
const err30 = {instancePath:instancePath+"/images/" + i2+"/reason",schemaPath:"#/properties/images/items/properties/reason/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err30];
}
else {
vErrors.push(err30);
}
errors++;
}
var _valid7 = _errs206 === errors;
valid19 = valid19 || _valid7;
if(!valid19){
const err31 = {instancePath:instancePath+"/images/" + i2+"/reason",schemaPath:"#/properties/images/items/properties/reason/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err31];
}
else {
vErrors.push(err31);
}
errors++;
validate34.errors = vErrors;
return false;
}
else {
errors = _errs203;
if(vErrors !== null){
if(_errs203){
vErrors.length = _errs203;
}
else {
vErrors = null;
}
}
}
var valid16 = _errs202 === errors;
}
else {
var valid16 = true;
}
}
}
}
}
}
}
else {
validate34.errors = [{instancePath:instancePath+"/images/" + i2,schemaPath:"#/properties/images/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid15 = _errs185 === errors;
if(!valid15){
break;
}
}
}
}
else {
validate34.errors = [{instancePath:instancePath+"/images",schemaPath:"#/properties/images/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs183 === errors;
}
else {
var valid0 = true;
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

const schema48 = {"type":"object","additionalProperties":false,"required":["id","styles","variables"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"styles":{"type":"array","maxItems":4,"items":{"$ref":"#/$defs/resolvedSourceStyle"}},"variables":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/resolvedSourceVariable"}}}};
const schema50 = {"type":"object","additionalProperties":false,"required":["field","id","name","type","value"],"properties":{"field":{"enum":["fillStyleId","strokeStyleId","textStyleId","effectStyleId"]},"id":{"type":"string"},"name":{"type":"string"},"type":{"type":"string"},"value":{"type":"object"}}};
const schema51 = {"type":"object","additionalProperties":false,"required":["path","id","name","collectionId","collectionName","modes","valuesByMode","resolved"],"properties":{"path":{"type":"string"},"id":{"type":"string"},"name":{"type":"string"},"collectionId":{"type":"string"},"collectionName":{"type":"string"},"modes":{"type":"array","items":{"type":"object"}},"valuesByMode":{"type":"object"},"resolved":{"type":"object"}}};

function validate36(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate36.evaluated;
if(evaluated0.dynamicProps){
evaluated0.props = undefined;
}
if(evaluated0.dynamicItems){
evaluated0.items = undefined;
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.id === undefined) && (missing0 = "id")) || ((data.styles === undefined) && (missing0 = "styles"))) || ((data.variables === undefined) && (missing0 = "variables"))){
validate36.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(((key0 === "id") || (key0 === "styles")) || (key0 === "variables"))){
validate36.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
validate36.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate36.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.styles !== undefined){
let data1 = data.styles;
const _errs5 = errors;
if(errors === _errs5){
if(Array.isArray(data1)){
if(data1.length > 4){
validate36.errors = [{instancePath:instancePath+"/styles",schemaPath:"#/properties/styles/maxItems",keyword:"maxItems",params:{limit: 4},message:"must NOT have more than 4 items"}];
return false;
}
else {
var valid2 = true;
const len0 = data1.length;
for(let i0=0; i0<len0; i0++){
let data2 = data1[i0];
const _errs7 = errors;
const _errs8 = errors;
if(errors === _errs8){
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
let missing1;
if((((((data2.field === undefined) && (missing1 = "field")) || ((data2.id === undefined) && (missing1 = "id"))) || ((data2.name === undefined) && (missing1 = "name"))) || ((data2.type === undefined) && (missing1 = "type"))) || ((data2.value === undefined) && (missing1 = "value"))){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0,schemaPath:"#/$defs/resolvedSourceStyle/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
const _errs10 = errors;
for(const key1 in data2){
if(!(((((key1 === "field") || (key1 === "id")) || (key1 === "name")) || (key1 === "type")) || (key1 === "value"))){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0,schemaPath:"#/$defs/resolvedSourceStyle/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs10 === errors){
if(data2.field !== undefined){
let data3 = data2.field;
const _errs11 = errors;
if(!((((data3 === "fillStyleId") || (data3 === "strokeStyleId")) || (data3 === "textStyleId")) || (data3 === "effectStyleId"))){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0+"/field",schemaPath:"#/$defs/resolvedSourceStyle/properties/field/enum",keyword:"enum",params:{allowedValues: schema50.properties.field.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid4 = _errs11 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data2.id !== undefined){
const _errs12 = errors;
if(typeof data2.id !== "string"){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0+"/id",schemaPath:"#/$defs/resolvedSourceStyle/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid4 = _errs12 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data2.name !== undefined){
const _errs14 = errors;
if(typeof data2.name !== "string"){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0+"/name",schemaPath:"#/$defs/resolvedSourceStyle/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid4 = _errs14 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data2.type !== undefined){
const _errs16 = errors;
if(typeof data2.type !== "string"){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0+"/type",schemaPath:"#/$defs/resolvedSourceStyle/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid4 = _errs16 === errors;
}
else {
var valid4 = true;
}
if(valid4){
if(data2.value !== undefined){
let data7 = data2.value;
const _errs18 = errors;
if(!(data7 && typeof data7 == "object" && !Array.isArray(data7))){
validate36.errors = [{instancePath:instancePath+"/styles/" + i0+"/value",schemaPath:"#/$defs/resolvedSourceStyle/properties/value/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid4 = _errs18 === errors;
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
}
else {
validate36.errors = [{instancePath:instancePath+"/styles/" + i0,schemaPath:"#/$defs/resolvedSourceStyle/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate36.errors = [{instancePath:instancePath+"/styles",schemaPath:"#/properties/styles/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.variables !== undefined){
let data8 = data.variables;
const _errs20 = errors;
if(errors === _errs20){
if(Array.isArray(data8)){
if(data8.length > 10000){
validate36.errors = [{instancePath:instancePath+"/variables",schemaPath:"#/properties/variables/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid5 = true;
const len1 = data8.length;
for(let i1=0; i1<len1; i1++){
let data9 = data8[i1];
const _errs22 = errors;
const _errs23 = errors;
if(errors === _errs23){
if(data9 && typeof data9 == "object" && !Array.isArray(data9)){
let missing2;
if(((((((((data9.path === undefined) && (missing2 = "path")) || ((data9.id === undefined) && (missing2 = "id"))) || ((data9.name === undefined) && (missing2 = "name"))) || ((data9.collectionId === undefined) && (missing2 = "collectionId"))) || ((data9.collectionName === undefined) && (missing2 = "collectionName"))) || ((data9.modes === undefined) && (missing2 = "modes"))) || ((data9.valuesByMode === undefined) && (missing2 = "valuesByMode"))) || ((data9.resolved === undefined) && (missing2 = "resolved"))){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1,schemaPath:"#/$defs/resolvedSourceVariable/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
const _errs25 = errors;
for(const key2 in data9){
if(!((((((((key2 === "path") || (key2 === "id")) || (key2 === "name")) || (key2 === "collectionId")) || (key2 === "collectionName")) || (key2 === "modes")) || (key2 === "valuesByMode")) || (key2 === "resolved"))){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1,schemaPath:"#/$defs/resolvedSourceVariable/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs25 === errors){
if(data9.path !== undefined){
const _errs26 = errors;
if(typeof data9.path !== "string"){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/path",schemaPath:"#/$defs/resolvedSourceVariable/properties/path/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid7 = _errs26 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.id !== undefined){
const _errs28 = errors;
if(typeof data9.id !== "string"){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/id",schemaPath:"#/$defs/resolvedSourceVariable/properties/id/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid7 = _errs28 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.name !== undefined){
const _errs30 = errors;
if(typeof data9.name !== "string"){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/name",schemaPath:"#/$defs/resolvedSourceVariable/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid7 = _errs30 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.collectionId !== undefined){
const _errs32 = errors;
if(typeof data9.collectionId !== "string"){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/collectionId",schemaPath:"#/$defs/resolvedSourceVariable/properties/collectionId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid7 = _errs32 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.collectionName !== undefined){
const _errs34 = errors;
if(typeof data9.collectionName !== "string"){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/collectionName",schemaPath:"#/$defs/resolvedSourceVariable/properties/collectionName/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid7 = _errs34 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.modes !== undefined){
let data15 = data9.modes;
const _errs36 = errors;
if(errors === _errs36){
if(Array.isArray(data15)){
var valid8 = true;
const len2 = data15.length;
for(let i2=0; i2<len2; i2++){
let data16 = data15[i2];
const _errs38 = errors;
if(!(data16 && typeof data16 == "object" && !Array.isArray(data16))){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/modes/" + i2,schemaPath:"#/$defs/resolvedSourceVariable/properties/modes/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid8 = _errs38 === errors;
if(!valid8){
break;
}
}
}
else {
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/modes",schemaPath:"#/$defs/resolvedSourceVariable/properties/modes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid7 = _errs36 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.valuesByMode !== undefined){
let data17 = data9.valuesByMode;
const _errs40 = errors;
if(!(data17 && typeof data17 == "object" && !Array.isArray(data17))){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/valuesByMode",schemaPath:"#/$defs/resolvedSourceVariable/properties/valuesByMode/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid7 = _errs40 === errors;
}
else {
var valid7 = true;
}
if(valid7){
if(data9.resolved !== undefined){
let data18 = data9.resolved;
const _errs42 = errors;
if(!(data18 && typeof data18 == "object" && !Array.isArray(data18))){
validate36.errors = [{instancePath:instancePath+"/variables/" + i1+"/resolved",schemaPath:"#/$defs/resolvedSourceVariable/properties/resolved/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid7 = _errs42 === errors;
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
else {
validate36.errors = [{instancePath:instancePath+"/variables/" + i1,schemaPath:"#/$defs/resolvedSourceVariable/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid5 = _errs22 === errors;
if(!valid5){
break;
}
}
}
}
else {
validate36.errors = [{instancePath:instancePath+"/variables",schemaPath:"#/properties/variables/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs20 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
}
else {
validate36.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate36.errors = vErrors;
return errors === 0;
}
validate36.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const schema54 = {"type":"object","additionalProperties":false,"required":["id","type","name","parentId","children","mainComponentId","figmaPageId","identity","native","tags","supportsChildren"],"properties":{"id":{"$ref":"#/$defs/nodeId"},"type":{"type":"string","pattern":"^[A-Z_]{1,80}$"},"name":{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},"parentId":{"$ref":"#/$defs/nullableNodeId"},"children":{"type":"array","maxItems":10000,"items":{"$ref":"#/$defs/nodeId"}},"mainComponentId":{"$ref":"#/$defs/nullableNodeId"},"figmaPageId":{"$ref":"#/$defs/nullableNodeId"},"identity":{"type":"string"},"native":{"$ref":"#/$defs/native"},"tags":{"type":"object","maxProperties":100,"additionalProperties":{"type":"array","maxItems":100,"items":{"anyOf":[{"type":"string","pattern":"^[\\s\\S]{0,2400}$"},{"const":true}]}}},"supportsChildren":{"type":"boolean"}}};
const pattern24 = new RegExp("^[A-Z_]{1,80}$", "u");
const pattern20 = new RegExp("^[\\s\\S]{0,2400}$", "u");

function validate38(data, {instancePath="", parentData, parentDataProperty, rootData=data, dynamicAnchors={}}={}){
let vErrors = null;
let errors = 0;
const evaluated0 = validate38.evaluated;
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
validate38.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(func1.call(schema54.properties, key0))){
validate38.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
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
validate38.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/id",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
if(!pattern24.test(data1)){
validate38.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/pattern",keyword:"pattern",params:{pattern: "^[A-Z_]{1,80}$"},message:"must match pattern \""+"^[A-Z_]{1,80}$"+"\""}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/type",schemaPath:"#/properties/type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
if(!pattern20.test(data2)){
validate38.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
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
validate38.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/children/" + i0,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/children",schemaPath:"#/properties/children/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/identity",schemaPath:"#/properties/identity/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs22 === errors){
if(data9.x !== undefined){
let data10 = data9.x;
const _errs23 = errors;
if(!((typeof data10 == "number") && (isFinite(data10)))){
validate38.errors = [{instancePath:instancePath+"/native/x",schemaPath:"#/$defs/native/properties/x/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/y",schemaPath:"#/$defs/native/properties/y/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/native/width",schemaPath:"#/$defs/native/properties/width/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"}];
return false;
}
}
else {
validate38.errors = [{instancePath:instancePath+"/native/height",schemaPath:"#/$defs/native/properties/height/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/visible",schemaPath:"#/$defs/native/properties/visible/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
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
validate38.errors = [{instancePath:instancePath+"/native/isMask",schemaPath:"#/$defs/native/properties/isMask/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
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
validate38.errors = [{instancePath:instancePath+"/native/opacity",schemaPath:"#/$defs/native/properties/opacity/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/layoutMode",schemaPath:"#/$defs/native/properties/layoutMode/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutMode.enum},message:"must be equal to one of the allowed values"}];
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
validate38.errors = [{instancePath:instancePath+"/native/layoutPositioning",schemaPath:"#/$defs/native/properties/layoutPositioning/enum",keyword:"enum",params:{allowedValues: schema39.properties.layoutPositioning.enum},message:"must be equal to one of the allowed values"}];
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
validate38.errors = [{instancePath:instancePath+"/native/layoutSizingHorizontal",schemaPath:"#/$defs/native/properties/layoutSizingHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/layoutSizingVertical",schemaPath:"#/$defs/native/properties/layoutSizingVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/primaryAxisSizingMode",schemaPath:"#/$defs/native/properties/primaryAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/counterAxisSizingMode",schemaPath:"#/$defs/native/properties/counterAxisSizingMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/primaryAxisAlignItems",schemaPath:"#/$defs/native/properties/primaryAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/counterAxisAlignItems",schemaPath:"#/$defs/native/properties/counterAxisAlignItems/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/layoutWrap",schemaPath:"#/$defs/native/properties/layoutWrap/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/paddingTop",schemaPath:"#/$defs/native/properties/paddingTop/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/paddingRight",schemaPath:"#/$defs/native/properties/paddingRight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/paddingBottom",schemaPath:"#/$defs/native/properties/paddingBottom/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/paddingLeft",schemaPath:"#/$defs/native/properties/paddingLeft/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/itemSpacing",schemaPath:"#/$defs/native/properties/itemSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/characters",schemaPath:"#/$defs/native/properties/characters/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/fontName",schemaPath:"#/$defs/native/properties/fontName/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/fontSize",schemaPath:"#/$defs/native/properties/fontSize/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/fontWeight",schemaPath:"#/$defs/native/properties/fontWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/lineHeight",schemaPath:"#/$defs/native/properties/lineHeight/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/letterSpacing",schemaPath:"#/$defs/native/properties/letterSpacing/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/textAlignHorizontal",schemaPath:"#/$defs/native/properties/textAlignHorizontal/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/textAlignVertical",schemaPath:"#/$defs/native/properties/textAlignVertical/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/textAutoResize",schemaPath:"#/$defs/native/properties/textAutoResize/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/fills",schemaPath:"#/$defs/native/properties/fills/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/native/strokes",schemaPath:"#/$defs/native/properties/strokes/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/native/strokeWeight",schemaPath:"#/$defs/native/properties/strokeWeight/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/strokeAlign",schemaPath:"#/$defs/native/properties/strokeAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/effects",schemaPath:"#/$defs/native/properties/effects/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/native/cornerRadius",schemaPath:"#/$defs/native/properties/cornerRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/topLeftRadius",schemaPath:"#/$defs/native/properties/topLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/topRightRadius",schemaPath:"#/$defs/native/properties/topRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/bottomLeftRadius",schemaPath:"#/$defs/native/properties/bottomLeftRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/bottomRightRadius",schemaPath:"#/$defs/native/properties/bottomRightRadius/type",keyword:"type",params:{type: "number"},message:"must be number"}];
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
validate38.errors = [{instancePath:instancePath+"/native/fillStyleId",schemaPath:"#/$defs/native/properties/fillStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/strokeStyleId",schemaPath:"#/$defs/native/properties/strokeStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/textStyleId",schemaPath:"#/$defs/native/properties/textStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/effectStyleId",schemaPath:"#/$defs/native/properties/effectStyleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
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
validate38.errors = [{instancePath:instancePath+"/native/boundVariables",schemaPath:"#/$defs/native/properties/boundVariables/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/explicitVariableModes",schemaPath:"#/$defs/native/properties/explicitVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/resolvedVariableModes",schemaPath:"#/$defs/native/properties/resolvedVariableModes/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/componentProperties",schemaPath:"#/$defs/native/properties/componentProperties/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
validate38.errors = [{instancePath:instancePath+"/native/overrides",schemaPath:"#/$defs/native/properties/overrides/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/native/reactions",schemaPath:"#/$defs/native/properties/reactions/type",keyword:"type",params:{type: "array"},message:"must be array"}];
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
validate38.errors = [{instancePath:instancePath+"/native/exportSettings",schemaPath:"#/$defs/native/properties/exportSettings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs121 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.blendMode !== undefined){
const _errs123 = errors;
if(typeof data9.blendMode !== "string"){
validate38.errors = [{instancePath:instancePath+"/native/blendMode",schemaPath:"#/$defs/native/properties/blendMode/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs123 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.clipsContent !== undefined){
const _errs125 = errors;
if(typeof data9.clipsContent !== "boolean"){
validate38.errors = [{instancePath:instancePath+"/native/clipsContent",schemaPath:"#/$defs/native/properties/clipsContent/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid5 = _errs125 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.relativeTransform !== undefined){
const _errs127 = errors;
if(!(Array.isArray(data9.relativeTransform))){
validate38.errors = [{instancePath:instancePath+"/native/relativeTransform",schemaPath:"#/$defs/native/properties/relativeTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs127 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.absoluteTransform !== undefined){
const _errs129 = errors;
if(!(Array.isArray(data9.absoluteTransform))){
validate38.errors = [{instancePath:instancePath+"/native/absoluteTransform",schemaPath:"#/$defs/native/properties/absoluteTransform/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
var valid5 = _errs129 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.rotation !== undefined){
let data65 = data9.rotation;
const _errs131 = errors;
if(!((typeof data65 == "number") && (isFinite(data65)))){
validate38.errors = [{instancePath:instancePath+"/native/rotation",schemaPath:"#/$defs/native/properties/rotation/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs131 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.minWidth !== undefined){
let data66 = data9.minWidth;
const _errs133 = errors;
const _errs134 = errors;
let valid6 = false;
const _errs135 = errors;
if(errors === _errs135){
if((typeof data66 == "number") && (isFinite(data66))){
if(data66 < 0 || isNaN(data66)){
const err0 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
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
const err1 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err1];
}
else {
vErrors.push(err1);
}
errors++;
}
}
var _valid0 = _errs135 === errors;
valid6 = valid6 || _valid0;
const _errs137 = errors;
if(data66 !== null){
const err2 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
var _valid0 = _errs137 === errors;
valid6 = valid6 || _valid0;
if(!valid6){
const err3 = {instancePath:instancePath+"/native/minWidth",schemaPath:"#/$defs/native/properties/minWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err3];
}
else {
vErrors.push(err3);
}
errors++;
validate38.errors = vErrors;
return false;
}
else {
errors = _errs134;
if(vErrors !== null){
if(_errs134){
vErrors.length = _errs134;
}
else {
vErrors = null;
}
}
}
var valid5 = _errs133 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.maxWidth !== undefined){
let data67 = data9.maxWidth;
const _errs139 = errors;
const _errs140 = errors;
let valid7 = false;
const _errs141 = errors;
if(errors === _errs141){
if((typeof data67 == "number") && (isFinite(data67))){
if(data67 < 0 || isNaN(data67)){
const err4 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
else {
const err5 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err5];
}
else {
vErrors.push(err5);
}
errors++;
}
}
var _valid1 = _errs141 === errors;
valid7 = valid7 || _valid1;
const _errs143 = errors;
if(data67 !== null){
const err6 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var _valid1 = _errs143 === errors;
valid7 = valid7 || _valid1;
if(!valid7){
const err7 = {instancePath:instancePath+"/native/maxWidth",schemaPath:"#/$defs/native/properties/maxWidth/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
validate38.errors = vErrors;
return false;
}
else {
errors = _errs140;
if(vErrors !== null){
if(_errs140){
vErrors.length = _errs140;
}
else {
vErrors = null;
}
}
}
var valid5 = _errs139 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.minHeight !== undefined){
let data68 = data9.minHeight;
const _errs145 = errors;
const _errs146 = errors;
let valid8 = false;
const _errs147 = errors;
if(errors === _errs147){
if((typeof data68 == "number") && (isFinite(data68))){
if(data68 < 0 || isNaN(data68)){
const err8 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
else {
const err9 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
}
}
var _valid2 = _errs147 === errors;
valid8 = valid8 || _valid2;
const _errs149 = errors;
if(data68 !== null){
const err10 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err10];
}
else {
vErrors.push(err10);
}
errors++;
}
var _valid2 = _errs149 === errors;
valid8 = valid8 || _valid2;
if(!valid8){
const err11 = {instancePath:instancePath+"/native/minHeight",schemaPath:"#/$defs/native/properties/minHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err11];
}
else {
vErrors.push(err11);
}
errors++;
validate38.errors = vErrors;
return false;
}
else {
errors = _errs146;
if(vErrors !== null){
if(_errs146){
vErrors.length = _errs146;
}
else {
vErrors = null;
}
}
}
var valid5 = _errs145 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.maxHeight !== undefined){
let data69 = data9.maxHeight;
const _errs151 = errors;
const _errs152 = errors;
let valid9 = false;
const _errs153 = errors;
if(errors === _errs153){
if((typeof data69 == "number") && (isFinite(data69))){
if(data69 < 0 || isNaN(data69)){
const err12 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/minimum",keyword:"minimum",params:{comparison: ">=", limit: 0},message:"must be >= 0"};
if(vErrors === null){
vErrors = [err12];
}
else {
vErrors.push(err12);
}
errors++;
}
}
else {
const err13 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/0/type",keyword:"type",params:{type: "number"},message:"must be number"};
if(vErrors === null){
vErrors = [err13];
}
else {
vErrors.push(err13);
}
errors++;
}
}
var _valid3 = _errs153 === errors;
valid9 = valid9 || _valid3;
const _errs155 = errors;
if(data69 !== null){
const err14 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf/1/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err14];
}
else {
vErrors.push(err14);
}
errors++;
}
var _valid3 = _errs155 === errors;
valid9 = valid9 || _valid3;
if(!valid9){
const err15 = {instancePath:instancePath+"/native/maxHeight",schemaPath:"#/$defs/native/properties/maxHeight/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err15];
}
else {
vErrors.push(err15);
}
errors++;
validate38.errors = vErrors;
return false;
}
else {
errors = _errs152;
if(vErrors !== null){
if(_errs152){
vErrors.length = _errs152;
}
else {
vErrors = null;
}
}
}
var valid5 = _errs151 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutGrow !== undefined){
let data70 = data9.layoutGrow;
const _errs157 = errors;
if(!((typeof data70 == "number") && (isFinite(data70)))){
validate38.errors = [{instancePath:instancePath+"/native/layoutGrow",schemaPath:"#/$defs/native/properties/layoutGrow/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs157 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.counterAxisSpacing !== undefined){
let data71 = data9.counterAxisSpacing;
const _errs159 = errors;
if(!((typeof data71 == "number") && (isFinite(data71)))){
validate38.errors = [{instancePath:instancePath+"/native/counterAxisSpacing",schemaPath:"#/$defs/native/properties/counterAxisSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs159 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paragraphIndent !== undefined){
let data72 = data9.paragraphIndent;
const _errs161 = errors;
if(!((typeof data72 == "number") && (isFinite(data72)))){
validate38.errors = [{instancePath:instancePath+"/native/paragraphIndent",schemaPath:"#/$defs/native/properties/paragraphIndent/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs161 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.paragraphSpacing !== undefined){
let data73 = data9.paragraphSpacing;
const _errs163 = errors;
if(!((typeof data73 == "number") && (isFinite(data73)))){
validate38.errors = [{instancePath:instancePath+"/native/paragraphSpacing",schemaPath:"#/$defs/native/properties/paragraphSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs163 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.listSpacing !== undefined){
let data74 = data9.listSpacing;
const _errs165 = errors;
if(!((typeof data74 == "number") && (isFinite(data74)))){
validate38.errors = [{instancePath:instancePath+"/native/listSpacing",schemaPath:"#/$defs/native/properties/listSpacing/type",keyword:"type",params:{type: "number"},message:"must be number"}];
return false;
}
var valid5 = _errs165 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.layoutAlign !== undefined){
const _errs167 = errors;
if(typeof data9.layoutAlign !== "string"){
validate38.errors = [{instancePath:instancePath+"/native/layoutAlign",schemaPath:"#/$defs/native/properties/layoutAlign/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs167 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textCase !== undefined){
const _errs169 = errors;
if(typeof data9.textCase !== "string"){
validate38.errors = [{instancePath:instancePath+"/native/textCase",schemaPath:"#/$defs/native/properties/textCase/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs169 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.textDecoration !== undefined){
const _errs171 = errors;
if(typeof data9.textDecoration !== "string"){
validate38.errors = [{instancePath:instancePath+"/native/textDecoration",schemaPath:"#/$defs/native/properties/textDecoration/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid5 = _errs171 === errors;
}
else {
var valid5 = true;
}
if(valid5){
if(data9.constraints !== undefined){
let data78 = data9.constraints;
const _errs173 = errors;
if(!(data78 && typeof data78 == "object" && !Array.isArray(data78))){
validate38.errors = [{instancePath:instancePath+"/native/constraints",schemaPath:"#/$defs/native/properties/constraints/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid5 = _errs173 === errors;
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
validate38.errors = [{instancePath:instancePath+"/native",schemaPath:"#/$defs/native/type",keyword:"type",params:{type: "object"},message:"must be object"}];
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
let data79 = data.tags;
const _errs175 = errors;
if(errors === _errs175){
if(data79 && typeof data79 == "object" && !Array.isArray(data79)){
if(Object.keys(data79).length > 100){
validate38.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/maxProperties",keyword:"maxProperties",params:{limit: 100},message:"must NOT have more than 100 properties"}];
return false;
}
else {
for(const key2 in data79){
let data80 = data79[key2];
const _errs178 = errors;
if(errors === _errs178){
if(Array.isArray(data80)){
if(data80.length > 100){
validate38.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/maxItems",keyword:"maxItems",params:{limit: 100},message:"must NOT have more than 100 items"}];
return false;
}
else {
var valid11 = true;
const len1 = data80.length;
for(let i1=0; i1<len1; i1++){
let data81 = data80[i1];
const _errs180 = errors;
const _errs181 = errors;
let valid12 = false;
const _errs182 = errors;
if(errors === _errs182){
if(typeof data81 === "string"){
if(!pattern20.test(data81)){
const err16 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/0/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""};
if(vErrors === null){
vErrors = [err16];
}
else {
vErrors.push(err16);
}
errors++;
}
}
else {
const err17 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/0/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err17];
}
else {
vErrors.push(err17);
}
errors++;
}
}
var _valid4 = _errs182 === errors;
valid12 = valid12 || _valid4;
const _errs184 = errors;
if(true !== data81){
const err18 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf/1/const",keyword:"const",params:{allowedValue: true},message:"must be equal to constant"};
if(vErrors === null){
vErrors = [err18];
}
else {
vErrors.push(err18);
}
errors++;
}
var _valid4 = _errs184 === errors;
valid12 = valid12 || _valid4;
if(!valid12){
const err19 = {instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1")+"/" + i1,schemaPath:"#/properties/tags/additionalProperties/items/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err19];
}
else {
vErrors.push(err19);
}
errors++;
validate38.errors = vErrors;
return false;
}
else {
errors = _errs181;
if(vErrors !== null){
if(_errs181){
vErrors.length = _errs181;
}
else {
vErrors = null;
}
}
}
var valid11 = _errs180 === errors;
if(!valid11){
break;
}
}
}
}
else {
validate38.errors = [{instancePath:instancePath+"/tags/" + key2.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/tags/additionalProperties/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid10 = _errs178 === errors;
if(!valid10){
break;
}
}
}
}
else {
validate38.errors = [{instancePath:instancePath+"/tags",schemaPath:"#/properties/tags/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs175 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.supportsChildren !== undefined){
const _errs185 = errors;
if(typeof data.supportsChildren !== "boolean"){
validate38.errors = [{instancePath:instancePath+"/supportsChildren",schemaPath:"#/properties/supportsChildren/type",keyword:"type",params:{type: "boolean"},message:"must be boolean"}];
return false;
}
var valid0 = _errs185 === errors;
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
validate38.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate38.errors = vErrors;
return errors === 0;
}
validate38.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};

const pattern15 = new RegExp("^[a-f0-9]{64}$", "u");
const pattern16 = new RegExp("^[0-9]+\\.[0-9]+\\.[0-9]+$", "u");
const pattern18 = new RegExp("^[A-Za-z0-9]{6,100}$", "u");
const pattern28 = new RegExp("^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$", "u");

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
const _errs1 = errors;
const _errs2 = errors;
let valid1 = true;
const _errs3 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schemaVersion !== undefined){
let data0 = data.schemaVersion;
if(!(((data0 === 2) || (data0 === 3)) || (data0 === 4))){
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
var valid0 = _errs1 === errors;
if(valid0){
const _errs14 = errors;
const _errs15 = errors;
let valid7 = true;
const _errs16 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schemaVersion !== undefined){
let data7 = data.schemaVersion;
if(!((data7 === 3) || (data7 === 4))){
const err2 = {};
if(vErrors === null){
vErrors = [err2];
}
else {
vErrors.push(err2);
}
errors++;
}
}
}
var _valid1 = _errs16 === errors;
errors = _errs15;
if(vErrors !== null){
if(_errs15){
vErrors.length = _errs15;
}
else {
vErrors = null;
}
}
let ifClause1;
if(_valid1){
const _errs18 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
let missing1;
if((data.visualInspection === undefined) && (missing1 = "visualInspection")){
validate20.errors = [{instancePath,schemaPath:"#/allOf/1/then/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
if(data.visualInspection !== undefined){
if(!(validate34(data.visualInspection, {instancePath:instancePath+"/visualInspection",parentData:data,parentDataProperty:"visualInspection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
errors = vErrors.length;
}
}
}
}
var _valid1 = _errs18 === errors;
valid7 = _valid1;
if(valid7){
var props1 = {};
props1.visualInspection = true;
props1.schemaVersion = true;
}
ifClause1 = "then";
}
else {
const _errs20 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.visualInspection !== undefined){
validate20.errors = [{instancePath:instancePath+"/visualInspection",schemaPath:"#/allOf/1/else/properties/visualInspection/false schema",keyword:"false schema",params:{},message:"boolean schema is false"}];
return false;
}
}
var _valid1 = _errs20 === errors;
valid7 = _valid1;
if(valid7){
if(props1 !== true){
props1 = props1 || {};
props1.visualInspection = true;
}
}
ifClause1 = "else";
}
if(!valid7){
const err3 = {instancePath,schemaPath:"#/allOf/1/if",keyword:"if",params:{failingKeyword: ifClause1},message:"must match \""+ifClause1+"\" schema"};
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
var valid0 = _errs14 === errors;
if(valid0){
if(props0 !== true && props1 !== undefined){
if(props1 === true){
props0 = true;
}
else {
props0 = props0 || {};
Object.assign(props0, props1);
}
}
const _errs21 = errors;
const _errs22 = errors;
let valid11 = true;
const _errs23 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.schemaVersion !== undefined){
if(4 !== data.schemaVersion){
const err4 = {};
if(vErrors === null){
vErrors = [err4];
}
else {
vErrors.push(err4);
}
errors++;
}
}
}
var _valid2 = _errs23 === errors;
errors = _errs22;
if(vErrors !== null){
if(_errs22){
vErrors.length = _errs22;
}
else {
vErrors = null;
}
}
let ifClause2;
if(_valid2){
const _errs25 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
let missing2;
if((data.sourceBindings === undefined) && (missing2 = "sourceBindings")){
validate20.errors = [{instancePath,schemaPath:"#/allOf/2/then/required",keyword:"required",params:{missingProperty: missing2},message:"must have required property '"+missing2+"'"}];
return false;
}
else {
if(data.sourceBindings !== undefined){
let data11 = data.sourceBindings;
const _errs26 = errors;
if(errors === _errs26){
if(Array.isArray(data11)){
if(data11.length > 10000){
validate20.errors = [{instancePath:instancePath+"/sourceBindings",schemaPath:"#/allOf/2/then/properties/sourceBindings/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid14 = true;
const len0 = data11.length;
for(let i0=0; i0<len0; i0++){
const _errs28 = errors;
if(!(validate36(data11[i0], {instancePath:instancePath+"/sourceBindings/" + i0,parentData:data11,parentDataProperty:i0,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
errors = vErrors.length;
}
var valid14 = _errs28 === errors;
if(!valid14){
break;
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/sourceBindings",schemaPath:"#/allOf/2/then/properties/sourceBindings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
}
}
}
var _valid2 = _errs25 === errors;
valid11 = _valid2;
if(valid11){
var props2 = {};
props2.sourceBindings = true;
props2.schemaVersion = true;
}
ifClause2 = "then";
}
else {
const _errs29 = errors;
if(data && typeof data == "object" && !Array.isArray(data)){
if(data.sourceBindings !== undefined){
validate20.errors = [{instancePath:instancePath+"/sourceBindings",schemaPath:"#/allOf/2/else/properties/sourceBindings/false schema",keyword:"false schema",params:{},message:"boolean schema is false"}];
return false;
}
}
var _valid2 = _errs29 === errors;
valid11 = _valid2;
if(valid11){
if(props2 !== true){
props2 = props2 || {};
props2.sourceBindings = true;
}
}
ifClause2 = "else";
}
if(!valid11){
const err5 = {instancePath,schemaPath:"#/allOf/2/if",keyword:"if",params:{failingKeyword: ifClause2},message:"must match \""+ifClause2+"\" schema"};
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
var valid0 = _errs21 === errors;
if(valid0){
if(props0 !== true && props2 !== undefined){
if(props2 === true){
props0 = true;
}
else {
props0 = props0 || {};
Object.assign(props0, props2);
}
}
}
}
}
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing3;
if(((((((((((data.format === undefined) && (missing3 = "format")) || ((data.schemaVersion === undefined) && (missing3 = "schemaVersion"))) || ((data.revision === undefined) && (missing3 = "revision"))) || ((data.generator === undefined) && (missing3 = "generator"))) || ((data.source === undefined) && (missing3 = "source"))) || ((data.scope === undefined) && (missing3 = "scope"))) || ((data.nodes === undefined) && (missing3 = "nodes"))) || ((data.dependencies === undefined) && (missing3 = "dependencies"))) || ((data.preflight === undefined) && (missing3 = "preflight"))) || ((data.coverage === undefined) && (missing3 = "coverage"))){
validate20.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing3},message:"must have required property '"+missing3+"'"}];
return false;
}
else {
const _errs30 = errors;
for(const key0 in data){
if(!(func1.call(schema31.properties, key0))){
validate20.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs30 === errors){
if(data.format !== undefined){
const _errs31 = errors;
if("dfc-bridge-handoff" !== data.format){
validate20.errors = [{instancePath:instancePath+"/format",schemaPath:"#/properties/format/const",keyword:"const",params:{allowedValue: "dfc-bridge-handoff"},message:"must be equal to constant"}];
return false;
}
var valid16 = _errs31 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.schemaVersion !== undefined){
let data15 = data.schemaVersion;
const _errs32 = errors;
if(!((((data15 === 1) || (data15 === 2)) || (data15 === 3)) || (data15 === 4))){
validate20.errors = [{instancePath:instancePath+"/schemaVersion",schemaPath:"#/properties/schemaVersion/enum",keyword:"enum",params:{allowedValues: schema31.properties.schemaVersion.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid16 = _errs32 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.revision !== undefined){
let data16 = data.revision;
const _errs33 = errors;
if(errors === _errs33){
if(typeof data16 === "string"){
if(!pattern15.test(data16)){
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/pattern",keyword:"pattern",params:{pattern: "^[a-f0-9]{64}$"},message:"must match pattern \""+"^[a-f0-9]{64}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/revision",schemaPath:"#/properties/revision/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid16 = _errs33 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.generator !== undefined){
let data17 = data.generator;
const _errs35 = errors;
if(errors === _errs35){
if(data17 && typeof data17 == "object" && !Array.isArray(data17)){
let missing4;
if(((data17.pluginVersion === undefined) && (missing4 = "pluginVersion")) || ((data17.validatorVersion === undefined) && (missing4 = "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/required",keyword:"required",params:{missingProperty: missing4},message:"must have required property '"+missing4+"'"}];
return false;
}
else {
const _errs37 = errors;
for(const key1 in data17){
if(!((key1 === "pluginVersion") || (key1 === "validatorVersion"))){
validate20.errors = [{instancePath:instancePath+"/generator",schemaPath:"#/properties/generator/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key1},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs37 === errors){
if(data17.pluginVersion !== undefined){
let data18 = data17.pluginVersion;
const _errs38 = errors;
if(errors === _errs38){
if(typeof data18 === "string"){
if(!pattern16.test(data18)){
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/pluginVersion",schemaPath:"#/properties/generator/properties/pluginVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid17 = _errs38 === errors;
}
else {
var valid17 = true;
}
if(valid17){
if(data17.validatorVersion !== undefined){
let data19 = data17.validatorVersion;
const _errs40 = errors;
if(errors === _errs40){
if(typeof data19 === "string"){
if(!pattern16.test(data19)){
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/pattern",keyword:"pattern",params:{pattern: "^[0-9]+\\.[0-9]+\\.[0-9]+$"},message:"must match pattern \""+"^[0-9]+\\.[0-9]+\\.[0-9]+$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/generator/validatorVersion",schemaPath:"#/properties/generator/properties/validatorVersion/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid17 = _errs40 === errors;
}
else {
var valid17 = true;
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
var valid16 = _errs35 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.source !== undefined){
let data20 = data.source;
const _errs42 = errors;
if(errors === _errs42){
if(data20 && typeof data20 == "object" && !Array.isArray(data20)){
let missing5;
if((((data20.fileKey === undefined) && (missing5 = "fileKey")) || ((data20.figmaPageId === undefined) && (missing5 = "figmaPageId"))) || ((data20.figmaPageName === undefined) && (missing5 = "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/required",keyword:"required",params:{missingProperty: missing5},message:"must have required property '"+missing5+"'"}];
return false;
}
else {
const _errs44 = errors;
for(const key2 in data20){
if(!(((key2 === "fileKey") || (key2 === "figmaPageId")) || (key2 === "figmaPageName"))){
validate20.errors = [{instancePath:instancePath+"/source",schemaPath:"#/properties/source/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key2},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs44 === errors){
if(data20.fileKey !== undefined){
let data21 = data20.fileKey;
const _errs45 = errors;
const _errs46 = errors;
let valid19 = false;
const _errs47 = errors;
if(data21 !== null){
const err6 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/0/type",keyword:"type",params:{type: "null"},message:"must be null"};
if(vErrors === null){
vErrors = [err6];
}
else {
vErrors.push(err6);
}
errors++;
}
var _valid3 = _errs47 === errors;
valid19 = valid19 || _valid3;
const _errs49 = errors;
if(errors === _errs49){
if(typeof data21 === "string"){
if(!pattern18.test(data21)){
const err7 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/pattern",keyword:"pattern",params:{pattern: "^[A-Za-z0-9]{6,100}$"},message:"must match pattern \""+"^[A-Za-z0-9]{6,100}$"+"\""};
if(vErrors === null){
vErrors = [err7];
}
else {
vErrors.push(err7);
}
errors++;
}
}
else {
const err8 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf/1/type",keyword:"type",params:{type: "string"},message:"must be string"};
if(vErrors === null){
vErrors = [err8];
}
else {
vErrors.push(err8);
}
errors++;
}
}
var _valid3 = _errs49 === errors;
valid19 = valid19 || _valid3;
if(!valid19){
const err9 = {instancePath:instancePath+"/source/fileKey",schemaPath:"#/properties/source/properties/fileKey/anyOf",keyword:"anyOf",params:{},message:"must match a schema in anyOf"};
if(vErrors === null){
vErrors = [err9];
}
else {
vErrors.push(err9);
}
errors++;
validate20.errors = vErrors;
return false;
}
else {
errors = _errs46;
if(vErrors !== null){
if(_errs46){
vErrors.length = _errs46;
}
else {
vErrors = null;
}
}
}
var valid18 = _errs45 === errors;
}
else {
var valid18 = true;
}
if(valid18){
if(data20.figmaPageId !== undefined){
let data22 = data20.figmaPageId;
const _errs51 = errors;
const _errs52 = errors;
if(errors === _errs52){
if(typeof data22 === "string"){
if(!pattern4.test(data22)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid18 = _errs51 === errors;
}
else {
var valid18 = true;
}
if(valid18){
if(data20.figmaPageName !== undefined){
let data23 = data20.figmaPageName;
const _errs54 = errors;
if(errors === _errs54){
if(typeof data23 === "string"){
if(!pattern20.test(data23)){
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/source/figmaPageName",schemaPath:"#/properties/source/properties/figmaPageName/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid18 = _errs54 === errors;
}
else {
var valid18 = true;
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
var valid16 = _errs42 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.scope !== undefined){
let data24 = data.scope;
const _errs56 = errors;
if(errors === _errs56){
if(data24 && typeof data24 == "object" && !Array.isArray(data24)){
let missing6;
if(((((data24.kind === undefined) && (missing6 = "kind")) || ((data24.completeness === undefined) && (missing6 = "completeness"))) || ((data24.rootIds === undefined) && (missing6 = "rootIds"))) || ((data24.pageId === undefined) && (missing6 = "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/required",keyword:"required",params:{missingProperty: missing6},message:"must have required property '"+missing6+"'"}];
return false;
}
else {
const _errs58 = errors;
for(const key3 in data24){
if(!((((key3 === "kind") || (key3 === "completeness")) || (key3 === "rootIds")) || (key3 === "pageId"))){
validate20.errors = [{instancePath:instancePath+"/scope",schemaPath:"#/properties/scope/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key3},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs58 === errors){
if(data24.kind !== undefined){
let data25 = data24.kind;
const _errs59 = errors;
if(!((data25 === "page") || (data25 === "section"))){
validate20.errors = [{instancePath:instancePath+"/scope/kind",schemaPath:"#/properties/scope/properties/kind/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.kind.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid21 = _errs59 === errors;
}
else {
var valid21 = true;
}
if(valid21){
if(data24.completeness !== undefined){
let data26 = data24.completeness;
const _errs60 = errors;
if(!((data26 === "full") || (data26 === "partial"))){
validate20.errors = [{instancePath:instancePath+"/scope/completeness",schemaPath:"#/properties/scope/properties/completeness/enum",keyword:"enum",params:{allowedValues: schema31.properties.scope.properties.completeness.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid21 = _errs60 === errors;
}
else {
var valid21 = true;
}
if(valid21){
if(data24.rootIds !== undefined){
let data27 = data24.rootIds;
const _errs61 = errors;
if(errors === _errs61){
if(Array.isArray(data27)){
if(data27.length > 1000){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/maxItems",keyword:"maxItems",params:{limit: 1000},message:"must NOT have more than 1000 items"}];
return false;
}
else {
if(data27.length < 1){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds",schemaPath:"#/properties/scope/properties/rootIds/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid22 = true;
const len1 = data27.length;
for(let i1=0; i1<len1; i1++){
let data28 = data27[i1];
const _errs63 = errors;
const _errs64 = errors;
if(errors === _errs64){
if(typeof data28 === "string"){
if(!pattern4.test(data28)){
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i1,schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/rootIds/" + i1,schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid22 = _errs63 === errors;
if(!valid22){
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
var valid21 = _errs61 === errors;
}
else {
var valid21 = true;
}
if(valid21){
if(data24.pageId !== undefined){
let data29 = data24.pageId;
const _errs66 = errors;
if(errors === _errs66){
if(typeof data29 === "string"){
if(!pattern20.test(data29)){
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/pattern",keyword:"pattern",params:{pattern: "^[\\s\\S]{0,2400}$"},message:"must match pattern \""+"^[\\s\\S]{0,2400}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/scope/pageId",schemaPath:"#/properties/scope/properties/pageId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid21 = _errs66 === errors;
}
else {
var valid21 = true;
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
var valid16 = _errs56 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.nodes !== undefined){
let data30 = data.nodes;
const _errs68 = errors;
if(errors === _errs68){
if(Array.isArray(data30)){
if(data30.length > 10000){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
if(data30.length < 1){
validate20.errors = [{instancePath:instancePath+"/nodes",schemaPath:"#/properties/nodes/minItems",keyword:"minItems",params:{limit: 1},message:"must NOT have fewer than 1 items"}];
return false;
}
else {
var valid24 = true;
const len2 = data30.length;
for(let i2=0; i2<len2; i2++){
const _errs70 = errors;
if(!(validate38(data30[i2], {instancePath:instancePath+"/nodes/" + i2,parentData:data30,parentDataProperty:i2,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
errors = vErrors.length;
}
var valid24 = _errs70 === errors;
if(!valid24){
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
var valid16 = _errs68 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.dependencies !== undefined){
let data32 = data.dependencies;
const _errs71 = errors;
if(errors === _errs71){
if(Array.isArray(data32)){
if(data32.length > 10000){
validate20.errors = [{instancePath:instancePath+"/dependencies",schemaPath:"#/properties/dependencies/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid25 = true;
const len3 = data32.length;
for(let i3=0; i3<len3; i3++){
const _errs73 = errors;
if(!(validate38(data32[i3], {instancePath:instancePath+"/dependencies/" + i3,parentData:data32,parentDataProperty:i3,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate38.errors : vErrors.concat(validate38.errors);
errors = vErrors.length;
}
var valid25 = _errs73 === errors;
if(!valid25){
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
var valid16 = _errs71 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.preflight !== undefined){
let data34 = data.preflight;
const _errs74 = errors;
if(errors === _errs74){
if(data34 && typeof data34 == "object" && !Array.isArray(data34)){
let missing7;
if((((((data34.mode === undefined) && (missing7 = "mode")) || ((data34.scope === undefined) && (missing7 = "scope"))) || ((data34.status === undefined) && (missing7 = "status"))) || ((data34.issues === undefined) && (missing7 = "issues"))) || ((data34.summary === undefined) && (missing7 = "summary"))){
validate20.errors = [{instancePath:instancePath+"/preflight",schemaPath:"#/properties/preflight/required",keyword:"required",params:{missingProperty: missing7},message:"must have required property '"+missing7+"'"}];
return false;
}
else {
if(data34.mode !== undefined){
let data35 = data34.mode;
const _errs76 = errors;
if(!((data35 === "page") || (data35 === "section"))){
validate20.errors = [{instancePath:instancePath+"/preflight/mode",schemaPath:"#/properties/preflight/properties/mode/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.mode.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid26 = _errs76 === errors;
}
else {
var valid26 = true;
}
if(valid26){
if(data34.scope !== undefined){
let data36 = data34.scope;
const _errs77 = errors;
if(!((data36 === "page") || (data36 === "selection"))){
validate20.errors = [{instancePath:instancePath+"/preflight/scope",schemaPath:"#/properties/preflight/properties/scope/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.scope.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid26 = _errs77 === errors;
}
else {
var valid26 = true;
}
if(valid26){
if(data34.status !== undefined){
let data37 = data34.status;
const _errs78 = errors;
if(!(((((data37 === "ready") || (data37 === "review")) || (data37 === "not-ready")) || (data37 === "partial")) || (data37 === "blocked"))){
validate20.errors = [{instancePath:instancePath+"/preflight/status",schemaPath:"#/properties/preflight/properties/status/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid26 = _errs78 === errors;
}
else {
var valid26 = true;
}
if(valid26){
if(data34.issues !== undefined){
let data38 = data34.issues;
const _errs79 = errors;
if(errors === _errs79){
if(Array.isArray(data38)){
if(data38.length > 10000){
validate20.errors = [{instancePath:instancePath+"/preflight/issues",schemaPath:"#/properties/preflight/properties/issues/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid27 = true;
const len4 = data38.length;
for(let i4=0; i4<len4; i4++){
let data39 = data38[i4];
const _errs81 = errors;
if(errors === _errs81){
if(data39 && typeof data39 == "object" && !Array.isArray(data39)){
let missing8;
if((((data39.ruleId === undefined) && (missing8 = "ruleId")) || ((data39.severity === undefined) && (missing8 = "severity"))) || ((data39.nodeId === undefined) && (missing8 = "nodeId"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4,schemaPath:"#/properties/preflight/properties/issues/items/required",keyword:"required",params:{missingProperty: missing8},message:"must have required property '"+missing8+"'"}];
return false;
}
else {
if(data39.ruleId !== undefined){
let data40 = data39.ruleId;
const _errs83 = errors;
if(errors === _errs83){
if(typeof data40 === "string"){
if(!pattern28.test(data40)){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/pattern",keyword:"pattern",params:{pattern: "^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"},message:"must match pattern \""+"^[a-z][a-z0-9-]*\\.[a-z][a-z0-9.-]*$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4+"/ruleId",schemaPath:"#/properties/preflight/properties/issues/items/properties/ruleId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid28 = _errs83 === errors;
}
else {
var valid28 = true;
}
if(valid28){
if(data39.severity !== undefined){
let data41 = data39.severity;
const _errs85 = errors;
if(!(((data41 === "error") || (data41 === "warning")) || (data41 === "todo"))){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4+"/severity",schemaPath:"#/properties/preflight/properties/issues/items/properties/severity/enum",keyword:"enum",params:{allowedValues: schema31.properties.preflight.properties.issues.items.properties.severity.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid28 = _errs85 === errors;
}
else {
var valid28 = true;
}
if(valid28){
if(data39.nodeId !== undefined){
const _errs86 = errors;
if(typeof data39.nodeId !== "string"){
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4+"/nodeId",schemaPath:"#/properties/preflight/properties/issues/items/properties/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid28 = _errs86 === errors;
}
else {
var valid28 = true;
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/preflight/issues/" + i4,schemaPath:"#/properties/preflight/properties/issues/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid27 = _errs81 === errors;
if(!valid27){
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
var valid26 = _errs79 === errors;
}
else {
var valid26 = true;
}
if(valid26){
if(data34.summary !== undefined){
let data43 = data34.summary;
const _errs88 = errors;
if(!(data43 && typeof data43 == "object" && !Array.isArray(data43))){
validate20.errors = [{instancePath:instancePath+"/preflight/summary",schemaPath:"#/properties/preflight/properties/summary/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
var valid26 = _errs88 === errors;
}
else {
var valid26 = true;
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
var valid16 = _errs74 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.coverage !== undefined){
let data44 = data.coverage;
const _errs90 = errors;
if(errors === _errs90){
if(data44 && typeof data44 == "object" && !Array.isArray(data44)){
let missing9;
if((((((data44.instanceInteriors === undefined) && (missing9 = "instanceInteriors")) || ((data44.content === undefined) && (missing9 = "content"))) || ((data44.runtime === undefined) && (missing9 = "runtime"))) || ((data44.componentVariants === undefined) && (missing9 = "componentVariants"))) || ((data44.unavailable === undefined) && (missing9 = "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/required",keyword:"required",params:{missingProperty: missing9},message:"must have required property '"+missing9+"'"}];
return false;
}
else {
const _errs92 = errors;
for(const key4 in data44){
if(!(((((key4 === "instanceInteriors") || (key4 === "content")) || (key4 === "runtime")) || (key4 === "componentVariants")) || (key4 === "unavailable"))){
validate20.errors = [{instancePath:instancePath+"/coverage",schemaPath:"#/properties/coverage/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key4},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs92 === errors){
if(data44.instanceInteriors !== undefined){
const _errs93 = errors;
if("atomic" !== data44.instanceInteriors){
validate20.errors = [{instancePath:instancePath+"/coverage/instanceInteriors",schemaPath:"#/properties/coverage/properties/instanceInteriors/const",keyword:"const",params:{allowedValue: "atomic"},message:"must be equal to constant"}];
return false;
}
var valid29 = _errs93 === errors;
}
else {
var valid29 = true;
}
if(valid29){
if(data44.content !== undefined){
const _errs94 = errors;
if("not-checked" !== data44.content){
validate20.errors = [{instancePath:instancePath+"/coverage/content",schemaPath:"#/properties/coverage/properties/content/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid29 = _errs94 === errors;
}
else {
var valid29 = true;
}
if(valid29){
if(data44.runtime !== undefined){
const _errs95 = errors;
if("not-checked" !== data44.runtime){
validate20.errors = [{instancePath:instancePath+"/coverage/runtime",schemaPath:"#/properties/coverage/properties/runtime/const",keyword:"const",params:{allowedValue: "not-checked"},message:"must be equal to constant"}];
return false;
}
var valid29 = _errs95 === errors;
}
else {
var valid29 = true;
}
if(valid29){
if(data44.componentVariants !== undefined){
let data48 = data44.componentVariants;
const _errs96 = errors;
if(!((data48 === "not-exported") || (data48 === "inspected"))){
validate20.errors = [{instancePath:instancePath+"/coverage/componentVariants",schemaPath:"#/properties/coverage/properties/componentVariants/enum",keyword:"enum",params:{allowedValues: schema31.properties.coverage.properties.componentVariants.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid29 = _errs96 === errors;
}
else {
var valid29 = true;
}
if(valid29){
if(data44.unavailable !== undefined){
let data49 = data44.unavailable;
const _errs97 = errors;
if(errors === _errs97){
if(Array.isArray(data49)){
if(data49.length > 10000){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable",schemaPath:"#/properties/coverage/properties/unavailable/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid30 = true;
const len5 = data49.length;
for(let i5=0; i5<len5; i5++){
let data50 = data49[i5];
const _errs99 = errors;
if(errors === _errs99){
if(data50 && typeof data50 == "object" && !Array.isArray(data50)){
let missing10;
if((((data50.nodeId === undefined) && (missing10 = "nodeId")) || ((data50.field === undefined) && (missing10 = "field"))) || ((data50.reason === undefined) && (missing10 = "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5,schemaPath:"#/properties/coverage/properties/unavailable/items/required",keyword:"required",params:{missingProperty: missing10},message:"must have required property '"+missing10+"'"}];
return false;
}
else {
const _errs101 = errors;
for(const key5 in data50){
if(!(((key5 === "nodeId") || (key5 === "field")) || (key5 === "reason"))){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5,schemaPath:"#/properties/coverage/properties/unavailable/items/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key5},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs101 === errors){
if(data50.nodeId !== undefined){
let data51 = data50.nodeId;
const _errs102 = errors;
const _errs103 = errors;
if(errors === _errs103){
if(typeof data51 === "string"){
if(!pattern4.test(data51)){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5+"/nodeId",schemaPath:"#/$defs/nodeId/pattern",keyword:"pattern",params:{pattern: "^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"},message:"must match pattern \""+"^I?[0-9]{1,20}:[0-9]{1,20}(?:;[0-9]{1,20}:[0-9]{1,20}){0,40}$"+"\""}];
return false;
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5+"/nodeId",schemaPath:"#/$defs/nodeId/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid31 = _errs102 === errors;
}
else {
var valid31 = true;
}
if(valid31){
if(data50.field !== undefined){
const _errs105 = errors;
if(typeof data50.field !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5+"/field",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/field/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid31 = _errs105 === errors;
}
else {
var valid31 = true;
}
if(valid31){
if(data50.reason !== undefined){
const _errs107 = errors;
if(typeof data50.reason !== "string"){
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5+"/reason",schemaPath:"#/properties/coverage/properties/unavailable/items/properties/reason/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid31 = _errs107 === errors;
}
else {
var valid31 = true;
}
}
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/coverage/unavailable/" + i5,schemaPath:"#/properties/coverage/properties/unavailable/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid30 = _errs99 === errors;
if(!valid30){
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
var valid29 = _errs97 === errors;
}
else {
var valid29 = true;
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
var valid16 = _errs90 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.componentInspection !== undefined){
const _errs109 = errors;
if(!(validate21(data.componentInspection, {instancePath:instancePath+"/componentInspection",parentData:data,parentDataProperty:"componentInspection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
errors = vErrors.length;
}
var valid16 = _errs109 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.visualInspection !== undefined){
const _errs110 = errors;
if(!(validate34(data.visualInspection, {instancePath:instancePath+"/visualInspection",parentData:data,parentDataProperty:"visualInspection",rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
errors = vErrors.length;
}
var valid16 = _errs110 === errors;
}
else {
var valid16 = true;
}
if(valid16){
if(data.sourceBindings !== undefined){
let data56 = data.sourceBindings;
const _errs111 = errors;
if(errors === _errs111){
if(Array.isArray(data56)){
if(data56.length > 10000){
validate20.errors = [{instancePath:instancePath+"/sourceBindings",schemaPath:"#/properties/sourceBindings/maxItems",keyword:"maxItems",params:{limit: 10000},message:"must NOT have more than 10000 items"}];
return false;
}
else {
var valid33 = true;
const len6 = data56.length;
for(let i6=0; i6<len6; i6++){
const _errs113 = errors;
if(!(validate36(data56[i6], {instancePath:instancePath+"/sourceBindings/" + i6,parentData:data56,parentDataProperty:i6,rootData,dynamicAnchors}))){
vErrors = vErrors === null ? validate36.errors : vErrors.concat(validate36.errors);
errors = vErrors.length;
}
var valid33 = _errs113 === errors;
if(!valid33){
break;
}
}
}
}
else {
validate20.errors = [{instancePath:instancePath+"/sourceBindings",schemaPath:"#/properties/sourceBindings/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid16 = _errs111 === errors;
}
else {
var valid16 = true;
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
validate20.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validate20.errors = vErrors;
return errors === 0;
}
validate20.evaluated = {"props":true,"dynamicProps":false,"dynamicItems":false};
