import CanvasAction from './CanvasAction'
import CreateDeskAction from './CreateDeskAction'

export const NOOP = 'noop'
export const CREATE_DESK = 'create-desk'

export const ACTIONS = {
  [NOOP]: new CanvasAction(),
  [CREATE_DESK]: new CreateDeskAction()
}
