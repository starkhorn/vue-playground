import CanvasAction from './CanvasAction'
import CreateDeskAction from './CreateDeskAction'

export const NOOP = 'noop'
export const CREATE_DESK = 'create-desk'

export function actionInitializer(canvas) {
  return {
    [NOOP]: new CanvasAction(canvas),
    [CREATE_DESK]: new CreateDeskAction(canvas)
  }
}
