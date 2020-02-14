import Highway from '@dogstudio/highway'

Highway.initialLoad = false

import {
  DefaultRenderer,
  HomeRenderer,
  TrainingRenderer,
  AboutRenderer,
  BlogRenderer
} from './renderers'

import { 
  DefaultTransition,
} from './transitions'

export default new Highway.Core({
  renderers: {
    default: DefaultRenderer,
    home: HomeRenderer,
    training: TrainingRenderer,
    about: AboutRenderer,
    blog: BlogRenderer
  },
  transitions: {
    default: DefaultTransition,
  }
})