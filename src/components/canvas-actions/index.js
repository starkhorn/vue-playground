import CanvasAction from './canvas-action'
import CreateDeskAction from './create-desk-action'

export const NOOP = 'noop'
export const CREATE_DESK = 'create-desk'

export function actionInitializer(vm) {
  return {
    [NOOP]: new CanvasAction(vm),
    [CREATE_DESK]: new CreateDeskAction(vm)
  }
}
