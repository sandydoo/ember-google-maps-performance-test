/* No docs for this stuff. Figuring out by poking and prodding. */

import { set } from '@ember/object';

const CAPABILITIES = {
  dynamicLayout: false,
  dynamicTag: false,
  prepareArgs: false,
  createArgs: false,
  attributeHook: false,
  elementHook: false,
  createCaller: false,
  dynamicScope: false,
  updateHook: false,
  createInstance: false,
  asyncLifecycleCallbacks: true,
  destructor: false,
}

export default class MapComponentManager {
  capabilities = CAPABILITIES;

  constructor() {
  }

  createComponent(factory, args) {
    return new factory(null, args.named);
  }

  updateComponent(component, args) {
    set(component, 'args', args);
  }

  getContext() {
    // noop
  }

  getLayout(template) {
    //noop
  }

  getCapabilities() {
    return CAPABILITIES;
  }

  getSelf() {
    // These are private Glimmer constants
    // return NULL_REFERENCE;
  }

  getTag() {
    // These are private Glimmer constants
    // return CONSTANT_TAG;
  }

  getDestructor() {
    return null;
  }
}

export function createMapComponentManger(owner) {
  return new MapComponentManager({ owner });
}

const MAP_COMPONENT_MANAGER = new MapComponentManager();

export class MapComponentDefinition {
  manager = MAP_COMPONENT_MANAGER;
  constructor(state) {}
}