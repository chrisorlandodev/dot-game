export enum GameMessageType {
  // outputs
  Initialize = 'INITIALIZE',
  UpdateText = 'UPDATE_TEXT',
  ValidStartNode = 'VALID_START_NODE',
  InvalidStartNode = 'INVALID_START_NODE',
  ValidEndNode = 'VALID_END_NODE',
  InvalidEndNode = 'INVALID_END_NODE',
  GameOver = 'GAME_OVER',
  // inputs
  NodeClicked = 'NODE_CLICKED',
  Error = 'ERROR',
}
