import CanvasCommand from './CanvasCommand'
import CreateDeskCommand from './CreateDeskCommand'

export const NOOP = 'noop'
export const CREATE_DESK = 'create-desk'

export const ACTIONS = {
  [NOOP]: new CanvasCommand(),
  [CREATE_DESK]: new CreateDeskCommand()
}
